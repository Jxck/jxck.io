%%%-------------------------------------------------------------------
%% @doc http connection worker
%% @end
%%%-------------------------------------------------------------------

-module(http_worker).

-include("logger.hrl").

%% Supervisor callbacks
-export([
         start_link/1
        ]).

-export([
         init/2,
         loop/4
         % system_continue/3,
         % system_terminate/4,
         % system_get_state/1,
         % system_replace_state/2
        ]).


%%====================================================================
%% API functions
%%====================================================================

start_link(Socket) ->
    proc_lib:start_link(?MODULE, init, [self(), Socket]).


%%====================================================================
%% Internal functions
%%====================================================================

init(Parent, Socket) ->
    ?Log(Parent, Socket),

    % 最初は {packet, http_bin} でパースを依頼する
    ok = inet:setopts(Socket, [{active, false}, {packet, http_bin}]),
    Debug = sys:debug_options([]),
    State = {{}, #{}, <<>>}, % {Request, Header, Body}

    % ACK を返してからループ
    ?Log(proc_lib:init_ack(Parent, {ok, self()})),

    loop(Parent, Socket, Debug, State).


loop(Parent, Socket, Debug, {Req, Header, Body}=State) ->
    case ?Log(gen_tcp:recv(Socket, 0)) of
        % First Line
        {ok, {http_request, Method, Uri, Version}} ->
            % 以降はヘッダなので httph_bin
            ok = inet:setopts(Socket, [{packet, httph_bin}]),
            NextState = {{Method, Uri, Version}, Header, Body},
            loop(Parent, Socket, Debug, NextState);

        % Header
        {ok, {http_header, _Len, Field, _ , Value}} ->
            % ヘッダが終わるまでは httph_bin
            ok = inet:setopts(Socket, [{packet, httph_bin}]),
            NextState = {Req, Header#{Field => Value}, Body},
            loop(Parent, Socket, Debug, NextState);

        % Header End
        {ok, http_eoh} ->
            % ここで header が終わるので body を raw binary で受け取る
            % Content-Length 分だけ読むために active/false にして recv する。
            ok = inet:setopts(Socket, [{packet, raw}]),
            Len = binary_to_integer(maps:get('Content-Length', Header, <<"0">>)),
            {ok, Data} = case Len of
                             0 -> {ok, <<>>};
                             _ -> gen_tcp:recv(Socket, Len)
                         end,

            % 終わったら http_bin に戻す
            ok = inet:setopts(Socket, [{packet, http_bin}]),
            NextState = {Req, Header, <<Body/binary, Data/binary>>},

            % handler を呼ぶ
            case handle_request(Socket, NextState) of
                ok ->
                    loop(Parent, Socket, Debug, NextState);
                upgrde ->
                    ?Log(upgrade),
                    ok
            end;

        {error, closed} ->
            ?Log(gen_tcp:close(Socket));

        Error ->
            ?Log(Error)
    end.



handle_request(Socket,
               {{'GET', {abs_path, <<"/">>}, {1,1}},
                #{ 'Connection'                := <<"Upgrade">>,
                   'Upgrade'                   := <<"websocket">>,
                   <<"Sec-Websocket-Key">>     := Key,
                   <<"Sec-Websocket-Version">> := <<"13">>
                 },
                <<>>}=Req) ->
    ?Log(handle, Req),
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
    ok = gen_tcp:controlling_process(Socket, Pid),
    upgrade;


handle_request(Socket, {{'GET', _, _}, _, _}=Req) ->
    ?Log(handle, Req),
    gen_tcp:send(Socket, <<
                           "HTTP/1.1 200 OK\r\n"
                           "Content-Length: 0\r\n"
                           "\r\n"
                         >>);

handle_request(Socket, {{'POST', _, _}, _, Body}=Res) ->
    ?Log(handle, Res),
    Length = integer_to_binary(byte_size(Body)),
    gen_tcp:send(Socket, <<
                           "HTTP/1.1 200 OK\r\n"
                           "Content-Length: ", Length/binary, "\r\n"
                           "\r\n",
                           Body/binary
                         >>).


% receive_message(Parent, Socket, Debug) ->
%     receive
%         {system, From, Request} ->
%             sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, Socket)
%     end.
%
% system_continue(Parent, Socket, Debug) ->
%     loop(Parent, Socket, Debug).
%
% system_terminate(Reason, _Parent, _Debug, _Socket) ->
%     exit(Reason).
%
% system_get_state(Socket) ->
%     {ok, Socket}.
%
% system_replace_state(StateFun, Chs) ->
%     NChs = StateFun(Chs),
%     {ok, NChs, NChs}.
%
% write_debug(Dev, Event, Name) ->
%     io:format(Dev, "~p event = ~p~n", [Name, Event]).
