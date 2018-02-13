%%%-------------------------------------------------------------------
%% @doc http request/response handler
%% @end
%%%-------------------------------------------------------------------
-module(http_handler).

%% API
-export([
         handle/2,
         'GET'/2

        ]).

-include("logger.hrl").


%%====================================================================
%% API functions
%%====================================================================
content_type(Path) ->
    case filename:extension(Path) of
        ".html" -> "text/html";
        ".js"   -> "text/javascript";
        ".mjs"  -> "text/javascript";
        ".css"  -> "text/css";
        ".png"  -> "image/png";
        ".jpg"  -> "image/jpeg";
        ".jpeg" -> "image/jpeg";
        ".webp" -> "image/webp";
        ".ico"  -> "image/vnd.microsoft.icon"
    end.

handle({{Method, {abs_path, URL}, {1,1}}, Header, Body}, #{socket := Socket}=State) ->
    % メソッドを元にハンドラを呼び出す
    {Response, NextState} = apply(?MODULE, Method, [{binary_to_list(URL), Header, Body}, State]),
    handle_response(Response, NextState).


handle_response(<<>>, State) ->
    % upgrade のときはレスポンスが無いので
    % 空のレスポンスを返す
    % 実際には何も送られない
    {<<>>, State};

handle_response(#{body := Body, headers := _Headers}=Response, State) ->
    DefaultHeader = #{
      "Content-Length" => integer_to_list(byte_size(Body))
     },
    Headers = maps:merge(DefaultHeader, _Headers),
    ResponsePacket = encode(maps:put(headers, Headers, Response)),
    {ResponsePacket, State}.


-define(SP, <<" ">>).
-define(CRLF, <<"\r\n">>).
encode(#{status := Status, headers := Headers, body := Body}) ->
    Header = maps:fold(fun(K, V, Acc) ->
                               [[K, ": ", V, ?CRLF] | Acc]
                       end, [], Headers),

    list_to_binary(["HTTP/1.1", ?SP, Status, ?SP, reason(Status), ?CRLF, Header, ?CRLF, Body]);

encode(#{method := Method, target := URL, headers := Headers, body := Body}) ->
    Header = maps:fold(fun(K, V, Acc) ->
                               [[K, ": ", V, ?CRLF] | Acc]
                       end, [], Headers),

    list_to_binary([Method, ?SP, URL, ?SP, "HTTP/1.1", ?CRLF, Header, ?CRLF, Body]).




%% WebSocket Upgrade
'GET'({"/", #{
 'Upgrade'                   := <<"websocket">>,
 <<"Sec-Websocket-Key">>     := Key,
 <<"Sec-Websocket-Version">> := <<"13">>
}, _Body}, #{socket := Socket}=State) ->

  GUID = <<"258EAFA5-E914-47DA-95CA-C5AB0DC85B11">>,
  Hash = base64:encode(crypto:hash(sha, <<Key/binary, GUID/binary>>)),
  Response = #{status  => "101",
               headers => #{
                 "Upgrade"              => "websocket",
                 "Connection"           => "Upgrade",
                 "Sec-WebSocket-Accept" => Hash
                },
               body => <<>>
              },

  %% websocket へのアップグレード
  %% 101 を返したら ws_worker を起動し制御を移譲する。
  ok = gen_tcp:send(Socket, encode(Response)),
  {ok, Pid} = ws_worker_sup:start_child(Socket),
  ok = gen_tcp:controlling_process(Socket, Pid),

  % HTTP サーバからは <<>> を send する
  % 実際にはパケットは飛ばない
  {<<>>, maps:remove(socket, State)};


%% TODO: fixme with Directory Traversal
'GET'({URL, _Header, _Body}, State) ->
    {ok, Dir} = file:get_cwd(),
    ?Log(Dir),
    Path = case filelib:is_dir(URL) of
               true  -> Dir ++ "/static/" ++ URL ++ "index.html";
               false -> Dir ++ "/static/" ++ URL
           end,
    {ok, File} = file:read_file(Path),
    Response = #{status  => "200",
                 headers => #{
                   "Content-Type"   => content_type(Path),
                   "Content-Length" => integer_to_binary(byte_size(File))
                  },
                 body => File
                },
    {Response, State}.



% status code reason
reason("100") -> <<"Continue">>;
reason("101") -> <<"Switching Protocols">>;
reason("102") -> <<"Processing">>;
reason("200") -> <<"OK">>;
reason("201") -> <<"Created">>;
reason("202") -> <<"Accepted">>;
reason("203") -> <<"Non-Authoritative Information">>;
reason("204") -> <<"No Content">>;
reason("205") -> <<"Reset Content">>;
reason("206") -> <<"Partial Content">>;
reason("207") -> <<"Multi-Status">>;
reason("208") -> <<"Already Reported">>;
reason("226") -> <<"IM Used">>;
reason("300") -> <<"Multiple Choices">>;
reason("301") -> <<"Moved Permanently">>;
reason("302") -> <<"Found">>;
reason("303") -> <<"See Other">>;
reason("304") -> <<"Not Modified">>;
reason("305") -> <<"Use Proxy">>;
reason("306") -> <<"(Unused)">>;
reason("307") -> <<"Temporary Redirect">>;
reason("308") -> <<"Permanent Redirect">>;
reason("400") -> <<"Bad Request">>;
reason("401") -> <<"Unauthorized">>;
reason("402") -> <<"Payment Required">>;
reason("403") -> <<"Forbidden">>;
reason("404") -> <<"Not Found">>;
reason("405") -> <<"Method Not Allowed">>;
reason("406") -> <<"Not Acceptable">>;
reason("407") -> <<"Proxy Authentication Required">>;
reason("408") -> <<"Request Timeout">>;
reason("409") -> <<"Conflict">>;
reason("410") -> <<"Gone">>;
reason("411") -> <<"Length Required">>;
reason("412") -> <<"Precondition Failed">>;
reason("413") -> <<"Payload Too Large">>;
reason("414") -> <<"URI Too Long">>;
reason("415") -> <<"Unsupported Media Type">>;
reason("416") -> <<"Range Not Satisfiable">>;
reason("417") -> <<"Expectation Failed">>;
reason("421") -> <<"Misdirected Request">>;
reason("422") -> <<"Unprocessable Entity">>;
reason("423") -> <<"Locked">>;
reason("424") -> <<"Failed Dependency">>;
reason("426") -> <<"Upgrade Required">>;
reason("428") -> <<"Precondition Required">>;
reason("429") -> <<"Too Many Requests">>;
reason("431") -> <<"Request Header Fields Too Large">>;
reason("451") -> <<"Unavailable for Legal Reasons">>;
reason("500") -> <<"Internal Server Error">>;
reason("501") -> <<"Not Implemented">>;
reason("502") -> <<"Bad Gateway">>;
reason("503") -> <<"Service Unavailable">>;
reason("504") -> <<"Gateway Timeout">>;
reason("505") -> <<"HTTP Version Not Supported">>;
reason("506") -> <<"Variant Also Negotiates">>;
reason("507") -> <<"Insufficient Storage">>;
reason("508") -> <<"Loop Detected">>;
reason("510") -> <<"Not Extended">>;
reason("511") -> <<"Network Authentication Required">>;
reason(_)     -> <<"Unknown Reason Phrase">>.
