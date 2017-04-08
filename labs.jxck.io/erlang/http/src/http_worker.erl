%%%-------------------------------------------------------------------
%% @doc http connection worker
%% @end
%%%-------------------------------------------------------------------

-module(http_worker).

-include("logger.hrl").

%% Supervisor callbacks
-export([start_link/1]).

-export([get/1]).

%%====================================================================
%% API functions
%%====================================================================

start_link(Socket)->
    Pid = ?Log(spawn_link(fun() -> process(Socket, 0, 30 * 1000) end)),
    {ok, Pid}.


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


process(Socket, Size, Timeout) ->
    case (gen_tcp:recv(Socket, Size, Timeout)) of
        {ok, Packet} ->
            {ok, #{method := Method, target := URL, headers := Header, body := Body}} = http:decode(Packet),
            Fn = list_to_atom(string:to_lower(Method)),
            Response = apply(?MODULE, Fn, [{URL, Header, Body}]),
            gen_tcp:send(Socket, http:encode(default(Response))),
            gen_tcp:close(Socket);
        {error, Reason} ->
            ?Log("failed to recv:", Reason),
            gen_tcp:close(Socket)
    end.

get({URL, Header, Body}) ->
    #{ status  => "200",
       headers => #{
         "Content-Type" => "text/html; charset=utf-8",
         "Connection" => "close",
         "Server" => "erlang"
        },
       body => <<"<h1>hello world</h1>">>
     }.
