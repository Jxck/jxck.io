-module(service_worker).
-behaviour(gen_server).
-mode(compile).
-compile(export_all).
-include("../logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{count := Count}, #{delta := Delta}) ->
    % ここでプロセスの名前をつける。
    ?Log(gen_server:start_link({local, name(Delta)}, ?MODULE, {Count, Delta}, [])).

stop(Pid) ->
    ?Log(gen_server:stop(Pid)).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init({Count, Delta}) ->
    process_flag(trap_exit, true), % これをしないと terminate が呼ばれない
    ?Log(Count, Delta),
    {ok, {Count, Delta}}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From, State),
    {reply, Msg, State}.

handle_cast(incr, {C, D}) ->
    Next = C + D,
    {noreply, {Next, D}};

handle_cast(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    normal.


%%====================================================================
%% Internal functions
%%====================================================================
name(Delta) ->
    Int = integer_to_list(Delta),
    Name = list_to_atom(lists:concat([?MODULE, '_', Int])).
