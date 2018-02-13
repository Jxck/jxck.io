%%%-------------------------------------------------------------------
%% @doc http worker
%% @end
%%%-------------------------------------------------------------------

-module(http_worker).

-include("logger.hrl").

%% Supervisor callbacks
-export([
         start_link/1
        ]).

-export([
         init/1,
         handle_call/3,
         handle_cast/2,
         handle_info/2,
         code_change/3,
         terminate/2
        ]).


%%====================================================================
%% API functions
%%====================================================================
start_link(Socket) ->
    ?Log(Socket),
    Debug = {}, % {debug, [trace]},
    gen_server:start_link(?MODULE, [Socket], [Debug]).

%%====================================================================
%% Internal functions
%%====================================================================

%% Callback
% gen_server module            Callback module
% -----------------            ---------------
% gen_server:start
% gen_server:start_link -----> Module:init/1
%
% gen_server:stop       -----> Module:terminate/2
%
% gen_server:call
% gen_server:multi_call -----> Module:handle_call/3
%
% gen_server:cast
% gen_server:abcast     -----> Module:handle_cast/2
%
% -                     -----> Module:handle_info/2
%
% -                     -----> Module:terminate/2
%
% -                     -----> Module:code_change/3
init([Socket]) ->
    ?Log(Socket),
    process_flag(trap_exit, true),
    Request = {{}, #{}, <<>>},
    State = #{
      socket  => Socket,
      request => Request
     },
    {ok, State}.


% First Line
handle_info({http, Socket, {http_request, Method, Uri, Version}}, #{socket := Socket, request := {Req, Header, Body}}=State) ->
    % 以降はヘッダなので httph_bin
    ok = inet:setopts(Socket, [{active, once}, {packet, httph_bin}]),
    NextState = State#{request := {{Method, Uri, Version}, Header, Body}},
    ?Log(NextState),
    {noreply, NextState};


% Header
handle_info({http, Socket, {http_header, _Len, Field, _ , Value}}, #{socket := Socket, request := {Req, Header, Body}}=State) ->
    ?Log(Field, Value),
    % ヘッダが終わるまでは httph_bin
    ok = inet:setopts(Socket, [{active, once}, {packet, httph_bin}]),
    NextState = State#{request := {Req, Header#{Field => Value}, Body}},
    {noreply, NextState};


% Header End
handle_info({http, Socket, http_eoh}, #{socket := Socket, request := {Req, Header, Body}}=State) ->
    % ここで header が終わるので body を raw binary で受け取る
    % Content-Length 分だけ読むために active/false にして recv する。
    ok = inet:setopts(Socket, [binary, {packet, raw}, {active, false}]),
    Len = binary_to_integer(maps:get('Content-Length', Header, <<"0">>)),
    {ok, Data} = case Len of
                     0 -> {ok, <<>>}; % Length が無い
                     _ -> gen_tcp:recv(Socket, Len)
                 end,
    % 終わったら http_bin に戻す
    ok = inet:setopts(Socket, [{packet, http_bin}, {active, once}]),
    Request = {Req, Header, <<Body/binary, Data/binary>>},
    ?Log(Request),

    % handler を呼ぶ
    {Response, _} = http_handler:handle(Request, State),
    gen_tcp:send(Socket, Response),

    NextState = State#{request => {{}, #{}, <<>>}},

    {noreply, NextState};


handle_info(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.


handle_http(#{ socket     := Socket,
               first_line := {'GET', {abs_path, <<"/">>}, {1,1}},
               headers    := #{
                 'Connection'                := <<"Upgrade">>,
                 'Upgrade'                   := <<"websocket">>,
                 <<"Sec-Websocket-Key">>     := Key,
                 <<"Sec-Websocket-Version">> := <<"13">>
                }}=State) ->
    GUID = <<"258EAFA5-E914-47DA-95CA-C5AB0DC85B11">>,
    Hash = base64:encode(crypto:hash(sha, <<Key/binary, GUID/binary>>)),

    %% websocket へのアップグレード
    %% 101 を返したら ws_worker を起動し制御を移譲する。
    ok = gen_tcp:send(Socket, <<
                                "HTTP/1.1 101 Switching Protocols\r\n"
                                "Upgrade: websocket\r\n"
                                "Connection: Upgrade\r\n"
                                "Sec-WebSocket-Accept: ", Hash/binary, "\r\n"
                                "\r\n"
                              >>),
    {ok, Pid} = ws_worker_sup:start_child(Socket),
    ok = gen_tcp:controlling_process(Socket, Pid);

handle_http(#{socket := Socket}) ->
    Body = <<
             "<!DOCTYPE html>\n"
             "<meta charset=utf-8>\n"
             "<meta name=viewport content='width=device-width,initial-scale=1'>\n"
             "\n"
             "<title>DEMO</title>\n"
             "<h1>Test</h1>\n"
             "<script>\n"
             "'use strict';\n"
             "let log = console.log.bind(console);\n"
             "\n"
             "let ws = new WebSocket('ws://localhost:3000', [])\n"
             "ws.onmessage = ({data}) => {\n"
             "    if (data instanceof Blob) {\n"
             "        console.log('<< recv', data.size)\n"
             "    } else {\n"
             "        console.log('<< recv', data.length)\n"
             "    }\n"
             "}\n"
             "ws.onopen = (e) => {\n"
             "  let blob = new Blob(new Array(2**16-1).fill(1))\n"
             "  let text = 'aaaaaaaa'.repeat(16)\n"
             "  console.log('>> send', blob.size)\n"
             "  console.log('>> send', text.length)\n"
             "  ws.send(blob)\n"
             "  ws.send(text)\n"
             "}\n"
             "</script>\n"
           >>,
    ContentLength = integer_to_binary(byte_size(Body)),

    Response = <<
                 "HTTP/1.1 200 OK\r\n"
                 "Content-Length: ", ContentLength/binary, "\r\n"
                 "\r\n",
                 Body/binary
               >>,

    ok = ?Log(gen_tcp:send(Socket, Response)),
    ?Log(prim_inet:close(Socket)).


handle_call(Msg, From, State) ->
    ?Log(Msg, From,  State),
    {reply, ok, State}.

handle_cast(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.
