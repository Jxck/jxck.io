#!/bin/bash -xe




eyeD3 --remove-all ../files.mozaic.fm/mozaic-ep100.mp3

eyeD3 --title "ep100 State of mozaic.fm" \
      --track 108 \
      --artist 'Jxck' \
      --album 'mozaic.fm' \
      --genre 'Podcast' \
      --add-image ./www.jxck.io/assets/img/mozaic.jpeg:FRONT_COVER \
      --to-v2.3 \
      ../files.mozaic.fm/mozaic-ep100.mp3



