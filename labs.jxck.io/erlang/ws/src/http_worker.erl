%%%-------------------------------------------------------------------
%% @doc http worker
%% @end
%%%-------------------------------------------------------------------
-module(http_worker).

-behaviour(gen_server).

%% Supervisor callbacks
-export([
         start_link/1
        ]).

%% Gen Server callbacks
-export([
         init/1,
         handle_call/3,
         handle_cast/2,
         handle_info/2,
         code_change/3,
         terminate/2
        ]).

-include("logger.hrl").


%%====================================================================
%% API functions
%%====================================================================
start_link(Socket) ->
    ?Log(Socket),
    Debug = {}, % {debug, [trace]},
    gen_server:start_link(?MODULE, [Socket], [Debug]).


%%====================================================================
%% Gen Server Callbacks
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
init([Socket]) ->
    ?Log(Socket),
    process_flag(trap_exit, true),
    Request = {{}, #{}, <<>>},
    State = #{
      socket  => Socket,
      request => Request
     },
    {ok, State}.


% First Line
handle_info({http, Socket, {http_request, Method, Uri, Version}}, #{socket := Socket, request := {Req, Header, Body}}=State) ->
    % 以降はヘッダなので httph_bin
    ok = inet:setopts(Socket, [{active, once}, {packet, httph_bin}]),
    NextState = State#{request := {{Method, Uri, Version}, Header, Body}},
    ?Log(NextState),
    {noreply, NextState};


% Header
handle_info({http, Socket, {http_header, _Len, Field, _ , Value}}, #{socket := Socket, request := {Req, Header, Body}}=State) ->
    ?Log(Field, Value),
    % ヘッダが終わるまでは httph_bin
    ok = inet:setopts(Socket, [{active, once}, {packet, httph_bin}]),
    NextState = State#{request := {Req, Header#{Field => Value}, Body}},
    {noreply, NextState};


% Header End
handle_info({http, Socket, http_eoh}, #{socket := Socket, request := {Req, Header, Body}}=State) ->
    % ここで header が終わるので body を raw binary で受け取る
    % Content-Length 分だけ読むために active/false にして recv する。
    ok = inet:setopts(Socket, [binary, {packet, raw}, {active, false}]),
    Len = binary_to_integer(maps:get('Content-Length', Header, <<"0">>)),
    {ok, Data} = case Len of
                     0 -> {ok, <<>>}; % Length が無い
                     _ -> gen_tcp:recv(Socket, Len)
                 end,
    % 終わったら http_bin に戻す
    ok = inet:setopts(Socket, [{packet, http_bin}, {active, once}]),
    Request = {Req, Header, <<Body/binary, Data/binary>>},
    ?Log(Request),

    % handler を呼ぶ
    {Response, _} = http_handler:handle(Request, State),
    gen_tcp:send(Socket, Response),

    NextState = State#{request => {{}, #{}, <<>>}},

    {noreply, NextState};


handle_info(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From,  State),
    {reply, ok, State}.

handle_cast(Msg, State) ->
    ?Log(Msg),
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
