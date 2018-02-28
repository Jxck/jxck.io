-module(http_SUITE).
-export([
         all/0,
         suite/0,
         groups/0,
         init_per_suite/1,
         end_per_suite/1,
         init_per_group/2,
         end_per_group/2,
         init_per_testcase/2,
         end_per_testcase/2
        ]).

-include_lib("common_test/include/ct.hrl").
-include("../src/logger.hrl").

suite() ->
    TimeTrap = (ct:get_config({ct, timetrap})),
    [TimeTrap].

init_per_suite(_Config) ->
    _Config.

end_per_suite(_Config) ->
    ok.

init_per_group(_GroupName, _Config) ->
    _Config.

end_per_group(_GroupName, _Config) ->
    ok.

init_per_testcase(_TestCase, _Config) ->
    _Config.

end_per_testcase(_TestCase, _Config) ->
    ok.

all() ->
    [
     {group, success}
    ].

%% parallel: run on separate process
%% shuffle: execute random
%% shuffle, sequence: stop when fail
groups() ->
    [
     {
      success,
      [parallel],
      [
       encode,
       decode,

       bws,
       connection,
       content_length,
       http_message,
       http_name,
       http_version,
       host,
       ows,
       rws,
       te,
       trailer,
       transfer_encoding,
       upgrade,
       via,
       absolute_form,
       absolute_path,
       asterisk_form,
       authority_form,
       chunk,
       chunk_data,
       chunk_ext,
       chunk_ext_name,
       chunk_ext_val,
       chunk_size,
       chunked_body,
       comment,
       connection_option,
       ctext,
       field_content,
       field_name,
       field_value,
       field_vchar,
       header_field,
       http_uri,
       https_uri,
       last_chunk,
       message_body,
       method,
       obs_fold,
       obs_text,
       origin_form,
       partial_uri,
       protocol,
       protocol_name,
       protocol_version,
       pseudonym,
       qdtext,
       quoted_pair,
       quoted_string,
       rank,
       reason_phrase,
       received_by,
       received_protocol,
       request_line,
       request_target,
       start_line,
       status_code,
       status_line,
       t_codings,
       t_ranking,
       tchar,
       token,
       trailer_part,
       transfer_coding,
       transfer_extension,
       transfer_parameter,

       fws,
       field_ows
      ]
     }
    ].


%%====================================================================
%% Suite
%%====================================================================

%%--------------------------------------------------------------------
%% RFC7230
%%--------------------------------------------------------------------
encode(_Config) ->
    A1 = #{
      method  => "GET",
      target  => "/hello.txt",
      version => "HTTP/1.1",
      headers => #{
        "User-Agent"      => "curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3",
        "Host"            => "www.example.com",
        "Accept-Language" => "en, mi"
       },
      body => <<>>
     },
    {ok, A1} = http_packet:decode(http_packet:encode(A1)),


    A2 = #{
      method => "POST",
      target => "/cgi-bin/process.cgi",
      version => "HTTP/1.1",
      headers => #{
        "User-Agent" => "Mozilla/4.0 (compatible; MSIE5.01; Windows NT)",
        "Host" => "www.tutorialspoint.com",
        "Content-Type" => "text/xml; charset=utf-8",
        "Content-Length" => "60",
        "Accept-Language" => "en-us",
        "Accept-Encoding" => "gzip, deflate",
        "Connection" => "Keep-Alive"
       },
      body => <<"first=Zara&last=Ali">>
     },
    {ok, A2} = http_packet:decode(http_packet:encode(A2)),


    A3 = #{
      version => "HTTP/1.1",
      status  => "200",
      reason  => "OK",
      headers => #{
        "Date"           => "Mon, 27 Jul 2009 12:28:53 GMT",
        "Server"         => "Apache",
        "Last-Modified"  => "Wed, 22 Jul 2009 19:15:56 GMT",
        "ETag"           => "\"34aa387-d-1568eb00\"",
        "Accept-Ranges"  => "bytes",
        "Content-Length" => "51",
        "Vary"           => "Accept-Encoding",
        "Content-Type"   => "text/plain"
       },
      body => <<"Hello World! My payload includes a trailing CRLF.\r\n">>
     },
    {ok, A3} = http_packet:decode(http_packet:encode(A3)),

    A4 = #{
      version => "HTTP/1.1",
      status  => "101",
      reason  => "Switching Protocols",
      headers => #{
        "Date" => "Wed, 05 Apr 2017 04:32:40 GMT",
        "Connection" => "upgrade",
        "Server" => "h2o/2.1.0",
        "sec-websocket-accept" => "pt72V4duJNS8GR6l+u8cbjh37j4=",
        "sec-websocket-protocol" => "broadcast",
        "upgrade" => "websocket"
       },
      body => <<>>
     },
    {ok, A4} = http_packet:decode(http_packet:encode(A4)),

    ok.


