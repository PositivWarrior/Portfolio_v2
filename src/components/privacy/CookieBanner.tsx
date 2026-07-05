'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrivacy } from '@/context/PrivacyContext';
import { privacyContent } from '@/content/privacy';
import { hasConsentDecision, saveConsent } from '@/lib/consent';

export default function CookieBanner() {
	const { openPrivacyModal } = usePrivacy();
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		if (!hasConsentDecision()) {
			setShouldShow(true);
		}
	}, []);

	const handleAccept = () => {
		saveConsent('accepted');
		setShouldShow(false);
		window.dispatchEvent(new Event('cookie-consent-changed'));
	};

	if (!shouldShow) return null;

	return (
		<AnimatePresence>
			<motion.aside
				role="dialog"
				aria-live="polite"
				aria-label="Cookie consent"
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 100, opacity: 0 }}
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
				className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
			>
				<div
					className="container mx-auto max-w-4xl rounded-xl border border-primary/20
            bg-card/95 backdrop-blur-md shadow-2xl shadow-black/40 p-4 sm:p-6"
				>
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
						<p className="flex-1 text-sm sm:text-base text-foreground/85 leading-relaxed">
							{privacyContent.banner.message}
						</p>

						<div className="flex flex-col xs:flex-row gap-3 shrink-0 w-full sm:w-auto">
							<button
								type="button"
								onClick={openPrivacyModal}
								className="px-5 py-2.5 text-sm font-semibold text-primary
                  border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
							>
								{privacyContent.banner.privacyPolicy}
							</button>
							<button
								type="button"
								onClick={handleAccept}
								className="px-5 py-2.5 text-sm font-bold text-primary-foreground
                  bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70
                  rounded-lg shadow-lg shadow-primary/20 transition-all duration-300"
							>
								{privacyContent.banner.accept}
							</button>
						</div>
					</div>
				</div>
			</motion.aside>
		</AnimatePresence>
	);
}
