/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Remove or comment out the output: 'export' line for development
	output: 'export',
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
};

module.exports = nextConfig;
