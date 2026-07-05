'use client';

import { PrivacyProvider } from '@/context/PrivacyContext';
import CookieBanner from '@/components/privacy/CookieBanner';
import PrivacyPolicyModal from '@/components/privacy/PrivacyPolicyModal';
import GoogleAnalytics from '@/components/privacy/GoogleAnalytics';

export default function PrivacySystem({ children }: { children: React.ReactNode }) {
	return (
		<PrivacyProvider>
			{children}
			<CookieBanner />
			<PrivacyPolicyModal />
			<GoogleAnalytics />
		</PrivacyProvider>
	);
}
