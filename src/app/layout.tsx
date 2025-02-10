import type { Metadata } from 'next';
import { Inter, Cinzel_Decorative } from 'next/font/google';
import '../styles/globals.css';

const cinzel = Cinzel_Decorative({
	subsets: ['latin'],
	display: 'swap',
	weight: ['700'], // Make sure it's an array
	preload: true,
	variable: '--font-cinzel',
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
		<html lang="en" className={`scroll-smooth ${cinzel.variable}`}>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