decode(_Config) ->
    Request = <<"GET /hello.txt HTTP/1.1\r\n",
                "User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3\r\n",
                "Host: www.example.com\r\n",
                "Accept-Language: en, mi\r\n",
                "\r\n"
              >>,
    {ok, #{
       method  := "GET",
       target  := "/hello.txt",
       version := "HTTP/1.1",
       headers := #{
         "User-Agent"      := "curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3",
         "Host"            := "www.example.com",
         "Accept-Language" := "en, mi"
        },
       body := <<>>
      }, <<>>} = ((http_packet:http_message())(Request)),


    Response = <<"HTTP/1.1 200 OK\r\n",
                 "Date: Mon, 27 Jul 2009 12:28:53 GMT\r\n",
                 "Server: Apache\r\n",
                 "Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT\r\n",
                 "ETag: \"34aa387-d-1568eb00\"\r\n",
                 "Accept-Ranges: bytes\r\n",
                 "Content-Length: 51\r\n",
                 "Vary: Accept-Encoding\r\n",
                 "Content-Type: text/plain\r\n",
                 "\r\n",
                 "Hello World! My payload includes a trailing CRLF.\r\n"
               >>,

    {ok, #{
       version := "HTTP/1.1",
       status  := "200",
       reason  := "OK",
       headers := #{
         "Date"           := "Mon, 27 Jul 2009 12:28:53 GMT",
         "Server"         := "Apache",
         "Last-Modified"  := "Wed, 22 Jul 2009 19:15:56 GMT",
         "ETag"           := "\"34aa387-d-1568eb00\"",
         "Accept-Ranges"  := "bytes",
         "Content-Length" := "51",
         "Vary"           := "Accept-Encoding",
         "Content-Type"   := "text/plain"
        },
       body := <<"Hello World! My payload includes a trailing CRLF.\r\n">>
      }, <<>>} = ((http_packet:http_message())(Response)),

    UpgradeReq = <<"GET / HTTP/1.1\r\n",
                   "Host: localhost:9000\r\n",
                   "Connection: Upgrade\r\n",
                   "Pragma: no-cache\r\n",
                   "Cache-Control: no-cache\r\n",
                   "Upgrade: websocket\r\n",
                   "Origin: http://localhost:3000\r\n",
                   "Sec-WebSocket-Version: 13\r\n",
                   "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36\r\n",
                   "Accept-Encoding: gzip, deflate, sdch, br\r\n",
                   "Accept-Language: en-US,en;q=0.8,ja;q=0.6\r\n",
                   "Cookie: _ga=GA1.1.1942938359.1485220336\r\n",
                   "Sec-WebSocket-Key: P+obNHGC2AUo74bNe8NoNA==\r\n",
                   "Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits\r\n",
                   "\r\n"
                 >>,

    {ok, #{
       method  := "GET",
       target  := "/",
       version := "HTTP/1.1",
       headers := #{
         "Host"                     := "localhost:9000",
         "Connection"               := "Upgrade",
         "Pragma"                   := "no-cache",
         "Cache-Control"            := "no-cache",
         "Upgrade"                  := "websocket",
         "Origin"                   := "http://localhost:3000",
         "Sec-WebSocket-Version"    := "13",
         "User-Agent"               := "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
         "Accept-Encoding"          := "gzip, deflate, sdch, br",
         "Accept-Language"          := "en-US,en;q=0.8,ja;q=0.6",
         "Cookie"                   := "_ga=GA1.1.1942938359.1485220336",
         "Sec-WebSocket-Key"        := "P+obNHGC2AUo74bNe8NoNA==",
         "Sec-WebSocket-Extensions" := "permessage-deflate; client_max_window_bits"
        },
       body := <<>>
      }, <<>>} = ((http_packet:http_message())(UpgradeReq)),

    UpgradeRes = <<"HTTP/1.1 101 Switching Protocols\r\n",
                   "Date: Wed, 05 Apr 2017 04:32:40 GMT\r\n",
                   "Connection: upgrade\r\n",
                   "Server: h2o/2.1.0\r\n",
                   "sec-websocket-accept: pt72V4duJNS8GR6l+u8cbjh37j4=\r\n",
                   "sec-websocket-protocol: broadcast\r\n",
                   "upgrade: websocket\r\n",
                   "\r\n"
                 >>,

    {ok, #{
       version := "HTTP/1.1",
       status  := "101",
       reason  := "Switching Protocols",
       headers := #{
         "Date" := "Wed, 05 Apr 2017 04:32:40 GMT",
         "Connection" := "upgrade",
         "Server" := "h2o/2.1.0",
         "sec-websocket-accept" := "pt72V4duJNS8GR6l+u8cbjh37j4=",
         "sec-websocket-protocol" := "broadcast",
         "upgrade" := "websocket"
        },
       body := <<>>
      }, <<>>} = ((http_packet:http_message())(UpgradeRes)),
    ok.


