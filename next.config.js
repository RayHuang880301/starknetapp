/** @type {import('next').NextConfig} */
console.log(process.env)
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BasePath,
  assetPrefix: process.env.AssetPrefix,

  //https://github.com/vercel/next.js/issues/21079
  images: {
    loader: "imgix",
    path: ""
  }
}

module.exports = nextConfig
