import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';

// Get API key from environment variable
const postmarkApiKey =
	process.env.POSTMARK_API_KEY || '3978cfc4-38aa-43f6-84fb-8f653e1fe457';

// Force dynamic route handling
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	try {
		const { name, email, message } = await request.json();
		console.log('Received form data:', { name, email, message });

		// Validate the input
		if (!name || !email || !message) {
			console.log('Validation failed:', { name, email, message });
			return NextResponse.json(
				{ error: 'Name, email, and message are required' },
				{ status: 400 },
			);
		}

		// Create the email using Postmark
		try {
			console.log('Attempting to send email with Postmark...');

			// During pending approval, sender and recipient must have the same domain
			const response = await fetch('https://api.postmarkapp.com/email', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-Postmark-Server-Token': postmarkApiKey,
				},
				body: JSON.stringify({
					From: 'contact@kacpermargol.eu', // Your verified professional email
					To: 'contact@kacpermargol.eu', // Using the same email as sender during pending approval
					Subject: `New Contact Form Message from ${name}`,
					TextBody: `
Name: ${name}
Email: ${email}
Message: ${message}

Note: This message was sent via the contact form on your portfolio website.
					`,
					HtmlBody: `
<h2>New Contact Form Message</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
<p><em>Note: This message was sent via the contact form on your portfolio website.</em></p>
					`,
					ReplyTo: email, // This allows you to reply directly to the sender
					MessageStream: 'outbound', // Default message stream in Postmark
				}),
			});

			const responseData = await response.json();
			console.log('Postmark direct API response:', responseData);

			if (response.ok) {
				return NextResponse.json(
					{ message: 'Email sent successfully' },
					{ status: 200 },
				);
			} else {
				throw new Error(
					`Postmark API error: ${
						responseData.Message || 'Unknown error'
					}`,
				);
			}
		} catch (sendError: any) {
			console.error('Postmark error details:', {
				message: sendError.message,
				code: sendError.code,
				statusCode: sendError.statusCode,
				response: sendError.response,
			});

			return NextResponse.json(
				{ error: 'Failed to send email', details: sendError.message },
				{ status: 500 },
			);
		}
	} catch (error: any) {
		console.error('Detailed error processing request:', error);
		return NextResponse.json(
			{ error: 'Failed to process request', details: error.message },
			{ status: 500 },
		);
	}
}
