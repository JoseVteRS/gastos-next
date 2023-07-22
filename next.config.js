/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    staticPageGenerationTimeout: 180
}

module.exports = nextConfig
