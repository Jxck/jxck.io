all:
	# convert png -> webp
	find *.jpg | sed 's/.jpg//g' | xargs -I{} cwebp {}.jpg -o {}.webp

	# create gif from png
	convert -delay 60 -loop 0 *.jpg animation.gif

	# create animation webp from gif
	webpmux \
		-frame 1.webp +600+0+0+0 \
		-frame 2.webp +600+0+0+0 \
		-frame 3.webp +600+0+0+0 \
		-frame 4.webp +600+0+0+0 \
		-frame 5.webp +600+0+0+0 \
		-frame 6.webp +600+0+0+0 \
		-o animation.webp

clean:
	rm *.webp && rm *.gif
