export const CONSENT_STORAGE_KEY = 'cookie-consent';

export type ConsentValue = 'accepted' | 'declined';

export function getStoredConsent(): ConsentValue | null {
	if (typeof window === 'undefined') return null;

	const value = localStorage.getItem(CONSENT_STORAGE_KEY);
	if (value === 'accepted' || value === 'declined') return value;
	return null;
}

export function hasConsentDecision(): boolean {
	return getStoredConsent() !== null;
}

export function saveConsent(value: ConsentValue): void {
	localStorage.setItem(CONSENT_STORAGE_KEY, value);
	document.cookie = `${CONSENT_STORAGE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

export function hasAnalyticsConsent(): boolean {
	return getStoredConsent() === 'accepted';
}
