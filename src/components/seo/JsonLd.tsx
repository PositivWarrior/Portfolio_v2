const SITE_URL = 'https://kacpermargol.eu';

const personSchema = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Kacper Margol',
	url: SITE_URL,
	image: `${SITE_URL}/Profile.jpg`,
	jobTitle: 'Full-Stack Developer',
	description:
		'Junior Full-Stack Developer specializing in React, Next.js, Node.js, and TypeScript.',
	sameAs: [
		'https://github.com/PositivWarrior',
		'https://www.linkedin.com/in/kacper-margol-545493195/',
	],
	knowsAbout: [
		'React',
		'Next.js',
		'Node.js',
		'TypeScript',
		'JavaScript',
		'Web Development',
	],
};

const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'Kacper Margol Portfolio',
	url: SITE_URL,
	description:
		'Portfolio of Kacper Margol — Full-Stack Developer showcasing projects, skills, and contact information.',
	author: {
		'@type': 'Person',
		name: 'Kacper Margol',
	},
	inLanguage: 'en',
};

const webPageSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	name: 'Kacper Margol | Full-Stack Developer Portfolio',
	url: SITE_URL,
	description:
		'Junior Full-Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies.',
	isPartOf: {
		'@type': 'WebSite',
		name: 'Kacper Margol Portfolio',
		url: SITE_URL,
	},
	about: {
		'@type': 'Person',
		name: 'Kacper Margol',
	},
};

export default function JsonLd() {
	const schemas = [personSchema, websiteSchema, webPageSchema];

	return (
		<>
			{schemas.map((schema) => (
				<script
					key={schema['@type']}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			))}
		</>
	);
}