bws(_) ->
    {ok, <<"">>, <<>>} = ((http_packet:bws())(<<"">>)),
    {ok, <<" ">>, <<>>} = ((http_packet:bws())(<<" ">>)),
    {ok, <<"\t">>, <<>>} = ((http_packet:bws())(<<"\t">>)),
    ok.

connection(_) ->
    {ok, [<<"close">>], <<>>} = ((http_packet:connection())(<<"close">>)),
    {ok, [<<"upgrade">>, <<"close">>, <<"other">>], <<>>} = ((http_packet:connection())(<<"upgrade, close, other">>)),
    ok.

content_length(_) ->
    {ok, <<"1234">>, <<>>} = ((http_packet:content_length())(<<"1234">>)),
    ok.

http_message(_) ->
    % done in decode()
    ok.

http_name(_) ->
    {ok, <<"HTTP">>, <<>>} = ((http_packet:http_name())(<<"HTTP">>)),
    ok.

http_version(_) ->
    {ok, <<"HTTP/1.1">>, <<>>} = ((http_packet:http_version())(<<"HTTP/1.1">>)),
    ok.

host(_) ->
    {ok, <<"example.com">>, <<>>} = ((http_packet:host())(<<"example.com">>)),
    {ok, <<"example.com:80">>, <<>>} = ((http_packet:host())(<<"example.com:80">>)),
    ok.

ows(_) ->
    {ok, <<" ">>, <<>>} = ((http_packet:ows())(<<" ">>)),
    {ok, <<"\t">>, <<>>} = ((http_packet:ows())(<<"\t">>)),
    ok.

rws(_) ->
    {ok, <<" ">>, <<>>} = ((http_packet:rws())(<<" ">>)),
    {ok, <<"\t">>, <<>>} = ((http_packet:rws())(<<"\t">>)),
    ok.

te(_) ->
    {ok, <<"trailers">>, <<>>} = ((http_packet:te())(<<"trailers">>)),
    {ok, <<"trailers, deflate;q=0.5">>, <<>>} = ((http_packet:te())(<<"trailers, deflate;q=0.5">>)),
    ok.

trailer(_) ->
    {ok, [<<"Expires">>], <<>>} = ((http_packet:trailer())(<<"Expires">>)),
    {ok, [<<"Expires">>, <<"Cookie">>], <<>>} = ((http_packet:trailer())(<<"Expires ,Cookie">>)),
    ok.

transfer_encoding(_) ->
    {ok, [<<"gzip">>, <<"chunked">>, <<"deflate">>], <<>>} = ((http_packet:transfer_encoding())(<<"gzip, chunked, deflate">>)),
    ok.

upgrade(_) ->
    {ok, [<<"HTTP/2.0">>], <<>>} = ((http_packet:upgrade())(<<"HTTP/2.0">>)),
    {ok, [<<"HTTP/2.0">>, <<"SHTTP/1.3">>, <<"IRC/6.9">>, <<"RTA/x11">>], <<>>} = ((http_packet:upgrade())(<<"HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11">>)),
    ok.

via(_) -> ok. % TODO

absolute_form(_) ->
    {ok, <<"http://path/to/file">>, <<>>} = ((http_packet:absolute_form())(<<"http://path/to/file">>)),
    {ok, <<"http://path/to/file?a=b&c=d">>, <<>>} = ((http_packet:absolute_form())(<<"http://path/to/file?a=b&c=d">>)),
    ok.

absolute_path(_) ->
    {ok, <<"/path">>, <<>>} = ((http_packet:absolute_path())(<<"/path">>)),
    {ok, <<"/path/to/file">>, <<>>} = ((http_packet:absolute_path())(<<"/path/to/file">>)),
    ok.

