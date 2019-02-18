-module(udp_listener).
-behaviour(gen_statem).
-mode(compile).
-compile(export_all).
-include("../logger.hrl").

-define(TIMEOUT, 10000).

%%====================================================================
%% API functions
%%====================================================================
start_link(#{}, #{socket := Socket}) ->
    ?Log(Socket),
    Name = main:name_from_port(?MODULE, Socket),
    ?Log(gen_statem:start_link({local, Name}, ?MODULE, #{socket => Socket}, [])).

stop(Pid) ->
    ?Log(gen_statem:stop(Pid)).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{socket := Socket}=State) ->
    process_flag(trap_exit, true),

    % spawn worker and link
    {ok, DTLS} = ?Log(dtls_worker_sup:start_child(#{socket => Socket})),
    {ok, SRTP} = ?Log(srtp_worker_sup:start_child(#{socket => Socket})),

    true = ?Log(link(DTLS)),
    true = ?Log(link(SRTP)),

    NextState = State#{
                  dtls_worker => DTLS,
                  srtp_worker => SRTP
                 },

    {ok, listening, NextState}.

callback_mode() ->
    state_functions.


listening(info, {'EXIT', PID, Reason}, State) ->
    ?Log(PID, Reason),
    ?Log(State),
    {stop, {shutdown, child_termination}};



listening(info, {udp, Socket, IP, Port, Packet}, #{socket      := Socket,
                                                   dtls_worker := DTLS,
                                                   srtp_worker := SRTP}=State) ->
    ?Log(Packet, State),
    case Packet of
        <<"dtls\n">> -> gen_statem:cast(DTLS, Packet);
        <<"srtp\n">> -> gen_statem:cast(SRTP, Packet)
    end,
    ok = inet:setopts(Socket, [{active, once}, binary]),
    keep_state_and_data;




listening(timeout, ?TIMEOUT, State) ->
    {stop, {shutdown, timeout}};

listening(cast, udp, State) ->
    ?Log(received, udp),
    {keep_state_and_data, ?TIMEOUT};

listening(cast, dtls, #{dtls_worker := DTLS}=State) ->
    gen_statem:cast(DTLS, dtls),
    {keep_state_and_data, ?TIMEOUT};

listening(cast, srtp, #{srtp_worker := SRTP}=State) ->
    gen_statem:cast(SRTP, srtp),
    {keep_state_and_data, ?TIMEOUT};

listening(cast, Msg, State) ->
    ?Log(Msg, State),
    keep_state_and_data.


% Reason should be timeout or child_termination
terminate(Reason, StateName, #{dtls_worker := DTLS, srtp_worker := SRTP}=State) ->
    ?Log(Reason, StateName, State),
    ok = ?Log(dtls_worker_sup:terminate_child(DTLS)),
    ok = ?Log(srtp_worker_sup:terminate_child(SRTP)),
    ok.


%%====================================================================
%% Internal functions
%%====================================================================
