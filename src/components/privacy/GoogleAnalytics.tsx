'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { hasAnalyticsConsent } from '@/lib/consent';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		setEnabled(hasAnalyticsConsent());

		const handleConsentChange = () => {
			setEnabled(hasAnalyticsConsent());
		};

		window.addEventListener('cookie-consent-changed', handleConsentChange);
		return () => {
			window.removeEventListener(
				'cookie-consent-changed',
				handleConsentChange,
			);
		};
	}, []);

	if (!GA_MEASUREMENT_ID || !enabled) return null;

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
			</Script>
		</>
	);
}
