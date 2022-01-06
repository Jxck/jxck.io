all:
	# create gif from png
	convert -delay 50 -loop 0 *.png gopher-animation.gif
	gif2webp gopher-animation.gif -o gopher-animation.webp
	ffmpeg -i gopher-animation.gif -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 2 gopher-animation.avif


clean:
	rm -rf *.webp
	rm -rf *.gif
	rm -rf *.avif


_old:
	# convert png -> webp
	find *.png | sed 's/.png//g' | xargs -I{} cwebp {}.png -o {}.webp
	# create animation webp from gif
	webpmux \
		-frame pkg.webp     +400+0+0+0 \
		-frame project.webp +400+0+0+0 \
		-frame ref.webp     +400+0+0+0 \
		-frame run.webp     +400+0+0+0 \
		-frame talks.webp   +400+0+0+0 \
		-o gopher-animation.webp
