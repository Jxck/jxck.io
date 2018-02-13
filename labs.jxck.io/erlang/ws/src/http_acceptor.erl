%%%-------------------------------------------------------------------
%% @doc http acceptor
%% @end
%%%-------------------------------------------------------------------

-module(http_acceptor).
-behaviour(gen_server).

-include("logger.hrl").

%% Supervisor callbacks
-export([
         start_link/1
        ]).

-export([
         init/1,
         handle_call/3,
         handle_cast/2,
         handle_info/2,
         code_change/3,
         terminate/2
        ]).


%%====================================================================
%% API functions
%%====================================================================
start_link(ListenSocket) ->
    ?Log(ListenSocket),
    Debug = {debug, [trace]},
    gen_server:start_link(?MODULE, [ListenSocket], [Debug]).

%%====================================================================
%% Internal functions
%%====================================================================

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
init([ListenSocket]) ->
    ?Log(ListenSocket),
    {ok, Ref} = ?Log(prim_inet:async_accept(ListenSocket, -1)),
    State = {ListenSocket, Ref},
    {ok, State}.


handle_call(Msg, From, State) ->
    ?Log(Msg, From,  State),
    {reply, ok, State}.

handle_cast(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

handle_info({inet_async, ListenSocket, Ref, {ok, Socket}}, {ListenSocket, Ref}=State) ->
    ?Log(accept, Socket, State),

    % get Listening Socket Module
    {ok, Mod} = ?Log(inet_db:lookup_socket(ListenSocket)),

    % set Socket Module same as Listening Socket
    true = inet_db:register_socket(Socket, Mod),

    % getopts of Listening Socket
    Opts = [active, nodelay, keepalive, delay_send, priority, tos],
    {ok, SockOpt} = ?Log(prim_inet:getopts(ListenSocket, Opts)),
    ok = prim_inet:setopts(Socket, SockOpt),

    % start worker
    {ok, Pid} = ?Log(http_worker_sup:start_child(Socket)),

    % delegate socket controle
    ok = gen_tcp:controlling_process(Socket, Pid),

    % change to active once
    ok = inet:setopts(Socket, [{active, once}]),

    {ok, NextRef} = (prim_inet:async_accept(ListenSocket, -1)),
    NextState = {ListenSocket, NextRef},

    {noreply, NextState};

handle_info(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.
