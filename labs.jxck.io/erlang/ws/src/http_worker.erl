%%%-------------------------------------------------------------------
%% @doc http connection worker
%% @end
%%%-------------------------------------------------------------------

-module(http_worker).

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

-export([get/1]).

%%====================================================================
%% API functions
%%====================================================================

start_link(Socket) ->
    gen_server:start_link(?MODULE, Socket, []).

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
    {ok, #{method := Method, target := URL, headers := Header, body := Body}} = http:decode(Packet),
    ?Log(Method, URL, from, Socket),
    Fn = list_to_atom(string:to_lower(Method)),

    case (default(apply(?MODULE, Fn, [{URL, Header, Body}]))) of
        #{status  := "101", headers := #{"Upgrade" := "websocket"}}=Response ->
            %% websocket へのアップグレード
            %% 101 を返したら ws_worker を起動し制御を移譲する。
            gen_tcp:send(Socket, http:encode(Response)),
            maps:remove(socket, State),
            {ok, Pid} = ws_worker_sup:start_child(Socket),
            gen_tcp:controlling_process(Socket, Pid);
        Response ->
            gen_tcp:send(Socket, http:encode(Response)),
            inet:setopts(Socket, [{active, once}])
    end,
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

content_type(Path) ->
    case filename:extension(Path) of
         ".html" -> "text/html";
         ".js"   -> "text/javascript";
         ".css"  -> "text/css";
         ".ico"  -> "image/vnd.microsoft.icon"
    end.

default(#{body := Body, headers := _Headers}=Response) ->
    DefaultHeader = #{
      "Date" => httpd_util:rfc1123_date(),
      "Content-Length" => integer_to_list(byte_size(Body))
     },
    Headers = maps:merge(DefaultHeader, _Headers),
    maps:put(headers, Headers, Response).

%% WebSocket Upgrade
get({"/", #{
       "Connection" := "Upgrade",
       "Upgrade" := "websocket",
       "Sec-WebSocket-Key" := Key,
       "Sec-WebSocket-Version" := Version
      }=Header, _Body}) ->

    Hash = base64:encode(crypto:hash(sha, Key ++ "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")),
    #{ status  => "101",
       headers => #{
         "Upgrade" => "websocket",
         "Connection" => "Upgrade",
         "Sec-WebSocket-Accept" => Hash
        },
       body => <<>>
     };

get({URL, _Header, _Body}) ->
    Path = case filelib:is_dir(URL) of
               true  -> "./static/" ++ URL ++ "index.html";
               false -> "./static/" ++ URL
           end,
    {ok, File} = file:read_file(Path),
    #{ status  => "200",
       headers => #{
         "Content-Type" => content_type(Path),
         "Connection" => "close",
         "Server" => "erlang"
        },
       body => File
     }.
