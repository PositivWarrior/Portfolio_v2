// Create a separate service for handling testimonials
import emailjs from '@emailjs/browser';

export const submitTestimonial = async (testimonialData: {
	name: string;
	role: string;
	company?: string;
	text: string;
	email: string; // for verification
	image?: File;
}) => {
	// Option 1: Send to your email using EmailJS
	await emailjs.send(
		'YOUR_SERVICE_ID',
		'YOUR_TEMPLATE_ID',
		{
			from_name: testimonialData.name,
			message: testimonialData.text,
			role: testimonialData.role,
			company: testimonialData.company,
			reply_to: testimonialData.email,
		},
		'YOUR_PUBLIC_KEY',
	);

	// Option 2: Store in a database (e.g., MongoDB)
	// Option 3: Use a form service like Formspree
	// Option 4: Create a simple API route in Next.js
};
