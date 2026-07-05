export const privacyContent = {
	banner: {
		message:
			'This website uses cookies, including Google Analytics, to analyze traffic, understand user behavior, and improve search indexing. You can accept cookies or read our Privacy Policy for details.',
		accept: 'Accept',
		privacyPolicy: 'Privacy Policy',
	},
	form: {
		clauseBefore: 'By submitting this form, you accept our',
		privacyPolicyLink: 'Privacy Policy',
		clauseAfter: '.',
	},
	footer: {
		privacyPolicy: 'Privacy Policy',
		copyright: 'All rights reserved.',
	},
	modal: {
		title: 'Privacy Policy',
		lastUpdated: 'Last updated: July 5, 2026',
		close: 'Close',
		sections: [
			{
				title: '1. Data Controller',
				paragraphs: [
					'The data controller responsible for processing your personal data on this website is Kacper Margol, reachable via the contact form at kacpermargol.eu.',
					'If you have questions about this Privacy Policy or wish to exercise your rights under the GDPR (General Data Protection Regulation) or RODO (Polish implementation of GDPR), please contact us using the contact form on this website.',
				],
			},
			{
				title: '2. What Data We Collect',
				paragraphs: [
					'We may collect the following categories of personal data:',
				],
				list: [
					'Contact form data: name, email address, and message content you voluntarily submit.',
					'Analytics data: anonymized or pseudonymized information about your visit, including pages viewed, time spent, referral source, device type, browser, and approximate location (country/city level).',
					'Technical data: IP address (processed by analytics providers), cookies, and similar identifiers stored in your browser.',
				],
			},
			{
				title: '3. Google Analytics',
				paragraphs: [
					'With your consent, this website uses Google Analytics, a web analytics service provided by Google LLC. Google Analytics uses cookies to collect information about how visitors use the site.',
					'We use Google Analytics to analyze user searches and navigation patterns, understand visitor behavior, measure site performance, and optimize search engine indexing and content relevance.',
					'Google may process data on servers located outside the European Economic Area. Google participates in applicable data transfer frameworks and provides contractual safeguards. For more information, visit https://policies.google.com/privacy.',
					'You can withdraw consent at any time by clearing site data in your browser or using Google\'s opt-out browser add-on: https://tools.google.com/dlpage/gaoptout.',
				],
			},
			{
				title: '4. Legal Basis for Processing',
				paragraphs: [
					'We process personal data on the following legal bases under GDPR Article 6:',
				],
				list: [
					'Consent (Art. 6(1)(a)): for analytics cookies and Google Analytics tracking.',
					'Legitimate interest (Art. 6(1)(f)): for ensuring website security and basic functionality.',
					'Pre-contractual measures / contract (Art. 6(1)(b)): for responding to contact form inquiries.',
				],
			},
			{
				title: '5. How We Use Your Data',
				paragraphs: [
					'We use collected data to respond to your messages, improve website content and usability, analyze traffic trends, and optimize our presence in search results. We do not sell your personal data to third parties.',
				],
			},
			{
				title: '6. Data Retention',
				paragraphs: [
					'Contact form submissions are retained only as long as necessary to handle your inquiry and any follow-up communication, typically up to 24 months unless a longer period is required by law.',
					'Google Analytics data is retained according to Google\'s configured retention settings (default 14 months for user-level data).',
				],
			},
			{
				title: '7. Your Rights',
				paragraphs: [
					'Under GDPR/RODO, you have the right to access, rectify, erase, restrict processing, data portability, and to object to processing based on legitimate interests. Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of prior processing.',
					'You also have the right to lodge a complaint with a supervisory authority. In Poland, this is the President of the Personal Data Protection Office (UODO): https://uodo.gov.pl.',
				],
			},
			{
				title: '8. Cookies',
				paragraphs: [
					'Essential cookies may be used for basic site operation. Analytics cookies are placed only after you click "Accept" on the cookie banner. You can manage cookies through your browser settings.',
				],
			},
			{
				title: '9. Changes to This Policy',
				paragraphs: [
					'We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision. Continued use of the website after changes constitutes acknowledgment of the updated policy.',
				],
			},
		],
	},
} as const;
