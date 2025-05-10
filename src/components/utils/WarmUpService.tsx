'use client';

import { useEffect } from 'react';

export default function WarmUpService() {
	useEffect(() => {
		const warmUp = async () => {
			const apiUrl = process.env.NEXT_PUBLIC_EMAIL_API_URL;
			if (!apiUrl) {
				// console.log('Email API URL for warm-up not configured.');
				return;
			}
			try {
				// console.log(`Pinging: ${apiUrl}/health`);
				await fetch(`${apiUrl}/health`, { method: 'GET' });
				// console.log('Warm-up ping sent.');
			} catch (error) {
				// console.error('Failed to send warm-up ping:', error);
			}
		};

		warmUp();
	}, []);

	return null; // This component doesn't render anything
}