asterisk_form(_) ->
    {ok, <<"*">>, <<>>} = ((http_packet:asterisk_form())(<<"*">>)),
    ok.

authority_form(_) ->
    {ok, <<"example.com">>, <<>>} = ((http_packet:authority_form())(<<"example.com">>)),
    {ok, <<"example.com:3000">>, <<>>} = ((http_packet:authority_form())(<<"example.com:3000">>)),
    {ok, <<"admin@example.com">>, <<>>} = ((http_packet:authority_form())(<<"admin@example.com">>)),
    {ok, <<"admin@example.com:3000">>, <<>>} = ((http_packet:authority_form())(<<"admin@example.com:3000">>)),
    ok.

chunk(_) ->
    {ok, {<<"7">>, <<>>, <<"Mozilla">>}, <<>>} = ((http_packet:chunk())(<<"7\r\nMozilla\r\n">>)),
    {ok, {<<"7">>, <<";name=value">>, <<"Mozilla">>}, <<>>} = ((http_packet:chunk())(<<"7;name=value\r\nMozilla\r\n">>)),
    ok.

chunk_data(_) ->
    {ok, <<"abcde">>, <<>>} = ((http_packet:chunk_data())(<<"abcde">>)),
    ok.

chunk_ext(_) ->
    {ok, <<";q=10">>, <<>>} = ((http_packet:chunk_ext())(<<";q=10">>)),
    ok.

chunk_ext_name(_) ->
    {ok, <<"abcde">>, <<>>} = ((http_packet:chunk_ext_name())(<<"abcde">>)),
    ok.

chunk_ext_val(_) ->
    {ok, <<"aaaaaaa">>, <<>>} = ((http_packet:chunk_ext_val())(<<"aaaaaaa">>)),
    {ok, <<"\"aaa\"">>, <<>>} = ((http_packet:chunk_ext_val())(<<"\"aaa\"">>)),
    ok.

chunk_size(_) ->
    {ok, <<"1">>,  <<>>} = ((http_packet:chunk_size())(<<"1">>)),
    {ok, <<"10">>, <<>>} = ((http_packet:chunk_size())(<<"10">>)),
    ok.

chunked_body(_) ->
    {ok, {
       [
        {<<"7">>, <<>>, <<"Mozilla">>},
        {<<"9">>, <<>>, <<"Developer">>},
        {<<"7">>, <<>>, <<"Network">>},
        {<<"0">>, <<";name=value">>, <<>>}
       ],
       [
        {<<"Expires">>, <<"Wed, 21 Oct 2015 07:28:00 GMT">>}
       ]
      }, <<>>} = ((http_packet:chunked_body())(<<
                                                 "7\r\n"
                                                 "Mozilla\r\n"
                                                 "9\r\n"
                                                 "Developer\r\n"
                                                 "7\r\n"
                                                 "Network\r\n"
                                                 "0;name=value\r\n"
                                                 "Expires: Wed, 21 Oct 2015 07:28:00 GMT\r\n"
                                                 "\r\n"
                                               >>)),
    ok.

comment(_) ->
    {ok, <<"(Windows NT 6.3; WOW64; Trident/7.0; rv:11.0)">>, <<>>} = ((http_packet:comment())(<<"(Windows NT 6.3; WOW64; Trident/7.0; rv:11.0)">>)),
    {ok, <<"(Windows NT 6.3; (WOW64; Trident/7.0;) rv:11.0)">>, <<>>} = ((http_packet:comment())(<<"(Windows NT 6.3; (WOW64; Trident/7.0;) rv:11.0)">>)),
    ok.

connection_option(_) ->
    {ok, <<"close">>, <<>>} = ((http_packet:connection_option())(<<"close">>)),
    ok.

ctext(_) ->
    {ok, <<"\t">>, <<>>} = ((http_packet:ctext())(<<"\t">>)),
    {ok, <<"\"">>, <<>>} = ((http_packet:ctext())(<<"\"">>)),
    {ok, <<" ">>, <<>>} = ((http_packet:ctext())(<<" ">>)),
    {ok, <<"!">>, <<>>} = ((http_packet:ctext())(<<"!">>)),
    {ok, <<"*">>, <<>>} = ((http_packet:ctext())(<<"*">>)),
    {ok, <<"[">>, <<>>} = ((http_packet:ctext())(<<"[">>)),
    {ok, <<"]">>, <<>>} = ((http_packet:ctext())(<<"]">>)),
    {ok, <<"~">>, <<>>} = ((http_packet:ctext())(<<"~">>)),
    {ok, <<"a">>, <<>>} = ((http_packet:ctext())(<<"a">>)),
    ok.

