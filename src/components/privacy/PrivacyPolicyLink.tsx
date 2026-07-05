'use client';

import { usePrivacy } from '@/context/PrivacyContext';
import { privacyContent } from '@/content/privacy';

type PrivacyPolicyLinkProps = {
	className?: string;
};

export default function PrivacyPolicyLink({
	className = 'text-primary hover:text-accent underline underline-offset-2 transition-colors',
}: PrivacyPolicyLinkProps) {
	const { openPrivacyModal } = usePrivacy();

	return (
		<button
			type="button"
			onClick={openPrivacyModal}
			className={className}
		>
			{privacyContent.form.privacyPolicyLink}
		</button>
	);
}
