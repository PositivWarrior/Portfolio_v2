import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/components/sections/Contact';

const MOCK_API_URL = 'https://mockapi.example.com';
const FALLBACK_API_URL = 'https://portfolio-v2-backend-email.onrender.com';

// Mock framer-motion
jest.mock('framer-motion', () => {
	const createMockComponent = (type: string) => {
		const Component = ({
			children,
			...props
		}: {
			children?: React.ReactNode;
			[key: string]: any;
		}) => {
			return React.createElement(type, props, children);
		};
		return Component;
	};

	return {
		motion: {
			div: createMockComponent('div'),
			span: createMockComponent('span'),
			h2: createMockComponent('h2'),
			h3: createMockComponent('h3'),
			p: createMockComponent('p'),
			form: createMockComponent('form'),
		},
		AnimatePresence: ({ children }: { children: React.ReactNode }) =>
			children,
	};
});

// Mock fetch function
global.fetch = jest.fn();

// Mock form reset from useRef
const mockFormReset = jest.fn();

describe('Contact Component', () => {
	let originalEnv: NodeJS.ProcessEnv;

	beforeEach(() => {
		jest.clearAllMocks();
		originalEnv = { ...process.env }; // Backup original environment variables

		// Default fetch mock for successful submission
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ message: 'Email sent successfully' }),
		} as Response);

		// Mock useRef specifically for formRef.current.reset
		jest.spyOn(React, 'useRef').mockReturnValue({
			current: {
				reset: mockFormReset,
				querySelector: jest.fn((selector) => {
					if (selector === '[name="user_name"]')
						return { value: 'Test User' };
					if (selector === '[name="user_email"]')
						return { value: 'test@example.com' };
					if (selector === '[name="message"]')
						return { value: 'Test message' };
					return null;
				}),
			} as unknown as HTMLFormElement, // Type assertion
		});
	});

	afterEach(() => {
		process.env = originalEnv; // Restore original environment variables
	});

	// Helper function to fill and submit form
	const fillAndSubmitForm = async () => {
		fireEvent.change(screen.getByLabelText('Name'), {
			target: { value: 'Test User' },
		});
		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByLabelText('Message'), {
			target: { value: 'Test message' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
		await waitFor(() => {});
	};

	it('renders the contact form correctly', () => {
		render(<Contact />);
		expect(screen.getByText('Get In Touch')).toBeInTheDocument();
		expect(screen.getByLabelText('Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Message')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Send Message' }),
		).toBeInTheDocument();
	});

	it('renders social links', () => {
		render(<Contact />);
		const socialLinks = screen.getAllByRole('link');
		expect(socialLinks.length).toBeGreaterThanOrEqual(2);
		const githubLink = socialLinks.find((link) =>
			link.getAttribute('href')?.includes('github.com'),
		);
		expect(githubLink).toBeInTheDocument();
		const linkedinLink = socialLinks.find((link) =>
			link.getAttribute('href')?.includes('linkedin.com'),
		);
		expect(linkedinLink).toBeInTheDocument();
	});

	describe('Form Submission with API URL from Environment Variable', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_EMAIL_API_URL = MOCK_API_URL;
		});

		it('sends form data to the environment variable API URL and shows success', async () => {
			render(<Contact />);
			await fillAndSubmitForm();

			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalledWith(
					`${MOCK_API_URL}/send`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name: 'Test User',
							email: 'test@example.com',
							message: 'Test message',
						}),
					},
				);
				expect(
					screen.getByText('Message sent successfully!'),
				).toBeInTheDocument();
				expect(mockFormReset).toHaveBeenCalled();
			});
		});

		it('shows error message if API call fails (env var)', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				json: () => Promise.resolve({ error: 'API error' }),
			} as Response);
			render(<Contact />);
			await fillAndSubmitForm();

			await waitFor(() => {
				expect(
					screen.getByText(
						'Failed to send message. Please try again.',
					),
				).toBeInTheDocument();
			});
		});

		it('shows error message if fetch itself throws an error (env var)', async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error('Network failed'),
			);
			render(<Contact />);
			await fillAndSubmitForm();

			await waitFor(() => {
				expect(
					screen.getByText(
						'Failed to send message. Please try again.',
					),
				).toBeInTheDocument();
			});
		});
	});

	describe('Form Submission with Fallback API URL', () => {
		beforeEach(() => {
			delete process.env.NEXT_PUBLIC_EMAIL_API_URL;
		});

		it('sends form data to the fallback API URL and shows success', async () => {
			render(<Contact />);
			await fillAndSubmitForm();

			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalledWith(
					`${FALLBACK_API_URL}/send`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name: 'Test User',
							email: 'test@example.com',
							message: 'Test message',
						}),
					},
				);
				expect(
					screen.getByText('Message sent successfully!'),
				).toBeInTheDocument();
				expect(mockFormReset).toHaveBeenCalled();
			});
		});
	});

	it('updates button text to "Sending..." during submission and then back', async () => {
		(global.fetch as jest.Mock).mockImplementationOnce(
			() =>
				new Promise((resolve) =>
					setTimeout(
						() =>
							resolve({
								// Simulate network delay
								ok: true,
								json: () =>
									Promise.resolve({
										message: 'Email sent successfully',
									}),
							} as Response),
						100,
					),
				),
		);

		process.env.NEXT_PUBLIC_EMAIL_API_URL = MOCK_API_URL;
		render(<Contact />);

		fireEvent.change(screen.getByLabelText('Name'), {
			target: { value: 'Test User' },
		});
		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByLabelText('Message'), {
			target: { value: 'Test message' },
		});

		const submitButton = screen.getByRole('button', {
			name: 'Send Message',
		});
		fireEvent.click(submitButton);

		expect(
			await screen.findByRole('button', { name: 'Sending...' }),
		).toBeDisabled();

		await waitFor(() => {
			expect(
				screen.getByRole('button', { name: 'Send Message' }),
			).not.toBeDisabled();
			expect(
				screen.getByText('Message sent successfully!'),
			).toBeInTheDocument();
		});
	});
});
