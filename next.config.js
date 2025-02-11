/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Remove or comment out the output: 'export' line for development
	output: 'export',
	images: {
		unoptimized: true,
		domains: ['kacpermargol.eu'],
	},
	trailingSlash: true,
	experimental: {
		scrollRestoration: true,
	},
	crossOrigin: 'anonymous',
	poweredByHeader: false,
	webpack: (config) => {
		config.resolve.fallback = { fs: false };
		return config;
	},
};

module.exports = nextConfig;
