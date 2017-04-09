%%%-------------------------------------------------------------------
%% @doc http connection worker
%% @end
%%%-------------------------------------------------------------------

-module(http_worker).

-include("logger.hrl").

-behaviour(gen_server).

%% Supervisor callbacks
-export([
         start_link/1,
         code_change/3,
         handle_call/3,
         handle_cast/2,
         handle_info/2,
         init/1,
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
            %% 101 を返したら、 ws_worker を起動し
            %% 制御を移譲する。移譲してから {active,once} を resume
            %% するため、ここではしない。
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
    ?Log(Hash),
    #{ status  => "101",
       headers => #{
         "Upgrade" => "websocket",
         "Connection" => "Upgrade",
         "Sec-WebSocket-Accept" => Hash
        },
       body => <<>>
     };

get({"/", _Header, _Body}) ->
    #{ status  => "200",
       headers => #{
         "Content-Type" => "text/html; charset=utf-8",
         "Connection" => "close",
         "Server" => "erlang"
        },
       body => <<
                 "<!DOCTYPE html>\r\n",
                 "<meta charset=utf-8>\r\n",
                 "<meta name=viewport content='width=device-width,initial-scale=1'>\r\n",
                 "<meta name=description content=demo>\r\n",
                 "<title>DEMO</title>\r\n",
                 "<h1>Test</h1>\r\n",
                 "<script>\r\n",
                 "ws = new WebSocket('ws://localhost:3000', [])\r\n",
                 "ws.onopen = (e) => {\r\n",
                 "  console.log(e)\r\n",
                 "  ws.send('aaa')\r\n",
                 "}\r\n",
                 "</script>"
               >>
     };

get({"/favicon.ico", _Header, _Body}) ->
    #{ status  => "404",
       headers => #{
        },
       body => <<>>
     };

get({_URL, _Header, _Body}) ->
    ?Log("---------------------------------------"),
    ?Log(_URL),
    #{ status  => "200",
       headers => #{
         "Content-Type" => "text/html; charset=utf-8",
         "Connection" => "close",
         "Server" => "erlang"
        },
       body => <<>>
     }.
