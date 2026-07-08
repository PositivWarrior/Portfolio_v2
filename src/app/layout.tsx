import type { Metadata } from 'next';
import { Inter, Eagle_Lake } from 'next/font/google';
import '../styles/globals.css';
import WarmUpService from '@/components/utils/WarmUpService';
import PrivacySystem from '@/components/privacy/PrivacySystem';
import JsonLd from '@/components/seo/JsonLd';

const SITE_URL = 'https://kacpermargol.eu';
const googleSiteVerification =
	process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const eagleLake = Eagle_Lake({
	subsets: ['latin'],
	weight: '400',
	display: 'swap',
	variable: '--font-eagle-lake',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'Kacper Margol | Full-Stack Developer Portfolio',
		template: '%s | Kacper Margol',
	},
	description:
		'Portfolio of Kacper Margol — Full-Stack Developer from Poland. React, Next.js, Node.js, TypeScript. View projects, skills, and contact.',
	keywords: [
		'Kacper Margol',
		'full-stack developer',
		'web developer',
		'react developer',
		'next.js developer',
		'javascript developer',
		'typescript developer',
		'portfolio',
		'Poland developer',
	],
	authors: [{ name: 'Kacper Margol', url: SITE_URL }],
	creator: 'Kacper Margol',
	publisher: 'Kacper Margol',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
		title: 'Kacper Margol | Full-Stack Developer Portfolio',
		description:
			'Portfolio of Kacper Margol — Full-Stack Developer. React, Next.js, Node.js, TypeScript. Projects, skills, and contact.',
		siteName: 'Kacper Margol Portfolio',
		images: [
			{
				url: '/Profile.jpg',
				width: 1200,
				height: 630,
				alt: 'Kacper Margol — Full-Stack Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Kacper Margol | Full-Stack Developer Portfolio',
		description:
			'Portfolio of Kacper Margol — Full-Stack Developer. React, Next.js, Node.js, TypeScript.',
		creator: '@kacpermargol',
		images: ['/Profile.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	...(googleSiteVerification
		? { verification: { google: googleSiteVerification } }
		: {}),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`scroll-smooth ${eagleLake.variable}`}>
			<body className={`${inter.className}`}>
				<JsonLd />
				<PrivacySystem>
					<WarmUpService />
					{children}
				</PrivacySystem>
			</body>
		</html>
	);
}
