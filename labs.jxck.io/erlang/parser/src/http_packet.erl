%%%-------------------------------------------------------------------
%% @doc http packet en/decoder
%% @end
%%%-------------------------------------------------------------------
-module(http_packet).

%% API
-export([
         decode/1,
         encode/1
        ]).

%% RFC7230
-export([
         bws/0,
         connection/0,
         content_length/0,
         http_message/0,
         http_name/0,
         http_version/0,
         host/0,
         ows/0,
         rws/0,
         te/0,
         trailer/0,
         transfer_encoding/0,
         upgrade/0,
         % via/0,
         absolute_form/0,
         absolute_path/0,
         asterisk_form/0,
         authority_form/0,
         chunk/0,
         chunk_data/0,
         chunk_ext/0,
         chunk_ext_name/0,
         chunk_ext_val/0,
         chunk_size/0,
         chunked_body/0,
         comment/0,
         connection_option/0,
         ctext/0,
         field_content/0,
         field_name/0,
         field_value/0,
         field_vchar/0,
         header_field/0,
         http_uri/0,
         https_uri/0,
         last_chunk/0,
         message_body/0,
         method/0,
         obs_fold/0,
         obs_text/0,
         origin_form/0,
         partial_uri/0,
         protocol/0,
         protocol_name/0,
         protocol_version/0,
         pseudonym/0,
         qdtext/0,
         quoted_pair/0,
         quoted_string/0,
         rank/0,
         reason_phrase/0,
         received_by/0,
         received_protocol/0,
         request_line/0,
         request_target/0,
         start_line/0,
         status_code/0,
         status_line/0,
         t_codings/0,
         t_ranking/0,
         tchar/0,
         token/0,
         trailer_part/0,
         transfer_coding/0,
         transfer_extension/0,
         transfer_parameter/0,

         fws/0,
         field_ows/0
        ]).

-include("logger.hrl").
-include("bnf.hrl").
-include("util.hrl").
-include("http.hrl").


%%====================================================================
%% API functions
%%====================================================================

%%--------------------------------------------------------------------
%% Decoder
%%--------------------------------------------------------------------
-spec decode(binary()) -> {ok, #{
                             method  := string(),
                             target  := string(),
                             version := string(),
                             headers := map(),
                             body    := bitstring()
                            }}.
decode(Bin) when is_binary(Bin) =:= true ->
    {ok, Message, <<>>} = (http_message())(Bin),
    {ok, Message}.


%%--------------------------------------------------------------------
%% Encoder
%%--------------------------------------------------------------------
-type request()  :: #{method := string(), target := string(), headers := map(), body  := bitstring()}.
-type response() :: #{status := string(), headers := map(), body  := bitstring()}.

-spec encode({} | request() | response()) -> binary().
encode({}) -> <<>>;

