%%%-------------------------------------------------------------------
%% @doc ws connection worker
%% @end
%%%-------------------------------------------------------------------

-module(ws_worker).

-include("logger.hrl").

-behaviour(gen_server).

%% Supervisor callbacks
-export([
         init/1,
         start_link/1,
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
    ?Log(inet:setopts(Socket, [binary, {active, once}])),
    gen_server:start_link(?MODULE, Socket, [{debug, [trace]}]).

init(Socket) ->
    ?Log(Socket),
    State = #{socket => Socket},
    {ok, State}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From, State),
    {reply, Msg, State}.

handle_cast(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info({tcp, Socket, Packet}, State) ->
    ?Log(Packet),
    WS = ws:decode(Packet),
    ?Log(WS),
    Payload = maps:get(payload, WS),
    gen_tcp:send(Socket, ws:encode({text_frame, Payload})),
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
