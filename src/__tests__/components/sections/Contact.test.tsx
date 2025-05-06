import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/components/sections/Contact';
import emailjs from '@emailjs/browser';

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
	sendForm: jest.fn(() => Promise.resolve({ text: 'OK' })),
}));

// Mock React's useRef implementation
const mockUseRef = {
	current: {
		reset: jest.fn(),
	},
};

// Mock React's useRef
jest.spyOn(React, 'useRef').mockImplementation(() => mockUseRef);

describe('Contact Component', () => {
	beforeEach(() => {
		// Reset the mock before each test
		jest.clearAllMocks();
	});

	it('renders the contact form', () => {
		render(<Contact />);

		// Check heading
		expect(screen.getByText('Get In Touch')).toBeInTheDocument();

		// Check form inputs
		expect(screen.getByLabelText('Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Message')).toBeInTheDocument();

		// Check submit button
		expect(screen.getByText('Send Message')).toBeInTheDocument();
	});

	it('renders social links', () => {
		render(<Contact />);

		// Check for social links (using role since text might not be visible)
		const socialLinks = screen.getAllByRole('link');
		expect(socialLinks.length).toBeGreaterThanOrEqual(2); // At least GitHub and LinkedIn

		// Check GitHub link
		const githubLink = socialLinks.find((link) =>
			link.getAttribute('href')?.includes('github.com'),
		);
		expect(githubLink).toBeInTheDocument();

		// Check LinkedIn link
		const linkedinLink = socialLinks.find((link) =>
			link.getAttribute('href')?.includes('linkedin.com'),
		);
		expect(linkedinLink).toBeInTheDocument();
	});

	it('handles form submission successfully', async () => {
		// Mock successful emailjs response
		(emailjs.sendForm as jest.Mock).mockResolvedValue({ text: 'OK' });

		render(<Contact />);

		// Fill out the form
		fireEvent.change(screen.getByLabelText('Name'), {
			target: { value: 'Test User' },
		});
		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByLabelText('Message'), {
			target: { value: 'Test message' },
		});

		// Submit the form
		fireEvent.click(screen.getByText('Send Message'));

		// Check that emailjs was called
		expect(emailjs.sendForm).toHaveBeenCalled();

		// Wait for success message to appear
		await waitFor(() => {
			expect(
				screen.getByText('Message sent successfully!'),
			).toBeInTheDocument();
		});
	});

	it('handles form submission failure', async () => {
		// Mock failed emailjs response
		(emailjs.sendForm as jest.Mock).mockRejectedValue(
			new Error('Failed to send'),
		);

		render(<Contact />);

		// Fill out the form
		fireEvent.change(screen.getByLabelText('Name'), {
			target: { value: 'Test User' },
		});
		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByLabelText('Message'), {
			target: { value: 'Test message' },
		});

		// Submit the form
		fireEvent.click(screen.getByText('Send Message'));

		// Check that emailjs was called
		expect(emailjs.sendForm).toHaveBeenCalled();

		// Wait for error message to appear
		await waitFor(() => {
			expect(
				screen.getByText('Failed to send message. Please try again.'),
			).toBeInTheDocument();
		});
	});
});
