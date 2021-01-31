#!/bin/bash -xe

eyeD3 --remove-all ../files.mozaic.fm/mozaic-ep79.mp3

eyeD3 --title "ep79 Monthly Web 202101" \
      --track 87 \
      --artist 'Jxck' \
      --album 'mozaic.fm' \
      --genre 'Podcast' \
      --add-image ./www.jxck.io/assets/img/mozaic.jpeg:FRONT_COVER \
      --to-v2.3 \
      ../files.mozaic.fm/mozaic-ep79.mp3



