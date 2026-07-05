'use client';

import PrivacyPolicyLink from '@/components/privacy/PrivacyPolicyLink';
import { privacyContent } from '@/content/privacy';

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative border-t border-primary/10 bg-black py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
					<p>
						&copy; {year} Kacper Margol. {privacyContent.footer.copyright}
					</p>
					<PrivacyPolicyLink className="text-primary/80 hover:text-primary underline underline-offset-2 transition-colors" />
				</div>
			</div>
		</footer>
	);
}
