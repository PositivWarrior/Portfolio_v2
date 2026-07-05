'use client';

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

interface PrivacyContextValue {
	isPrivacyModalOpen: boolean;
	openPrivacyModal: () => void;
	closePrivacyModal: () => void;
}

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function PrivacyProvider({ children }: { children: ReactNode }) {
	const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

	const openPrivacyModal = useCallback(() => {
		setIsPrivacyModalOpen(true);
	}, []);

	const closePrivacyModal = useCallback(() => {
		setIsPrivacyModalOpen(false);
	}, []);

	const value = useMemo(
		() => ({
			isPrivacyModalOpen,
			openPrivacyModal,
			closePrivacyModal,
		}),
		[isPrivacyModalOpen, openPrivacyModal, closePrivacyModal],
	);

	return (
		<PrivacyContext.Provider value={value}>
			{children}
		</PrivacyContext.Provider>
	);
}

export function usePrivacy() {
	const context = useContext(PrivacyContext);
	if (!context) {
		throw new Error('usePrivacy must be used within a PrivacyProvider');
	}
	return context;
}
