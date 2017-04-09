%%%-------------------------------------------------------------------
%% @doc ws connection worker
%% @end
%%%-------------------------------------------------------------------

-module(ws_worker).

-include("logger.hrl").

-behaviour(gen_server).

%% Supervisor callbacks
-export([
         start_link/1,
         code_change/3,
         handle_call/3,
         handle_cast/2,
         handle_info/2,
         init/1,
         terminate/2
        ]).


%%====================================================================
%% API functions
%%====================================================================

start_link(Socket) ->
    gen_server:start_link(?MODULE, Socket, []).

init(Socket) ->
    ?Log(Socket),
    State = #{socket => Socket},
    %% 制御を移譲されてから {active,once} を resume する。
    inet:setopts(Socket, [{active, once}]),
    {ok, State}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From, State),
    {reply, Msg, State}.

handle_cast(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info({tcp, Socket, Packet}, State) ->
    ?Log(Packet),
    WS = decode(Packet),
    ?Log(WS),
    %gen_tcp:send(Socket, Packet),
    inet:setopts(Socket, [{active, once}]),
    {noreply, State};

handle_info({tcp, Socket, Packet}, State) ->
    ?Log(Packet),
    inet:setopts(Socket, [{active, once}]),
    {noreply, State};

handle_info({tcp_closed, Socket}, State) ->
    ?Log({tcp_closed, Socket}),
    ok = gen_tcp:close(Socket),
    {stop, normal, maps:remove(socket, State)};

handle_info({tcp_error, Socket, Reason}, State) ->
    ?Log({tcp_error, Socket, Reason}),
    ok = gen_tcp:close(Socket),
    {stop, normal, maps:remove(socket, State)};

handle_info(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.


%%====================================================================
%% Internal functions
%%====================================================================
decode(Packet) ->
    ws:decode(Packet).
