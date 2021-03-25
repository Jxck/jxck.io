"use strict";
const path = require("path");
const { generateSW } = require("workbox-build");

//variable
const distDir = path.join(process.cwd(), "dist");
const swPath = path.join(distDir, "serviceWorker.js");
const cacheId = "labs.jxck.io"

generateSW({
  cacheId: cacheId,
  swDest: swPath,
  //importWorkboxFrom: "local",
  globDirectory: "./dist/",
  globPatterns: [],
  runtimeCaching: [
    {
      urlPattern: /.+(\/|.html)$/,
      handler: "NetworkFirst",
      options: {
        cacheName: cacheId + "-html-cache",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    },
    {
      urlPattern: /.+\.(js|css|woff)$/,
      handler: "CacheFirst",
      options: {
        cacheName: cacheId + "-dependent-cache",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 90,
        },
      },
    },
    {
      urlPattern: /.+\.(png|gif|jpg|jpeg|svg)$/,
      handler: "CacheFirst",
      options: {
        cacheName: cacheId + "-image-cache",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ]
}).then(({ count, size, warnings }) => {
  for (const warning of warnings) {
    console.warn(warning);
  }
  console.log(
    `Generated ${swPath}, which will precache ${count} files, totaling ${size} bytes.`
  );
});
