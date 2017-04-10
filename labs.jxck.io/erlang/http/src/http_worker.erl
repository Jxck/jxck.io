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
    Response = apply(?MODULE, Fn, [{URL, Header, Body}]),
    gen_tcp:send(Socket, http:encode(default(Response))),
    inet:setopts(Socket, [{active, once}]),
    {noreply, State};

handle_info({tcp_closed, Socket}, State) ->
    ?Log({tcp_closed, Socket}),
    ?Log(gen_tcp:close(Socket)),
    {stop, normal, maps:remove(socket, State)};

handle_info({tcp_error, Socket, Reason}, State) ->
    ?Log({tcp_error, Socket, Reason}),
    ?Log(gen_tcp:close(Socket)),
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

get({"/", _Header, _Body}) ->
    #{ status  => "200",
       headers => #{
         "Content-Type" => "text/html; charset=utf-8",
         "Connection" => "close",
         "Server" => "erlang"
        },
       body => <<
                 "<!DOCTYPE html>",
                 "<meta charset=utf-8>",
                 "<meta name=viewport content='width=device-width,initial-scale=1'>",
                 "<meta name=description content=demo>",
                 "<title>DEMO</title>",
                 "<h1>Test</h1>"
               >>
     };

get({_URL, _Header, _Body}) ->
    ?Log(_URL),
    #{ status  => "200",
       headers => #{
         "Content-Type" => "text/html; charset=utf-8",
         "Connection" => "close",
         "Server" => "erlang"
        },
       body => <<>>
     }.