encode(#{status := Status, headers := Headers, body := Body}) ->
    Header = maps:fold(fun(K, V, Acc) ->
                               [[K, ": ", V, ?CRLF] | Acc]
                       end, [], Headers),

    ?LtoB(["HTTP/1.1", ?SP, Status, ?SP, reason(Status), ?CRLF, Header, ?CRLF, Body]);

encode(#{method := Method, target := URL, headers := Headers, body := Body}) ->
    Header = maps:fold(fun(K, V, Acc) ->
                               [[K, ": ", V, ?CRLF] | Acc]
                       end, [], Headers),

    ?LtoB([Method, ?SP, URL, ?SP, "HTTP/1.1", ?CRLF, Header, ?CRLF, Body]).


%%--------------------------------------------------------------------
%% RFC7230
%%--------------------------------------------------------------------
%% BWS = OWS
-spec bws() -> parser(bitstring()).
bws() -> ows().

%% Connection = *( "," OWS ) connection-option *( OWS "," [ OWS connection-option ] )
-spec connection() -> parser([bitstring()]).
connection() ->
    Fn = bnf:list([
                   bnf:multi(0, infinity, bnf:list([?Token(","), ows()])),
                   connection_option(),
                   bnf:multi(0, infinity, bnf:list([ows(), ?Token(","), bnf:multi(0, 1, bnf:list([ows(), connection_option()]))]))
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [_, Head, _Tails], Rest} ->
                    Tails = [ Tail || [_, _, [[_, Tail]]] <- _Tails ],
                    {ok, [Head|Tails], Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% Content-Length = 1*DIGIT
-spec content_length() -> parser(bitstring()).
content_length() -> bnf:repeat(1, infinity, bnf:digit()).

%% HTTP-message = start-line *( header-field CRLF ) CRLF [ message-body ]
-spec http_message() -> parser(#{
                          method  := string(),
                          target  := string(),
                          version := string(),
                          headers := map(),
                          body    := bitstring()
                         }).
http_message() ->
    Fn = bnf:list([
                   start_line(),
                   bnf:multi(0, infinity, bnf:list([header_field(), bnf:crlf()])),
                   bnf:crlf(),
                   bnf:multi(0, 1, message_body())
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [Map, HeaderList, ?CRLF, [Body]], Rest} ->
                    Headers = lists:foldl(fun([{HeaderName, HeaderValue}, ?CRLF], Acc) ->
                                                  maps:put(?BtoL(HeaderName), ?BtoL(HeaderValue), Acc)
                                          end, #{}, HeaderList),
                    {ok, maps:put(body, Body, maps:put(headers, Headers, Map)), Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% HTTP-name = %x48.54.54.50 ; HTTP
-spec http_name() -> parser(bitstring()).
http_name() -> ?Token("HTTP").

%% HTTP-version = HTTP-name "/" DIGIT "." DIGIT
-spec http_version() -> parser(bitstring()).
http_version() ->
    bnf:seq([
             http_name(),
             ?Token("/"),
             bnf:digit(),
             ?Token("."),
             bnf:digit()
            ]).

%% Host = uri-host [ ":" port ]
-spec host() -> parser(bitstring()).
host() -> bnf:seq([uri:host(), bnf:repeat(0, 1, bnf:seq([?Token(":"), uri:port()]))]).

%% OWS = *( SP / HTAB )
-spec ows() -> parser(bitstring()).
ows() -> bnf:repeat(0, infinity, bnf:alt([bnf:sp(), bnf:htab()])).

%% RWS = 1*( SP / HTAB )
-spec rws() -> parser(bitstring()).
rws() -> bnf:repeat(1, infinity, bnf:alt([bnf:sp(), bnf:htab()])).

%% TE = [ ( "," / t-codings ) *( OWS "," [ OWS t-codings ] ) ]
-spec te() -> parser(bitstring()).
te() ->
    bnf:repeat(0, 1, bnf:seq([
                              bnf:alt([?Token(","), t_codings()]),
                              bnf:repeat(0, infinity, bnf:seq([ows(), ?Token(","), bnf:repeat(0, 1, bnf:seq([ows(), t_codings()]))]))
                             ])).

%% Trailer = *( "," OWS ) field-name *( OWS "," [ OWS field-name ] )
-spec trailer() -> parser([{bitstring(), bitstring()}]).
trailer() ->
    Fn = bnf:list([
                   bnf:multi(0, infinity, bnf:list([?Token(","), ows()])),
                   field_name(),
                   bnf:multi(0, infinity, bnf:list([ows(), ?Token(","), bnf:multi(0, 1, bnf:list([ows(), field_name()]))]))
                  ]),
    fun(Bin) ->
            case Fn(Bin) of
                {ok, [_ows, Field, Fields], Rest} ->
                    {ok, [Field | [F || [__ows, <<",">>, [[___ows, F]]] <- (Fields)]], Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% Transfer-Encoding = *( "," OWS ) transfer-coding *( OWS "," [ OWS transfer-coding ] )
-spec transfer_encoding() -> parser([bitstring()]).
transfer_encoding() ->
    Fn = bnf:list([
                   bnf:multi(0, infinity, bnf:list([?Token(","), ows()])),
                   transfer_coding(),
                   bnf:multi(0, infinity, bnf:list([ows(), ?Token(","), bnf:multi(0, 1, bnf:list([ows(), transfer_coding()]))]))
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [_, C, Codings], Rest} ->
                    {ok, [C | [Coding || [_ows, _comma, [[__ows, Coding]]] <- Codings]], Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% URI-reference = <URI-reference, see [RFC3986], Section 4.1>

%% Upgrade = *( "," OWS ) protocol *( OWS "," [ OWS protocol ] )
-spec upgrade() -> parser([bitstring()]).
upgrade() ->
    Fn = bnf:list([
                   bnf:multi(0, infinity, bnf:list([?Token(","), ows()])),
                   protocol(),
                   bnf:multi(0, infinity, bnf:list([ows(), ?Token(","), bnf:multi(0, 1, bnf:list([ows(), protocol()]))]))
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [_, Head, _Tails], Rest} ->
                    Tails = [ Tail || [_, _, [[_, Tail]]] <- _Tails ],
                    {ok, [Head|Tails], Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% TODO:
%% Via = *( "," OWS )
%%        ( received-protocol RWS received-by [ RWS comment ] )
%%       *( OWS "," [ OWS ( received-protocol RWS received-by [ RWS comment ] ) ] )
%via() ->
%    bnf:list([
%          bnf:multi(0, infinity, bnf:list([?Token(","), ows()])),
%          bnf:list([
%                received_protocol(),
%                rws(),
%                received_by(),
%                bnf:multi(0, 1, bnf:list([rws(), comment()]))]),
%          bnf:multi(0, infinity, bnf:list([
%                                   ows(),
%                                   ?Token(","),
%                                   bnf:multi(0, 1, bnf:list([
%                                                     ows(),
%                                                     bnf:list([
%                                                           received_protocol(),
%                                                           rws(),
%                                                           received_by(),
%                                                           bnf:multi(0, 1, bnf:list([rws(), comment()]))
%                                                          ])
%                                                    ]))
%                                  ]))
%         ]).

%% absolute-URI = <absolute-URI, see [RFC3986], Section 4.3>

%% absolute-form = absolute-URI
-spec absolute_form() -> parser(bitstring()).
absolute_form() -> uri:absolute_uri().

%% absolute-path = 1*( "/" segment )
-spec absolute_path() -> parser(bitstring()).
absolute_path() -> bnf:repeat(1, infinity, bnf:seq([?Token("/"), uri:segment()])).

%% asterisk-form = "*"
-spec asterisk_form() -> parser(token()).
asterisk_form() -> ?Token("*").

%% authority = <authority, see [RFC3986], Section 3.2>

%% authority-form = authority
-spec authority_form() -> parser(bitstring()).
authority_form() -> uri:authority().

%% chunk = chunk-size [ chunk-ext ] CRLF chunk-data CRLF
-spec chunk() -> parser({bitstring(), bitstring(), bitstring()}).
chunk() ->
    Fn = bnf:list([
                   chunk_size(),
                   bnf:multi(0, 1, chunk_ext()),
                   bnf:crlf(),
                   chunk_data(),
                   bnf:crlf()
                  ]),
    fun(Bin) ->
            case Fn(Bin) of
                {ok, [Size, [Ext], _crlf, Data, __crlf], Rest} ->
                    {ok, {Size, Ext, Data}, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% chunk-data = 1*OCTET
%% これが OCTET だと chunk() で crlf を含んでしまうので
%% vchar にして、 crlf を外す。
-spec chunk_data() -> parser(bitstring()).
chunk_data() -> bnf:repeat(1, infinity, bnf:vchar()).

%% chunk-ext = *( ";" chunk-ext-name [ "=" chunk-ext-val ] )
-spec chunk_ext() -> parser(bitstring()).
chunk_ext() ->
    bnf:repeat(0, infinity, bnf:seq([
                                     ?Token(";"),
                                     chunk_ext_name(),
                                     bnf:repeat(0, 1, bnf:seq([?Token("="), chunk_ext_val()]))
                                    ])).

%% chunk-ext-name = token
-spec chunk_ext_name() -> parser(bitstring()).
chunk_ext_name() -> token().

%% chunk-ext-val = token / quoted-string
-spec chunk_ext_val() -> parser(bitstring()).
chunk_ext_val() -> bnf:alt([token(), quoted_string()]).

%% chunk-size = 1*HEXDIG
-spec chunk_size() -> parser(bitstring()).
chunk_size() -> bnf:repeat(1, infinity, bnf:hexdig()).

%%% chunked-body = *chunk last-chunk trailer-part CRLF
-spec chunked_body() -> parser({[{bitstring(), bitstring(), bitstring()}], [{bitstring(), bitstring()}]}).
chunked_body() ->
    Fn = bnf:list([
                   bnf:multi(0, infinity, chunk()),
                   last_chunk(),
                   trailer_part(),
                   bnf:crlf()
                  ]),
    fun(Bin) ->
            case Fn(Bin) of
                {ok,[ChunkedBody, LastChunk, Headers, _crlf], Rest} ->
                    {ok, {ChunkedBody++[LastChunk], Headers}, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% comment が入れ子になってるので、手前で止める。
%% comment = "(" *( ctext / quoted-pair / comment ) ")"
-spec comment() -> parser(bitstring()).
comment() -> bnf:seq([
                      ?Token("("),
                      bnf:repeat(0, infinity, inner_comment()),
                      ?Token(")")
                     ]).

-spec inner_comment() -> parser(bitstring()).
inner_comment() ->
    Fn = bnf:alt([ctext(), quoted_pair()]),
    fun(Bin) ->
            case Fn(Bin) of
                {ok, Result, Rest} ->
                    {ok, Result, Rest};
                {fail, Bin} ->
                    (comment())(Bin)
            end
    end.

%% connection-option = token
-spec connection_option() -> parser(bitstring()).
connection_option() -> token().

%% ctext = HTAB / SP / %x21-27 ; '!'-'''
%%  / %x2A-5B ; '*'-'['
%%  / %x5D-7E ; ']'-'~'
%%  / obs-text
-spec ctext() -> parser(bitstring()).
ctext() ->
    bnf:alt([
             bnf:htab(),
             bnf:sp(),
             ?Range(16#21, 16#27),
             ?Range(16#2A, 16#5B),
             ?Range(16#5D, 16#7E),
             obs_text()
            ]).

%% field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
-spec field_content() -> parser(bitstring()).
field_content() ->
    bnf:seq([
             field_vchar(),
             bnf:repeat(0, 1, bnf:seq([
                                       bnf:repeat(1, infinity, bnf:alt([bnf:sp(), bnf:htab()])),
                                       field_vchar()
                                      ]))
            ]).

%% field-name = token
-spec field_name() -> parser(bitstring()).
field_name() -> token().

-spec fws() -> parser(bitstring()).
fws() -> field_ows().

-spec field_ows() -> parser(bitstring()).
field_ows() ->
    bnf:seq([
             bnf:repeat(0, infinity, bnf:alt([bnf:sp(), bnf:htab()])),
             bnf:repeat(0, infinity, obs_fold())
            ]).

%% そのままじゃ Mac の UA がパースできなかったので、以下を適用
%% https://lists.w3.org/Archives/Public/ietf-http-wg/2014OctDec/0788.html
%% was: field-value = *( field-content / obs-fold )
%% field-value = [ field-vchar *( field-ows field-vchar ) ]
-spec field_value() -> parser(bitstring()).
field_value() -> bnf:repeat(0, 1, bnf:seq([field_vchar(), bnf:repeat(0, infinity, bnf:seq([field_ows(), field_vchar()]))])).

%% field-vchar = VCHAR / obs-text
-spec field_vchar() -> parser(bitstring()).
field_vchar() -> bnf:alt([bnf:vchar(), obs_text()]).

%% fragment = <fragment, see [RFC3986], Section 3.5>

%% header-field = field-name ":" OWS field-value OWS
-spec header_field() -> parser({bitstring(), bitstring()}).
header_field() ->
    Fn = bnf:list([
                   field_name(),
                   ?Token(":"),
                   fws(), % was: ows
                   field_value(),
                   fws() % was: ows
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [FieldName, <<":">>, ?SP, FieldValue, _], Rest} ->
                    {ok, {FieldName, FieldValue}, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% http-URI = "http://" authority path-abempty [ "?" query ] [ "#" fragment ]
-spec http_uri() -> parser(#{
                      scheme    := http,
                      authority := bitstring(),
                      path      := bitstring(),
                      query     := bitstring(),
                      fragment  := bitstring()
                     }).
http_uri() ->
    Fn = bnf:list([
                   ?Token("http://"),
                   uri:authority(),
                   uri:path_abempty(),
                   bnf:multi(0, 1, bnf:list([?Token("?"), uri:query()])),
                   bnf:multi(0, 1, bnf:list([?Token("#"), uri:fragment()]))
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [<<"http://">>, Authority, Path, Queries, Fragments], Rest} ->
                    {ok, #{
                       scheme    => http,
                       authority => Authority,
                       path      => Path,
                       query     => case   Queries of [] -> <<"">>; [[<<"?">>, Q]] -> Q end,
                       fragment  => case Fragments of [] -> <<"">>; [[<<"#">>, F]] -> F end
                      }, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% https-URI = "https://" authority path-abempty [ "?" query ] [ "#" fragment ]
-spec https_uri() -> parser(#{
                       scheme    := https,
                       authority := bitstring(),
                       path      := bitstring(),
                       query     := bitstring(),
                       fragment  := bitstring()
                      }).
https_uri() ->
    Fn = bnf:list([
                   ?Token("https://"),
                   uri:authority(),
                   uri:path_abempty(),
                   bnf:multi(0, 1, bnf:list([?Token("?"), uri:query()])),
                   bnf:multi(0, 1, bnf:list([?Token("#"), uri:fragment()]))
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [<<"https://">>, Authority, Path, Queries, Fragments], Rest} ->
                    {ok, #{
                       scheme    => https,
                       authority => Authority,
                       path      => Path,
                       query     => case   Queries of [] -> <<"">>; [[<<"?">>, Q]] -> Q end,
                       fragment  => case Fragments of [] -> <<"">>; [[<<"#">>, F]] -> F end
                      }, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% last-chunk = 1*"0" [ chunk-ext ] CRLF
-spec last_chunk() -> parser({bitstring(), bitstring()}).
last_chunk() ->
    Fn = bnf:list([
                   bnf:repeat(1, infinity, ?Token("0")),
                   bnf:multi(0, 1, chunk_ext()),
                   bnf:crlf()
                  ]),
    fun(Bin) ->
            case Fn(Bin) of
                {ok, [_size, [Ext], _crlf], Rest} ->
                    % normalize to 0
                    {ok, {<<"0">>, Ext, <<>>}, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% message-body = *OCTET
-spec message_body() -> parser(bitstring()).
message_body() -> bnf:repeat(0, infinity, bnf:octet()).

%% method = token
-spec method() -> parser(bitstring()).
method() -> token().

%% obs-fold = CRLF 1*( SP / HTAB )
-spec obs_fold() -> parser(bitstring()).
obs_fold() ->
    bnf:seq([
             bnf:crlf(),
             bnf:repeat(1, infinity, bnf:alt([bnf:sp(), bnf:htab()]))
            ]).

%% obs-text = %x80-FF
-spec obs_text() -> parser(token()).
obs_text() -> ?Range(16#80, 16#FF).

%% origin-form = absolute-path [ "?" query ]
-spec origin_form() -> parser(bitstring()).
origin_form() -> bnf:seq([absolute_path(), bnf:repeat(0, 1, bnf:seq([?Token("?"), uri:query()]))]).

%% partial-URI = relative-part [ "?" query ]
-spec partial_uri() -> parser(bitstring()).
partial_uri() -> bnf:seq([uri:relative_part(), bnf:repeat(0, 1, bnf:seq([?Token("?"), uri:query()]))]).

%% path-abempty = <path-abempty, see [RFC3986], Section 3.3>

%% port = <port, see [RFC3986], Section 3.2.3>

%% protocol = protocol-name [ "/" protocol-version ]
-spec protocol() -> parser(bitstring()).
protocol() -> bnf:seq([
                       protocol_name(),
                       bnf:repeat(0, 1, bnf:seq([
                                                 ?Token("/"),
                                                 protocol_version()
                                                ]))
                      ]).

%% protocol-name = token
-spec protocol_name() -> parser(bitstring()).
protocol_name() -> token().

%% protocol-version = token
-spec protocol_version() -> parser(bitstring()).
protocol_version() -> token().

%% pseudonym = token
-spec pseudonym() -> parser(bitstring()).
pseudonym() -> token().

%% qdtext = HTAB / SP / "!" / %x23-5B ; '#'-'['
%%  / %x5D-7E ; ']'-'~'
%%  / obs-text
-spec qdtext() -> parser(bitstring()).
qdtext() ->
    bnf:alt([
             bnf:htab(),
             bnf:sp(),
             ?Token("!"),
             ?Range(16#23, 16#5b),
             ?Range(16#5d, 16#7e),
             obs_text()
            ]).

%% query = <query, see [RFC3986], Section 3.4>

%% TODO: unquote?
%% quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
-spec quoted_pair() -> parser(bitstring()).
quoted_pair() ->
    bnf:seq([?Token("\\"), bnf:alt([bnf:htab(), bnf:sp(), bnf:vchar(), obs_text()])]).

%% quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
-spec quoted_string() -> parser(bitstring()).
quoted_string() ->
    bnf:seq([bnf:dquote(), bnf:repeat(0, infinity, bnf:alt([qdtext(), quoted_pair()])), bnf:dquote()]).

%% rank = ( "0" [ "." *3DIGIT ] ) / ( "1" [ "." *3"0" ] )
-spec rank() -> parser(bitstring()).
rank() -> bnf:alt([
                   bnf:seq([?Token("0"), bnf:repeat(0, 1, bnf:seq([?Token("."), bnf:repeat(0, 3, bnf:digit())]))]),
                   bnf:seq([?Token("1"), bnf:repeat(0, 1, bnf:seq([?Token("."), bnf:repeat(0, 3, ?Token("0"))]))])
                  ]).

%% reason-phrase = *( HTAB / SP / VCHAR / obs-text )
-spec reason_phrase() -> parser(bitstring()).
reason_phrase() ->
    bnf:repeat(0, infinity, bnf:alt([
                                     bnf:htab(),
                                     bnf:sp(),
                                     bnf:vchar(),
                                     obs_text()
                                    ])).

%% received-by = ( uri-host [ ":" port ] ) / pseudonym
-spec received_by() -> parser(bitstring()).
received_by() ->
    bnf:alt([
             bnf:repeat(0, 1, bnf:seq([
                                       uri:host(),
                                       bnf:repeat(0, 1, bnf:seq([?Token(":"), uri:port()]))
                                      ])),
             pseudonym()
            ]).

%% received-protocol = [ protocol-name "/" ] protocol-version
-spec received_protocol() -> parser(bitstring()).
received_protocol() ->
    bnf:seq([bnf:repeat(0, 1, bnf:seq([protocol_name(), ?Token("/")])), protocol_version()]).

%% relative-part = <relative-part, see [RFC3986], Section 4.2>

%% request-line = method SP request-target SP HTTP-version CRLF
-spec request_line() -> parser(#{method => string(), target => string(), version => string()}).
request_line() ->
    Fn = bnf:list([
                   method(),
                   bnf:sp(),
                   request_target(),
                   bnf:sp(),
                   http_version(),
                   bnf:crlf()
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [Method, ?SP, Target, ?SP, Version, ?CRLF], Rest} ->
                    {ok, #{method => ?BtoL(Method), target => ?BtoL(Target), version => ?BtoL(Version)}, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% request-target = origin-form / absolute-form / authority-form / asterisk-form
-spec request_target() -> parser(bitstring()).
request_target() ->
    bnf:alt([
             origin_form(),
             absolute_form(),
             authority_form(),
             asterisk_form()
            ]).

%% scheme = <scheme, see [RFC3986], Section 3.1>

%% segment = <segment, see [RFC3986], Section 3.3>

%% start-line = request-line / status-line
-spec start_line() -> parser(bitstring()).
start_line() ->
    bnf:alt([
             request_line(),
             status_line()
            ]).

%% status-code = 3DIGIT
-spec status_code() -> parser(bitstring()).
status_code() -> bnf:seq([bnf:digit(), bnf:digit(), bnf:digit()]).

%% status-line = HTTP-version SP status-code SP reason-phrase CRLF
-spec status_line() -> parser(#{version => bitstring(), status => bitstring(), reason => bitstring()}).
status_line() ->
    Fn = bnf:list([
                   http_version(),
                   bnf:sp(),
                   status_code(),
                   bnf:sp(),
                   reason_phrase(),
                   bnf:crlf()
                  ]),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, [Version, ?SP, Status, ?SP, Reason, ?CRLF], Rest} ->
                    {ok, #{version => ?BtoL(Version), status => ?BtoL(Status), reason => ?BtoL(Reason)}, Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% t-codings = "trailers" / ( transfer-coding [ t-ranking ] )
-spec t_codings() -> parser(bitstring()).
t_codings() ->
    bnf:alt([
             ?Token("trailers"),
             bnf:repeat(0, 1, bnf:seq([transfer_coding(), bnf:repeat(0, 1, t_ranking())]))
            ]).

%% t-ranking = OWS ";" OWS "q=" rank
-spec t_ranking() -> parser(bitstring()).
t_ranking() -> bnf:seq([ows(), ?Token(";"), ows(), ?Token("q="), rank()]).

%% tchar = "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" / "-" / "." /
%%         "^" / "_" / "`" / "|" / "~" / DIGIT / ALPHA
-spec tchar() -> parser(token()).
tchar() ->
    bnf:alt([
             ?Token("!"),
             ?Token("#"),
             ?Token("$"),
             ?Token("%"),
             ?Token("&"),
             ?Token("'"),
             ?Token("*"),
             ?Token("+"),
             ?Token("-"),
             ?Token("."),
             ?Token("^"),
             ?Token("_"),
             ?Token("`"),
             ?Token("|"),
             ?Token("~"),
             bnf:digit(),
             bnf:alpha()
            ]).

%% token = 1*tchar
-spec token() -> parser(bitstring()).
token() -> bnf:repeat(1, infinity, tchar()).

%% trailer-part = *( header-field CRLF )
-spec trailer_part() -> parser([{bitstring(), bitstring()}]).
trailer_part() ->
    Fn = bnf:multi(0, infinity, bnf:list([header_field(), bnf:crlf()])),
    fun(Bin) ->
            case (Fn(Bin)) of
                {ok, HeaderFields, Rest} ->
                    {ok, [HeaderField || [HeaderField, <<"\r\n">>] <- HeaderFields], Rest};
                {fail, Bin} ->
                    {fail, Bin}
            end
    end.

%% transfer-coding = "chunked" / "compress" / "deflate" / "gzip" / transfer-extension
-spec transfer_coding() -> parser(bitstring()).
transfer_coding() ->
    bnf:alt([
             ?Token("chunked"),
             ?Token("compress"),
             ?Token("deflate"),
             ?Token("gzip"),
             transfer_extension()
            ]).

%% transfer-extension = token *( OWS ";" OWS transfer-parameter )
-spec transfer_extension() -> parser(bitstring()).
transfer_extension() ->
    bnf:seq([
             token(),
             bnf:repeat(0, infinity, bnf:seq([ows(), ?Token(";"), ows(), transfer_parameter()]))
            ]).

%% transfer-parameter = token BWS "=" BWS ( token / quoted-string )
-spec transfer_parameter() -> parser(bitstring()).
transfer_parameter() ->
    bnf:seq([
             token(),
             bws(),
             ?Token("="),
             bws(),
             bnf:repeat(0, 1, bnf:alt([token(), quoted_string()]))
            ]).

%% uri-host = <host, see [RFC3986], Section 3.2.2>
