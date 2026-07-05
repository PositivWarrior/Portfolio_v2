'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePrivacy } from '@/context/PrivacyContext';
import { privacyContent } from '@/content/privacy';

export default function PrivacyPolicyModal() {
	const { isPrivacyModalOpen, closePrivacyModal } = usePrivacy();
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isPrivacyModalOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closePrivacyModal();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isPrivacyModalOpen, closePrivacyModal]);

	return (
		<AnimatePresence>
			{isPrivacyModalOpen && (
				<div
					className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
					role="presentation"
				>
					<motion.button
						type="button"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 bg-black/70 backdrop-blur-sm"
						onClick={closePrivacyModal}
						aria-label="Close privacy policy"
					/>

					<motion.div
						ref={dialogRef}
						role="dialog"
						aria-modal="true"
						aria-labelledby="privacy-policy-title"
						initial={{ opacity: 0, y: 40, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 24, scale: 0.98 }}
						transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="relative z-[101] w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh]
              flex flex-col rounded-t-xl sm:rounded-xl
              border border-primary/20 bg-card shadow-2xl shadow-black/50"
					>
						<div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 sm:px-6 py-4 sm:py-5 shrink-0">
							<div>
								<h2
									id="privacy-policy-title"
									className="text-xl sm:text-2xl font-bold text-gradient"
								>
									{privacyContent.modal.title}
								</h2>
								<p className="mt-1 text-sm text-muted-foreground">
									{privacyContent.modal.lastUpdated}
								</p>
							</div>
							<button
								ref={closeButtonRef}
								type="button"
								onClick={closePrivacyModal}
								className="rounded-lg p-2 text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
								aria-label={privacyContent.modal.close}
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-6 text-sm sm:text-base text-foreground/85 leading-relaxed">
							{privacyContent.modal.sections.map((section) => (
								<section key={section.title}>
									<h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
										{section.title}
									</h3>
									{section.paragraphs.map((paragraph) => (
										<p key={paragraph} className="mb-2 last:mb-0">
											{paragraph}
										</p>
									))}
									{'list' in section && section.list && (
										<ul className="mt-2 list-disc pl-5 space-y-1">
											{section.list.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									)}
								</section>
							))}
						</div>

						<div className="border-t border-primary/10 px-5 sm:px-6 py-4 shrink-0">
							<button
								type="button"
								onClick={closePrivacyModal}
								className="w-full sm:w-auto px-6 py-2.5 font-semibold text-primary-foreground
                  bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70
                  rounded-lg shadow-lg shadow-primary/20 transition-all duration-300"
							>
								{privacyContent.modal.close}
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
