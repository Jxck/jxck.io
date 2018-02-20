#!/usr/bin/env escript
-module(tlv).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_server).

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
init(_Args) ->
    State = {<<>>, []},
    {ok, State}.

parse({<<T:16, L:16, V:L/binary, Rest/binary>>, Acc}) ->
    ?Log(T, L, V),
    parse({Rest, [{T,L,V}|Acc]});

parse(Arg) ->
    Arg.



handle_cast(Msg, {Buffer, Result}=State) ->
    ?Log(Msg, State),
    NextState = parse({<<Buffer/binary, Msg/binary>>, Result}),
    ?Log(NextState),
    {noreply, NextState}.

handle_call(Msg, From, State) ->
    ?Log(Msg),
    {reply, From, State}.

handle_info(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.


%% main
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

send(Packet) ->
    gen_server:cast(?MODULE, Packet).

stop() ->
    gen_server:stop(?MODULE).


main(_) ->
    ?Log(start_link()),
    (send(<<0>>)), % T
    (send(<<1>>)),
    (send(<<0>>)), % L
    (send(<<2>>)),
    (send(<<16#61>>)), % V
    (send(<<16#61>>)),
    ok = stop().
