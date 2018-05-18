all:
	# convert png -> webp
	find *.png | sed 's/.png//g' | xargs -I{} cwebp {}.png -o {}.webp

	# create gif from png
	convert -delay 40 -loop 0 *.png gopher-animation.gif

	# create animation webp from gif
	webpmux \
		-frame pkg.webp     +400+0+0+0 \
		-frame project.webp +400+0+0+0 \
		-frame ref.webp     +400+0+0+0 \
		-frame run.webp     +400+0+0+0 \
		-frame talks.webp   +400+0+0+0 \
		-o gopher-animation.webp

clean:
	rm *.webp && rm *.gif
