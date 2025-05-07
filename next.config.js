/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Remove or comment out the output: 'export' line for development
	images: {
		unoptimized: true,
		domains: ['images.unsplash.com'],
	},
	trailingSlash: true,
	poweredByHeader: false,
};

module.exports = nextConfig;
