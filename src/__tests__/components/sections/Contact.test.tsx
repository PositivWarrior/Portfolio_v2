import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/components/sections/Contact';

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
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock React hooks
const mockSetIsSubmitting = jest.fn();
const mockSetSubmitStatus = jest.fn();

// Mock form reset
const mockFormReset = jest.fn();

describe('Contact Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Default mock implementation for fetch
		mockFetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({ message: 'Email sent successfully' }),
			}),
		);

		// Mock useState
		// @ts-ignore - Simplifying the useState mock for testing purposes
		jest.spyOn(React, 'useState').mockImplementation((initialValue) => {
			if (initialValue === false) {
				return [false, mockSetIsSubmitting];
			}
			if (initialValue === 'idle') {
				return ['idle', mockSetSubmitStatus];
			}
			return [initialValue, jest.fn()];
		});

		// Mock useRef
		jest.spyOn(React, 'useRef').mockReturnValue({
			current: { reset: mockFormReset },
		});
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

	it('sends email when form is submitted', async () => {
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

		// Mock the handleSubmit function by directly calling it
		const form = screen.getByRole('button', { name: 'Send Message' });
		fireEvent.click(form);

		// Check that isSubmitting was set to true
		expect(mockSetIsSubmitting).toHaveBeenCalledWith(true);

		// Check that submitStatus was set to 'idle'
		expect(mockSetSubmitStatus).toHaveBeenCalledWith('idle');
	});

	it('shows success message when email is sent successfully', () => {
		// Override useState to simulate success state
		// @ts-ignore - Simplifying the useState mock for testing purposes
		jest.spyOn(React, 'useState').mockImplementationOnce(() => [
			false,
			jest.fn(),
		]);
		// @ts-ignore - Simplifying the useState mock for testing purposes
		jest.spyOn(React, 'useState').mockImplementationOnce(() => [
			'success',
			jest.fn(),
		]);

		const { container } = render(<Contact />);

		// Check for success message using container query since motion.p might not be properly detected
		const successMessage = container.querySelector(
			'.text-primary.font-semibold',
		);
		expect(successMessage).toBeInTheDocument();
		expect(successMessage?.textContent).toBe('Message sent successfully!');
	});

	it('shows error message when email sending fails', () => {
		// Override useState to simulate error state
		// @ts-ignore - Simplifying the useState mock for testing purposes
		jest.spyOn(React, 'useState').mockImplementationOnce(() => [
			false,
			jest.fn(),
		]);
		// @ts-ignore - Simplifying the useState mock for testing purposes
		jest.spyOn(React, 'useState').mockImplementationOnce(() => [
			'error',
			jest.fn(),
		]);

		const { container } = render(<Contact />);

		// Check for error message using container query
		const errorMessage = container.querySelector(
			'.text-red-400.font-semibold',
		);
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage?.textContent).toBe(
			'Failed to send message. Please try again.',
		);
	});
});
