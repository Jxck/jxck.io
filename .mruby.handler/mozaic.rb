Proc.new do |env|
  url_mapping = {
    "/133930208998/20-browser"                              => "/episodes/20/browser.html",
    "/125880769358/19-es7-sideshow"                         => "/episodes/19/es7-sideshow.html",
    "/125673651143/19-es7"                                  => "/episodes/19/es7.html",
    "/120432027123/18-nginx"                                => "/episodes/18/nginx.html",
    "/117004083098/17-service-worker"                       => "/episodes/17/service-worker.html",
    "/114757323168/16-security-application"                 => "/episodes/16/security-application.html",
    "/108491263993/15-extensible-web"                       => "/episodes/15/extensible-web.html",
    "/108439721723/14-whatwg"                               => "/episodes/14/whatwg.html",
    "/106622047573/13-virtual-dom-sideshow"                 => "/episodes/13/virtual-dom-sideshow.html",
    "/106264251221/13-virtual-dom"                          => "/episodes/13/virtual-dom.html",
    "/104929969123/12-rails-sideshow"                       => "/episodes/12/rails-sideshow.html",
    "/104575088493/12-rails"                                => "/episodes/12/rails.html",
    "/102200264358/11-high-performance-browser-networking"  => "/episodes/11/high-performance-browser-networking.html",
    "/100741841543/10-nodejs-sideshow"                      => "/episodes/10/nodejs-sideshow.html",
    "/99334017903/10-nodejs"                                => "/episodes/10/nodejs.html",
    "/96967133203/9-socketio"                               => "/episodes/9/socket.io.html",
    "/96461640633/8-altjs"                                  => "/episodes/8/altjs.html",
    "/95128341833/7-rest"                                   => "/episodes/7/rest.html",
    "/93685882203/6-webrtc"                                 => "/episodes/6/webrtc.html",
    "/88873962313/5-typescript"                             => "/episodes/5/typescript.html",
    "/88061749963/4-security-protocol"                      => "/episodes/4/secuirty-protocol.html",
    "/87393804788/3-angularjs"                              => "/episodes/3/angularjs.html",
    "/84175339248/2-http2-sideshow"                         => "/episodes/2/http2-sideshow.html",
    "/83421293098/2-http2"                                  => "/episodes/2/http2.html",
    "/81902884557/1-webcomponents"                          => "/episodes/1/webcomponents.html",
    "/81224972090/0-introduction-of-mozaicfm"               => "/episodes/0/introduction-of-mozaicfm.html",
  }
  path = env["PATH_INFO"]
  if url_mapping[path]
    next [301, { "Content-Type" => "text/html", "Location" => url_mapping[path] }, []]
  end
  [399, {}, []]
end
