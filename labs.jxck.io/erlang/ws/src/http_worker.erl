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
    {ok, Ref} = (prim_inet:async_recv(Socket, 0, -1)),
    State = #{
      socket     => Socket,
      ref        => Ref,
      first_line => [],
      headers    => #{}
     },
    {ok, State}.



handle_info({inet_async, Socket, Ref, {ok, {http_request, Method, Path, Version}}}, #{socket := Socket, ref := Ref}=State) ->
    ?Log(Method, Path, Version),
    ok = inet:setopts(Socket, [{packet, httph_bin}]),
    {ok, NextRef} = (prim_inet:async_recv(Socket, 0, -1)),
    NextState = State#{
                  ref        := NextRef,
                  first_line := {Method, Path, Version}
                 },
    {noreply, NextState};

handle_info({inet_async, Socket, Ref, {ok, {http_header, _, Field, _, Value}}}, #{socket := Socket, ref := Ref, headers := Headers}=State) ->
    ?Log({Field, Value}),
    {ok, NextRef} = (prim_inet:async_recv(Socket, 0, -1)),
    NextState = State#{
                  ref     := NextRef,
                  headers := Headers#{Field => Value}
                 },
    {noreply, NextState};

handle_info({inet_async, Socket, Ref, {ok, http_eoh}}, #{socket := Socket, ref := Ref, headers := Headers}=State) ->
    ?Log(http_eoh),
    Len = binary_to_integer(maps:get('Content-Length', Headers, <<"0">>)),
    case Len of
        0 ->
            ?Log(handle_http(State)),
            {stop, normal, []};
        Len ->
            % body を raw で受信
            ok = inet:setopts(Socket, [{packet, raw}]),
            {ok, NextRef} = (prim_inet:async_recv(Socket, Len, -1)),
            NextState = State#{
                          ref  := NextRef,
                          body => <<>>
                         },
            {noreply, NextState}
    end;

handle_info({inet_async, Socket, Ref, {ok, Body}}, #{socket := Socket, ref := Ref, body := <<>>}=State) ->
    ?Log(Body),
    ?Log(handle_http(State#{body := Body})),
    {stop, normal, []};

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
    ok = ?Log(gen_tcp:send(Socket, <<
                                     "HTTP/1.1 200 OK\r\n"
                                     "Content-Length: 0\r\n"
                                     "\r\n"
                                   >>)),
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
