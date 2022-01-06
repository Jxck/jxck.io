all:
	convert lenna.lossless.png lenna.lossy.jpeg
	cwebp lenna.lossless.png -o lenna.lossy.webp
	cwebp -lossless uikit.lossless.png -o uikit.lossless.webp
	npx avif --input lenna.lossless.png --speed 0 --verbose && mv lenna.lossless.avif lenna.lossy.avif
	npx avif --input uikit.lossless.png --speed 0 --verbose --lossless


clean:
	rm -rf *.jpeg
	rm -rf *.webp
	rm -rf *.avif
