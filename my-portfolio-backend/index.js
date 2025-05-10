const express = require('express');
const cors = require('cors');
const postmark = require('postmark');
require('dotenv').config(); // To load .env variables locally

const app = express();

// Environment variables
const port = process.env.PORT || 3001; // Render will set PORT
const postmarkApiKey = process.env.POSTMARK_API_KEY;
const clientAllowedOrigin = process.env.CLIENT_ALLOWED_ORIGIN; // e.g., https://yourdomain.eu

// --- Middleware ---
// Enable CORS
if (!clientAllowedOrigin) {
	console.warn(
		'CLIENT_ALLOWED_ORIGIN is not set. CORS might not be configured correctly for production.',
	);
}
app.use(
	cors({
		origin: clientAllowedOrigin || '*', // Be specific in production
	}),
);

app.use(express.json()); // To parse JSON request bodies

// --- Basic Health Check Endpoint ---
app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

// --- Send Email Endpoint ---
app.post('/send', async (req, res) => {
	const { name, email, message } = req.body;

	// Validate input
	if (!name || !email || !message) {
		return res
			.status(400)
			.json({ error: 'Name, email, and message are required.' });
	}

	if (!postmarkApiKey) {
		console.error('Postmark API key is not configured on the server.');
		return res
			.status(500)
			.json({ error: 'Email service is not configured.' });
	}

	try {
		const client = new postmark.ServerClient(postmarkApiKey);

		const emailDetails = {
			From: 'contact@kacpermargol.eu', // Your verified Postmark sender signature
			To: 'contact@kacpermargol.eu', // Where you want to receive the contact form emails
			Subject: `New Contact Form Message from ${name}`,
			TextBody: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			HtmlBody: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Note: This message was sent via the contact form on your portfolio website.</em></p>
      `,
			ReplyTo: email,
			MessageStream: 'outbound', // Or your specific stream if you use others
		};

		const response = await client.sendEmail(emailDetails);
		console.log('Email sent successfully via Postmark:', response);
		res.status(200).json({ message: 'Email sent successfully!' });
	} catch (error) {
		console.error('Failed to send email via Postmark:', error);
		let errorMessage = 'Failed to send email.';
		if (error instanceof Error) {
			// For postmark.errors.PostmarkError or similar that have a message
			errorMessage = error.message;
		}
		// Postmark errors often have a response object with more details
		// if (error.response && error.response.data) {
		//   console.error('Postmark API Error Details:', error.response.data);
		// }
		res.status(500).json({
			error: 'Failed to send email.',
			details: errorMessage,
		});
	}
});

// --- Start Server ---
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	if (clientAllowedOrigin) {
		console.log(`CORS enabled for origin: ${clientAllowedOrigin}`);
	} else {
		console.log(
			'CORS allowing all origins (configure CLIENT_ALLOWED_ORIGIN for production)',
		);
	}
});
