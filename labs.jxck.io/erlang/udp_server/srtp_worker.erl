-module(srtp_worker).
-behaviour(gen_server).
-mode(compile).
-compile(export_all).
-include("logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{socket := Socket}=State) ->
    % process name from port
    Name = main:name_from_port(?MODULE, Socket),
    gen_server:start_link({local, Name}, ?MODULE, State, []).

stop() ->
    gen_server:stop(?MODULE).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{socket := Socket}) ->
    process_flag(trap_exit, true),
    State = #{socket => Socket},
    {ok, State}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From, State),
    {reply, Msg, State}.

handle_cast(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info({udp, Socket, IP, Port, Packet}, #{socket := Socket}=State) ->
    ?Log(IP, Port, Packet),
    ok = inet:setopts(Socket, [{active, once}, binary]),
    {noreply, State}.


terminate(Reason, State) ->
    ?Log(Reason, State),
    shutdown.


%%====================================================================
%% Internal functions
%%====================================================================
