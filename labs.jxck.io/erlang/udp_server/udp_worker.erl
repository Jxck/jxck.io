-module(udp_worker).
-behaviour(gen_statem).
-mode(compile).
-compile(export_all).
-include("logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{socket := Socket}=State) ->
    % process name from port
    Name = main:name_from_port(?MODULE, Socket),
    gen_statem:start_link({local, Name}, ?MODULE, State, []).

stop() ->
    gen_server:stop(?MODULE).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{socket := Socket}) ->
    process_flag(trap_exit, true),
    State = #{socket => Socket},
    {ok, listening, State}.

callback_mode() ->
    state_functions.

terminate(Reason, Name, #{socket := Socket}) ->
    ?Log(Reason, Name, Socket),
    % Worker = main:name_from_port(udp_sup, Socket),
    % sfu_sup:terminate_child(whereis(Worker)),
    {shutdown, timeout}.


listening(info, {udp, Socket, IP, Port, <<"dtls\n">>=Packet}, #{socket := Socket}) ->
    ?Log(IP, Port, Packet),
    Worker = main:name_from_port(dtls_worker, Socket), % forward to dtls_worker
    ok = gen_statem:cast(Worker, Packet),
    ok = inet:setopts(Socket, [{active, once}, binary]),
    {keep_state_and_data, 1000};

listening(info, {udp, Socket, IP, Port, <<"srtp\n">>=Packet}, #{socket := Socket}) ->
    ?Log(IP, Port, Packet),
    Worker = main:name_from_port(srtp_worker, Socket), % forward to srtp_worker
    ok = gen_statem:cast(Worker, Packet),
    ok = inet:setopts(Socket, [{active, once}, binary]),
    {keep_state_and_data, 1000};

listening(info, {udp, Socket, IP, Port, Packet}, #{socket := Socket}) ->
    ?Log(IP, Port, Packet, Socket),
    ok = inet:setopts(Socket, [{active, once}, binary]),
    {keep_state_and_data, 1000}; % set timeout

listening(timeout, 1000, #{socket := Socket}) ->
    ?Log(timeout, 1000, Socket),
    {stop, normal}.


%%====================================================================
%% Internal functions
%%====================================================================