field_content(_) ->
    {ok, <<"g">>, <<>>} = ((http_packet:field_content())(<<"g">>)),
    {ok, <<"g z">>, <<>>} = ((http_packet:field_content())(<<"g z">>)),
    {ok, <<"g  z">>, <<>>} = ((http_packet:field_content())(<<"g  z">>)),
    ok.

field_name(_) ->
    {ok, <<"Content-Encoding">>, <<>>} = ((http_packet:field_name())(<<"Content-Encoding">>)),
    ok.

field_value(_) ->
    {ok, <<"">>, <<>>} = ((http_packet:field_value())(<<"">>)),
    {ok, <<"gzip">>, <<>>} = ((http_packet:field_value())(<<"gzip">>)),
    ok.

field_vchar(_) ->
    {ok, <<"g">>, <<>>} = ((http_packet:field_vchar())(<<"g">>)),
    {ok, <<",">>, <<>>} = ((http_packet:field_vchar())(<<",">>)),
    ok.

header_field(_) ->
    {ok, {<<"Content-Encoding">>, <<"gzip, chunked">>}, <<>>} = ((http_packet:header_field())(<<"Content-Encoding: gzip, chunked">>)),
    ok.

http_uri(_) ->
    {ok, #{
       scheme    := http,
       authority := <<"example.com">>,
       path      := <<"">>,
       query     := <<>>,
       fragment  := <<>>
      }, <<>>} = ((http_packet:http_uri())(<<"http://example.com">>)),
    {ok, #{
       scheme    := http,
       authority := <<"example.com">>,
       path      := <<"/path">>,
       query     := <<"q=1&p=2">>,
       fragment  := <<>>
      }, <<>>} = ((http_packet:http_uri())(<<"http://example.com/path?q=1&p=2">>)),
    {ok, #{
       scheme    := http,
       authority := <<"example.com">>,
       path      := <<"">>,
       query     := <<>>,
       fragment  := <<"foo">>
      }, <<>>} = ((http_packet:http_uri())(<<"http://example.com#foo">>)),
    {ok, #{
       scheme    := http,
       authority := <<"example.com">>,
       path      := <<"">>,
       query     := <<"q=1&p=2">>,
       fragment  := <<"foo">>
      }, <<>>} = ((http_packet:http_uri())(<<"http://example.com?q=1&p=2#foo">>)),
    ok.

https_uri(_) ->
    {ok, #{
       scheme    := https,
       authority := <<"example.com">>,
       path      := <<"">>,
       query     := <<>>,
       fragment  := <<>>
      }, <<>>} = ((http_packet:https_uri())(<<"https://example.com">>)),
    {ok, #{
       scheme    := https,
       authority := <<"example.com">>,
       path      := <<"/path">>,
       query     := <<"q=1&p=2">>,
       fragment  := <<>>
      }, <<>>} = ((http_packet:https_uri())(<<"https://example.com/path?q=1&p=2">>)),
    {ok, #{
       scheme    := https,
       authority := <<"example.com">>,
       path      := <<"">>,
       query     := <<>>,
       fragment  := <<"foo">>
      }, <<>>} = ((http_packet:https_uri())(<<"https://example.com#foo">>)),
    {ok, #{
       scheme    := https,
       authority := <<"example.com">>,
       path      := <<"">>,
       query     := <<"q=1&p=2">>,
       fragment  := <<"foo">>
      }, <<>>} = ((http_packet:https_uri())(<<"https://example.com?q=1&p=2#foo">>)),
    ok.

last_chunk(_) ->
    {ok, {<<"0">>, <<>>, <<>>}, <<>>} = ((http_packet:last_chunk())(<<"0\r\n">>)),
    {ok, {<<"0">>, <<>>, <<>>}, <<>>} = ((http_packet:last_chunk())(<<"00\r\n">>)),
    {ok, {<<"0">>, <<";name=value">>, <<>>}, <<>>} = ((http_packet:last_chunk())(<<"00;name=value\r\n">>)),
    ok.

message_body(_) ->
    {ok, <<"<html><title>hello</title></html>">>, <<>>} = ((http_packet:message_body())(<<"<html><title>hello</title></html>">>)),
    ok.

