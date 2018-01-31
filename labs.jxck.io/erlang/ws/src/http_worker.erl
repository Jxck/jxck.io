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
    Debug = sys:debug_options([]),
    proc_lib:init_ack(Parent, {ok, self()}),
    State = {{}, #{}, <<>>}, % {Request, Header, Body}
    loop(Parent, Socket, Debug, State).

loop(Parent, Socket, Debug, {Req, Header, Body}=State) ->
    case ?Log(gen_tcp:recv(Socket, 0)) of
        % First Line
        {ok, {http_request, Method, Uri, Version}} ->
            % 以降はヘッダなので httph_bin
            ok = inet:setopts(Socket, [{active, false}, {packet, httph_bin}]),

            % first line
            ?Log(Method, Uri, Version),
            NextState = {{Method, Uri, Version}, Header, Body},
            loop(Parent, Socket, Debug, NextState);

        % Header
        {ok, {http_header, _Len, Field, _ , Value}} ->
            % ヘッダが終わるまでは httph_bin
            ok = inet:setopts(Socket, [{active, false}, {packet, httph_bin}]),
            NextState = {Req, Header#{Field => Value}, Body},
            loop(Parent, Socket, Debug, NextState);

        % Header End
        {ok, http_eoh} ->
            % ここで header が終わるので body を raw binary で受け取る
            % Content-Length 分だけ読むために active/false にして recv する。
            ok = inet:setopts(Socket, [binary, {packet, raw}, {active, false}]),
            Len = binary_to_integer(maps:get('Content-Length', Header, <<"0">>)),
            {ok, Data} = case Len of
                             0 -> {ok, <<>>};
                             _ -> gen_tcp:recv(Socket, Len)
                         end,

            % 終わったら http_bin に戻す
            ok = inet:setopts(Socket, [{packet, http_bin}, {active, false}]),
            NextState = {Req, Header, <<Body/binary, Data/binary>>},

            % handler を呼ぶ
            handle_request(Socket, NextState),

            loop(Parent, Socket, Debug, NextState);

        {error, closed} ->
            ?Log(gen_tcp:close(Socket));

        Error ->
            ?Log(Error)
    end.


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
