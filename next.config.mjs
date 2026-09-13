/** @type {import('next').NextConfig} */
const REPO = "zoology-specimens";
// Only prefix paths for the production build (what gets deployed to
// GitHub Pages). `npm run dev` uses NODE_ENV=development, so it stays
// at the plain http://localhost:3000 root.
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // GitHub Pages serves this project from https://Erenzxzx.github.io/zoology-specimens/
  // so every asset and link needs that path prefix baked in.
  basePath: isProd ? `/${REPO}` : "",
  assetPrefix: isProd ? `/${REPO}/` : "",
  // Static export can't use Next's image optimization server.
  images: { unoptimized: true },
  // Every route folder gets an index.html (out/specimens/001/index.html),
  // which is what GitHub Pages expects for clean, trailing-slash URLs.
  trailingSlash: true,
};

export default nextConfig;