method(_) ->
    {ok, <<"GET">>, <<>>} = ((http_packet:method())(<<"GET">>)),
    {ok, <<"POST">>, <<>>} = ((http_packet:method())(<<"POST">>)),
    ok.

obs_fold(_) ->
    {ok, <<"\r\n ">>, <<>>}      = ((http_packet:obs_fold())(<<"\r\n ">>)),
    {ok, <<"\r\n\t">>, <<>>}     = ((http_packet:obs_fold())(<<"\r\n\t">>)),
    {ok, <<"\r\n \t \t">>, <<>>} = ((http_packet:obs_fold())(<<"\r\n \t \t">>)),
    ok.

obs_text(_) ->
    {ok, <<16#80>>, <<>>} = ((http_packet:obs_text())(<<16#80>>)),
    {ok, <<16#FF>>, <<>>} = ((http_packet:obs_text())(<<16#FF>>)),
    ok.

origin_form(_) ->
    {ok, <<"/path/to/file">>,         <<>>} = ((http_packet:origin_form())(<<"/path/to/file">>)),
    {ok, <<"/path/to/file?a=b">>,     <<>>} = ((http_packet:origin_form())(<<"/path/to/file?a=b">>)),
    {ok, <<"/path/to/file?a=b&c=d">>, <<>>} = ((http_packet:origin_form())(<<"/path/to/file?a=b&c=d">>)),
    ok.

partial_uri(_) ->
    {ok, <<"path/to/file">>,         <<>>} = ((http_packet:partial_uri())(<<"path/to/file">>)),
    {ok, <<"path/to/file?a=b">>,     <<>>} = ((http_packet:partial_uri())(<<"path/to/file?a=b">>)),
    {ok, <<"path/to/file?a=b&c=d">>, <<>>} = ((http_packet:partial_uri())(<<"path/to/file?a=b&c=d">>)),
    ok.

protocol(_) ->
    {ok, <<"HTTP/2.0">>, <<>>} = ((http_packet:protocol())(<<"HTTP/2.0">>)),
    ok.

protocol_name(_) ->
    {ok, <<"HTTP">>, <<>>} = ((http_packet:protocol_name())(<<"HTTP">>)),
    ok.

protocol_version(_) ->
    {ok, <<"1.1">>, <<>>} = ((http_packet:protocol_version())(<<"1.1">>)),
    ok.

pseudonym(_) ->
    {ok, <<"lucy">>, <<>>} = ((http_packet:pseudonym())(<<"lucy">>)),
    ok.

qdtext(_) ->
    {ok, <<"\t">>, <<>>} = ((http_packet:qdtext())(<<"\t">>)),
    {ok, <<" ">>, <<>>} = ((http_packet:qdtext())(<<" ">>)),
    {ok, <<"!">>, <<>>} = ((http_packet:qdtext())(<<"!">>)),
    {ok, <<16#23>>, <<>>} = ((http_packet:qdtext())(<<16#23>>)),
    {ok, <<16#5B>>, <<>>} = ((http_packet:qdtext())(<<16#5B>>)),
    {ok, <<16#5D>>, <<>>} = ((http_packet:qdtext())(<<16#5D>>)),
    {ok, <<16#7E>>, <<>>} = ((http_packet:qdtext())(<<16#7E>>)),
    {ok, <<16#80>>, <<>>} = ((http_packet:qdtext())(<<16#80>>)),
    {ok, <<16#FF>>, <<>>} = ((http_packet:qdtext())(<<16#FF>>)),
    ok.

quoted_pair(_) ->
    {ok, <<"\\ ">>, <<>>} = ((http_packet:quoted_pair())(<<"\\ ">>)),
    {ok, <<"\\\t">>, <<>>} = ((http_packet:quoted_pair())(<<"\\\t">>)),
    ok.

quoted_string(_) ->
    {ok, <<"\"asdf\"">>, <<>>} = ((http_packet:quoted_string())(<<"\"asdf\"">>)),
    ok.

rank(_) ->
    {ok, <<"0">>,     <<>>} = ((http_packet:rank())(<<"0">>)),
    {ok, <<"0.1">>,   <<>>} = ((http_packet:rank())(<<"0.1">>)),
    {ok, <<"0.123">>, <<>>} = ((http_packet:rank())(<<"0.123">>)),
    {ok, <<"1">>,     <<>>} = ((http_packet:rank())(<<"1">>)),
    {ok, <<"1.0">>,   <<>>} = ((http_packet:rank())(<<"1.0">>)),
    {ok, <<"1.000">>, <<>>} = ((http_packet:rank())(<<"1.000">>)),
    ok.

reason_phrase(_) ->
    {ok, <<" ">>, <<>>} = ((http_packet:reason_phrase())(<<" ">>)),
    {ok, <<"\t">>, <<>>} = ((http_packet:reason_phrase())(<<"\t">>)),
    {ok, <<"OK">>, <<>>} = ((http_packet:reason_phrase())(<<"OK">>)),
    {ok, <<"Not Found">>, <<>>} = ((http_packet:reason_phrase())(<<"Not Found">>)),
    ok.

received_by(_) ->
    {ok, <<"p.example.net:3000">>, <<>>} = ((http_packet:received_by())(<<"p.example.net:3000">>)),
    {ok, <<"lucy">>, <<>>} = ((http_packet:received_by())(<<"lucy">>)),
    ok.

received_protocol(_) ->
    {ok, <<"HTTP/1.1">>, <<>>} = ((http_packet:received_protocol())(<<"HTTP/1.1">>)),
    ok.

request_line(_) ->
    {ok, #{
       method := "GET",
       target := "/path/to/file?a=b",
       version := "HTTP/1.1"
      }, <<>>} = ((http_packet:request_line())(<<"GET /path/to/file?a=b HTTP/1.1\r\n">>)),

    {ok, #{
       method := "GET",
       target := "http://path/to/file?a=b&c=d",
       version := "HTTP/1.1"
      }, <<>>} = ((http_packet:request_line())(<<"GET http://path/to/file?a=b&c=d HTTP/1.1\r\n">>)),

    {ok, #{
       method := "GET",
       target := "admin@example.com:3000",
       version := "HTTP/1.1"
      }, <<>>} = ((http_packet:request_line())(<<"GET admin@example.com:3000 HTTP/1.1\r\n">>)),
    ok.

request_target(_) ->
    {ok, <<"/path">>, <<>>}                       = ((http_packet:request_target())(<<"/path">>)),
    {ok, <<"/path/to/file">>, <<>>}               = ((http_packet:request_target())(<<"/path/to/file">>)),
    {ok, <<"/path/to/file">>, <<>>}               = ((http_packet:request_target())(<<"/path/to/file">>)),
    {ok, <<"/path/to/file?a=b">>, <<>>}           = ((http_packet:request_target())(<<"/path/to/file?a=b">>)),
    {ok, <<"/path/to/file?a=b&c=d">>, <<>>}       = ((http_packet:request_target())(<<"/path/to/file?a=b&c=d">>)),
    {ok, <<"http://path/to/file">>, <<>>}         = ((http_packet:request_target())(<<"http://path/to/file">>)),
    {ok, <<"http://path/to/file?a=b&c=d">>, <<>>} = ((http_packet:request_target())(<<"http://path/to/file?a=b&c=d">>)),
    {ok, <<"example.com">>, <<>>}                 = ((http_packet:request_target())(<<"example.com">>)),
    {ok, <<"example.com:3000">>, <<>>}            = ((http_packet:request_target())(<<"example.com:3000">>)),
    {ok, <<"admin@example.com">>, <<>>}           = ((http_packet:request_target())(<<"admin@example.com">>)),
    {ok, <<"admin@example.com:3000">>, <<>>}      = ((http_packet:request_target())(<<"admin@example.com:3000">>)),
    {ok, <<"*">>, <<>>}                           = ((http_packet:request_target())(<<"*">>)),
    ok.

start_line(_) ->
    {ok, #{
       method := "GET",
       target := "http://path/to/file?a=b&c=d",
       version := "HTTP/1.1"
      }, <<>>} = ((http_packet:start_line())(<<"GET http://path/to/file?a=b&c=d HTTP/1.1\r\n">>)),
    {ok, #{
       version := "HTTP/1.1",
       status := "404",
       reason := "Not Found"
      }, <<>>} = ((http_packet:start_line())(<<"HTTP/1.1 404 Not Found\r\n">>)),
    ok.

status_code(_) ->
    {ok, <<"404">>, <<>>} = ((http_packet:status_code())(<<"404">>)),
    ok.

status_line(_) ->
    {ok, #{
       version := "HTTP/1.1",
       status := "404",
       reason := "Not Found"
      }, <<>>} = ((http_packet:status_line())(<<"HTTP/1.1 404 Not Found\r\n">>)),
    ok.

t_codings(_) ->
    {ok, <<"trailers">>, <<>>} = ((http_packet:t_codings())(<<"trailers">>)),
    {ok, <<"deflate;q=0.5">>, <<>>} = ((http_packet:t_codings())(<<"deflate;q=0.5">>)),
    ok.

t_ranking(_) ->
    {ok, <<";q=0.5">>, <<>>} = ((http_packet:t_ranking())(<<";q=0.5">>)),
    {ok, <<" ;q=0.5">>, <<>>} = ((http_packet:t_ranking())(<<" ;q=0.5">>)),
    {ok, <<"; q=0.5">>, <<>>} = ((http_packet:t_ranking())(<<"; q=0.5">>)),
    {ok, <<" ; q=0.5">>, <<>>} = ((http_packet:t_ranking())(<<" ; q=0.5">>)),
    ok.

tchar(_) ->
    {ok, <<"!">>, <<>>} = ((http_packet:tchar())(<<"!">>)),
    {ok, <<"#">>, <<>>} = ((http_packet:tchar())(<<"#">>)),
    {ok, <<"$">>, <<>>} = ((http_packet:tchar())(<<"$">>)),
    {ok, <<"%">>, <<>>} = ((http_packet:tchar())(<<"%">>)),
    {ok, <<"&">>, <<>>} = ((http_packet:tchar())(<<"&">>)),
    {ok, <<"'">>, <<>>} = ((http_packet:tchar())(<<"'">>)),
    {ok, <<"*">>, <<>>} = ((http_packet:tchar())(<<"*">>)),
    {ok, <<"+">>, <<>>} = ((http_packet:tchar())(<<"+">>)),
    {ok, <<"-">>, <<>>} = ((http_packet:tchar())(<<"-">>)),
    {ok, <<".">>, <<>>} = ((http_packet:tchar())(<<".">>)),
    {ok, <<"^">>, <<>>} = ((http_packet:tchar())(<<"^">>)),
    {ok, <<"_">>, <<>>} = ((http_packet:tchar())(<<"_">>)),
    {ok, <<"`">>, <<>>} = ((http_packet:tchar())(<<"`">>)),
    {ok, <<"|">>, <<>>} = ((http_packet:tchar())(<<"|">>)),
    {ok, <<"~">>, <<>>} = ((http_packet:tchar())(<<"~">>)),
    {ok, <<"0">>, <<>>} = ((http_packet:tchar())(<<"0">>)),
    {ok, <<"a">>, <<>>} = ((http_packet:tchar())(<<"a">>)),
    {ok, <<"A">>, <<>>} = ((http_packet:tchar())(<<"A">>)),
    ok.

token(_) ->
    {ok, <<"!#$%&'*+-.^_`|~0aA">>, <<>>} = ((http_packet:token())(<<"!#$%&'*+-.^_`|~0aA">>)),
    ok.

trailer_part(_) ->
    {ok, [{<<"Transfer-Encoding">>, <<"chunked">>}], <<>>} = ((http_packet:trailer_part())(<<"Transfer-Encoding: chunked\r\n">>)),
    ok.

transfer_coding(_) ->
    {ok, <<"chunked">>,       <<>>} = ((http_packet:transfer_coding())(<<"chunked">>)),
    {ok, <<"compress">>,      <<>>} = ((http_packet:transfer_coding())(<<"compress">>)),
    {ok, <<"deflate">>,       <<>>} = ((http_packet:transfer_coding())(<<"deflate">>)),
    {ok, <<"gzip">>,          <<>>} = ((http_packet:transfer_coding())(<<"gzip">>)),
    {ok, <<"default;q=0.5">>, <<>>} = ((http_packet:transfer_coding())(<<"default;q=0.5">>)),
    ok.

transfer_extension(_) ->
    {ok, <<"default;q=0.5">>, <<>>} = ((http_packet:transfer_extension())(<<"default;q=0.5">>)),
    ok.

transfer_parameter(_) ->
    {ok, <<"a = b">>,           <<>>} = ((http_packet:transfer_parameter())(<<"a = b">>)),
    {ok, <<"a= b">>,            <<>>} = ((http_packet:transfer_parameter())(<<"a= b">>)),
    {ok, <<"a =b">>,            <<>>} = ((http_packet:transfer_parameter())(<<"a =b">>)),
    {ok, <<"key = \"value\"">>, <<>>} = ((http_packet:transfer_parameter())(<<"key = \"value\"">>)),
    ok.

fws(_) -> ok. % TODO

field_ows(_) -> ok. % TODO
