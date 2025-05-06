import type { Metadata } from 'next';
import { Inter, Eagle_Lake } from 'next/font/google';
import '../styles/globals.css';

const eagleLake = Eagle_Lake({
	subsets: ['latin'],
	weight: '400',
	display: 'swap',
	variable: '--font-eagle-lake',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Kacper Margol | Full-Stack Developer Portfolio',
	description:
		'Junior Full-Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies. View my projects and skills.',
	keywords:
		'full-stack developer, web developer, react developer, next.js developer, javascript developer, portfolio',
	authors: [{ name: 'Kacper Margol' }],
	creator: 'Kacper Margol',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://kacpermargol.eu',
		title: 'Kacper Margol | Full-Stack Developer Portfolio',
		description:
			'Junior Full-Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies.',
		siteName: 'Kacper Margol Portfolio',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Kacper Margol | Full-Stack Developer Portfolio',
		description:
			'Junior Full-Stack Developer with expertise in React, Next.js, Node.js, and modern web technologies.',
		creator: '@kacpermargol',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`scroll-smooth ${eagleLake.variable}`}>
			<body className={`${inter.className}`}>{children}</body>
		</html>
	);
}
