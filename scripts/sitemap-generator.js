const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://kacpermargol.eu';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Base pages to include
const pages = [
	{
		path: '/',
		priority: '1.0',
		changefreq: 'monthly',
	},
	{
		path: '/#about',
		priority: '0.8',
		changefreq: 'monthly',
	},
	{
		path: '/#projects',
		priority: '0.8',
		changefreq: 'monthly',
	},
	{
		path: '/#testimonials',
		priority: '0.7',
		changefreq: 'monthly',
	},
	{
		path: '/#contact',
		priority: '0.8',
		changefreq: 'monthly',
	},
];

// Get current date in ISO format for lastmod
const today = new Date().toISOString().split('T')[0];

// Generate sitemap XML
function generateSitemap() {
	// XML header
	let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	// Add each page to the sitemap
	pages.forEach((page) => {
		sitemap += '  <url>\n';
		sitemap += `    <loc>${SITE_URL}${page.path}</loc>\n`;
		sitemap += `    <lastmod>${today}</lastmod>\n`;
		sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
		sitemap += `    <priority>${page.priority}</priority>\n`;
		sitemap += '  </url>\n';
	});

	// Close XML
	sitemap += '</urlset>';

	return sitemap;
}

// Ensure the public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
	fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Write sitemap to file
fs.writeFileSync(SITEMAP_PATH, generateSitemap());
console.log(`Sitemap generated at ${SITEMAP_PATH}`);
