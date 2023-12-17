/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  //next.js config
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://p2-api.----------.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
});
// const nextConfig = {
//   i18n: {
//     locales: ["ja"],
//     defaultLocale: "ja",
//   },

//   // async headers() {
//   //   return [
//   //     {
//   //       // matching all API routes
//   //       source: "/api/:path*",
//   //       headers: [
//   //         { key: "Access-Control-Allow-Credentials", value: "true" },
//   //         {
//   //           key: "Access-Control-Allow-Origin",
//   //           value: "https://p2-api.----------.com",
//   //         }, // replace this your actual origin
//   //         {
//   //           key: "Access-Control-Allow-Methods",
//   //           value: "GET,DELETE,PATCH,POST,PUT",
//   //         },
//   //         {
//   //           key: "Access-Control-Allow-Headers",
//   //           value:
//   //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//   //         },
//   //       ],
//   //     },
//   //   ];
//   // },
// };

// module.exports = nextConfig;
