all:
	convert lenna.lossless.png lenna.lossy.jpeg
	cwebp lenna.lossless.png -o lenna.lossy.webp
	cwebp -lossless uikit.lossless.png -o uikit.lossless.webp

clean:
	rm lenna.lossy.jpeg
	rm lenna.lossy.webp
	rm uikit.lossless.webp
