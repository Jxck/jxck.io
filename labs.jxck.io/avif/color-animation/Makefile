all:
	# create gif from png
	convert -delay 50 -loop 0 *.jpg animation.gif

	# convert gif to avif
	ffmpeg -i animation.gif -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 2 animation.avif

	# convert png -> webp
	find *.jpg | sed 's/.jpg//g' | xargs -I{} cwebp {}.jpg -o {}.webp

	# create animation webp from gif
	webpmux \
		-frame 1.webp +500+0+0+0 \
		-frame 2.webp +500+0+0+0 \
		-frame 3.webp +500+0+0+0 \
		-frame 4.webp +500+0+0+0 \
		-frame 5.webp +500+0+0+0 \
		-frame 6.webp +500+0+0+0 \
		-o animation.webp


clean:
	rm -f *.webp
	rm -f *.gif
	rm -f *.avif
