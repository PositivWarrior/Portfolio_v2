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
	title: 'Portfolio | Junior Full-Stack Developer',
	description:
		'Junior Full-Stack Developer with a passion for design and modern web technologies',
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
