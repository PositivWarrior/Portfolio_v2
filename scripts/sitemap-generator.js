const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://kacpermargol.eu';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Single-page portfolio — only the canonical homepage should be in the sitemap.
// Hash URLs (#about, #projects) are ignored by Google and create duplicate signals.
const pages = [
	{
		path: '/',
		priority: '1.0',
		changefreq: 'weekly',
	},
];

const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
	let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	pages.forEach((page) => {
		sitemap += '  <url>\n';
		sitemap += `    <loc>${SITE_URL}${page.path}</loc>\n`;
		sitemap += `    <lastmod>${today}</lastmod>\n`;
		sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
		sitemap += `    <priority>${page.priority}</priority>\n`;
		sitemap += '  </url>\n';
	});

	sitemap += '</urlset>';
	return sitemap;
}

if (!fs.existsSync(PUBLIC_DIR)) {
	fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(SITEMAP_PATH, generateSitemap());
console.log(`Sitemap generated at ${SITEMAP_PATH}`);
