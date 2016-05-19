'use strict';
let p = console.log.bind(console);

console.log(`貴様、見ているな！！
このサイトの技術的なまとめはこちらをどうぞ。
https://labs.jxck.io/blog
by Jxck
`)

let hr = document.createElement('hr');



function load(path) {
  fetch(path)
    .then((res) => res.text())
    .then((text) => {
      // fetch & parse prev html
      let parser = new DOMParser();
      let doc = parser.parseFromString(text, 'text/html');

      // update link prev/next
      let prev = doc.querySelector('link[rel=prev]').href;
      let next = doc.querySelector('link[rel=next]').href;
      let title = doc.querySelector('title').textContent;
      document.querySelector('link[rel=prev]').href = prev;
      document.querySelector('link[rel=next]').href = next;

      // append prev article to main
      let article = doc.querySelector('article');
      let main = document.querySelector('main');
      main.appendChild(hr);
      main.appendChild(article);

      // update current location & title
      history.pushState(title, title, path);
      document.querySelector('title').textContent = title;

      window.addEventListener('popstate',function(e){
        console.log(e.state);
      });

    });
}

window.addEventListener('DOMContentLoaded', () => {
  let observer = new IntersectionObserver((changes) => {
    for (let change of changes) {
      if (change.intersectionRatio > 0 && change.target.nodeName === 'FOOTER') {
        let next = document.querySelector('link[rel=prev]').href;
        let path = new URL(next).pathname;
        console.log('fetch', path);
        load(path);
      }
    }
  });
  observer.observe(document.querySelector('footer'));






  //console.log(hr);
});
