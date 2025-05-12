module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{json,ico,html,js,css,png,jpg,jpeg,svg,gif,woff,woff2,eot,ttf,otf}"
  ],
  swDest: "dist/service-worker.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts-stylesheets"
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365
        }
      }
    }
  ]
}; 