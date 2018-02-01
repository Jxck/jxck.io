%%%-------------------------------------------------------------------
%% @doc ws connection worker
%% @end
%%%-------------------------------------------------------------------

-module(ws_worker).

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
    ok = inet:setopts(Socket, [{active, false}, {packet, raw}]),
    Debug = sys:debug_options([]),
    State = #{state => header},

    % ACK を返してからループ
    ?Log(proc_lib:init_ack(Parent, {ok, self()})),

    loop(Parent, Socket, Debug, State).


loop(Parent, Socket, Debug, #{state := header}=State) ->
    case ?Log(gen_tcp:recv(Socket, 2)) of
        {ok, <<FIN:1, RSV1:1, RSV2:1, RSV3:1, OP:4, Mask:1, Len:7>>} ->
            Length = case Len of
                         126 ->
                             {ok, <<L:16>>} = (gen_tcp:recv(Socket, 2)),
                             L;
                         127 ->
                             {ok, <<L:64>>} = (gen_tcp:recv(Socket, 8)),
                             L;
                         L   ->
                             L
                     end,

            ?Log(FIN, RSV1, RSV2, RSV3, OP, Mask, Length),
            NextState = #{
              state  => mask,
              fin    => FIN,
              rsv1   => RSV1,
              rsv2   => RSV2,
              rsv3   => RSV3,
              opcode => opcode(OP),
              mask   => Mask,
              length => Length
             },
            ?Log(NextState),
            loop(Parent, Socket, Debug, NextState);

        {error, closed} ->
            ?Log(gen_tcp:close(Socket));

        Error ->
            ?Log(Error)
    end;

loop(Parent, Socket, Debug, #{state := mask, mask := 0}=State) ->
    loop(Parent, Socket, Debug, State#{state => body, masking_key => <<>>});

loop(Parent, Socket, Debug, #{state := mask, mask := 1}=State) ->
    case ?Log(gen_tcp:recv(Socket, 4)) of
        {ok, <<MaskingKey:4/binary>>} ->
            ?Log(MaskingKey),
            loop(Parent, Socket, Debug, State#{state => body, masking_key => MaskingKey});

        {error, closed} ->
            ?Log(gen_tcp:close(Socket));

        Error ->
            ?Log(Error)
    end;

loop(Parent, Socket, Debug, #{state := body, length := Length, masking_key := MaskingKey}=State) ->
    case ?Log(gen_tcp:recv(Socket, Length)) of
        {ok, Payload} ->
            Body = ?Log(unmask(Payload, MaskingKey)),
            ?Log(byte_size(Body)),

            loop(Parent, Socket, Debug, #{state => header});
        {error, closed} ->
            ?Log(gen_tcp:close(Socket));

        Error ->
            ?Log(Error)
    end.



opcode(16#00)   -> continuation_frame;
opcode(16#01)   -> text_frame;
opcode(16#02)   -> binary_frame;
opcode(16#03)   -> reserved_non_control1;
opcode(16#04)   -> reserved_non_control2;
opcode(16#05)   -> reserved_non_control3;
opcode(16#06)   -> reserved_non_control4;
opcode(16#07)   -> reserved_non_control5;
opcode(16#08)   -> connection_close;
opcode(16#09)   -> ping;
opcode(16#0A)   -> pong;
opcode(16#0B)   -> reserved_control_frames1;
opcode(16#0C)   -> reserved_control_frames2;
opcode(16#0D)   -> reserved_control_frames3;
opcode(16#0E)   -> reserved_control_frames4;
opcode(16#0F)   -> reserved_control_frames5;
opcode(Unknown) -> Unknown.


unmask(Payload, MaskingKey) ->
    unmask(Payload, MaskingKey, <<>>).

unmask(<<Head:32, Rest/binary>>, <<Key:32>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:32>>);

unmask(<<Head:24, Rest/binary>>, <<Key:24, _/binary>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:24>>);

unmask(<<Head:16, Rest/binary>>, <<Key:16, _/binary>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:16>>);

unmask(<<Head:8, Rest/binary>>, <<Key:8, _/binary>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:8>>);

unmask(<<>>, _, Acc) ->
    ?Log(Acc).



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
