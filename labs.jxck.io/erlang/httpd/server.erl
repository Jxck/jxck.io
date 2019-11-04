#!/usr/bin/env escript
-module(server).

-mode(compile).
-compile(export_all).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).
-define(Log(A, B, C),          io:format("[~p:~p#~p] ~p ~p ~p~n",          [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C         ])).
-define(Log(A, B, C, D),       io:format("[~p:~p#~p] ~p ~p ~p ~p~n",       [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D      ])).
-define(Log(A, B, C, D, E),    io:format("[~p:~p#~p] ~p ~p ~p ~p ~p~n",    [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E   ])).
-define(Log(A, B, C, D, E, F), io:format("[~p:~p#~p] ~p ~p ~p ~p ~p ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F])).

-include_lib("inets/include/httpd.hrl").

-define(KEY,  "/keys/privkey.pem").
-define(CERT, "/keys/cert.pem").
-define(RtoM(Name, Record), lists:foldl(fun({I, E}, Acc) -> Acc#{E => element(I, Record)} end, #{}, lists:zip(lists:seq(2, (record_info(size, Name))), (record_info(fields, Name))))).

main(_) ->
    start_server(),
    receive
        ok -> ok
    end.


start_server() ->
    ?Log(inets:start()),
    ?Log(inets:start(httpd, [{port, 4443},
                             {server_name, "localhost"},
                             {server_root,"./"},
                             {document_root,"./static"},
                             {directory_index, ["index.html"]},
                             {customize, ?MODULE},
                             %% SSL config
                             {socket_type, {essl, [
                                                   {keyfile, ?KEY},
                                                   {certfile, ?CERT}
                                                  ]}},
                             {modules, [mod_alias,
                                        mod_auth,
                                        mod_esi,
                                        mod_actions,
                                        mod_cgi,
                                        mod_dir,
                                        mod_get,
                                        mod_head,
                                        mod_log,
                                        mod_disk_log,
                                        ?MODULE]}
                            ])).


do(Arg) ->
    %?Log(">>>>>>>>>>>>>>>>>>>>>>>>"),
    %?Log(data,         Arg#mod.data),
    %?Log(socket_type,  Arg#mod.socket_type),
    %?Log(socket,       Arg#mod.socket),
    %?Log(config_db,    Arg#mod.config_db),
    %?Log(method,       Arg#mod.method),
    %?Log(absolute_uri, Arg#mod.absolute_uri),
    %?Log(request_uri,  Arg#mod.request_uri),
    %?Log(http_version, Arg#mod.http_version),
    %?Log(request_line, Arg#mod.request_line),
    %?Log(parsed_header,Arg#mod.parsed_header),
    %?Log(entity_body,  Arg#mod.entity_body),
    %?Log(connection,   Arg#mod.connection),
    %?Log(httpd_socket:peername(Arg#mod.socket_type, Arg#mod.socket)),
    %?Log("<<<<<<<<<<<<<<<<<<<<<<<<"),
    {proceed, [{response, {200, "hello"}}]}.


response_default_headers() ->
    [
     {"X-Server", "erlang"}
    ].

response_header(H) ->
    %?Log(H),
    {true, H}.

request_header(H) ->
    %?Log(H),
    {true, H}.
