%%%-------------------------------------------------------------------
%% @doc http connection worker
%% @end
%%%-------------------------------------------------------------------

-module(http_worker).

-include("logger.hrl").

%% Supervisor callbacks
-export([start_link/1]).

%%====================================================================
%% API functions
%%====================================================================

start_link(Socket)->
    Pid = ?Log(spawn_link(fun() -> process(Socket, 0, 30 * 1000) end)),
    {ok, Pid}.


%%====================================================================
%% Internal functions
%%====================================================================

process(Socket, Size, Timeout) ->
    case (gen_tcp:recv(Socket, Size, Timeout)) of
        {ok, Packet} ->
            Response = response(Packet),
            gen_tcp:send(Socket, Response),
            gen_tcp:close(Socket);
        {error, Reason} ->
            ?Log("failed to recv:", Reason),
            gen_tcp:close(Socket)
    end.

response(Request) ->
    ?Log(http:decode(Request)),
    <<
      "HTTP/1.0 200 OK\r\n",
      "Date: Tue, 25 Oct 2016 10:21:33 GMT\r\n",
      "Connection: close\r\n",
      "Content-Type: text/plain; charset=utf-8\r\n",
      "Content-Length: 11\r\n",
      "\r\n",
      "hello world"
    >>.
