/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/starknetapp',
  assetPrefix: "/starknetapp/",

  //https://github.com/vercel/next.js/issues/21079
  images: {
    loader: "imgix",
    path: ""
  }
}

module.exports = nextConfig
