/** @type {import('next').NextConfig} */
// Compatible con Vercel (raíz) y GitHub Pages (GITHUB_ACTIONS define basePath)
const isGitHubPages = process.env.GITHUB_ACTIONS === "true"

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/opersegcrm" : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
