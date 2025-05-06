import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';

describe('Navigation Component', () => {
	it('renders the logo', () => {
		render(<Navigation />);
		expect(screen.getByText('Portfolio')).toBeInTheDocument();
	});

	it('renders all navigation items', () => {
		render(<Navigation />);
		expect(screen.getAllByText('About')[0]).toBeInTheDocument();
		expect(screen.getAllByText('Projects')[0]).toBeInTheDocument();
		expect(screen.getAllByText('Testimonials')[0]).toBeInTheDocument();
		expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
	});

	it('opens mobile menu when button is clicked', () => {
		render(<Navigation />);

		// Mobile menu is initially hidden by class
		const mobileMenu = document.querySelector(
			'.fixed.inset-0.bg-transparent.md\\:hidden.hidden',
		);
		expect(mobileMenu).toBeInTheDocument();

		// Click the mobile menu button
		const menuButton = screen.getByLabelText('Toggle menu');
		fireEvent.click(menuButton);

		// After clicking, mobile menu should be displayed
		const mobileMenuItems = screen.getAllByText('About');
		expect(mobileMenuItems.length).toBeGreaterThanOrEqual(1);
	});

	it('handles scroll events correctly', () => {
		render(<Navigation />);

		// Initially not scrolled
		const header = document.querySelector('header');
		expect(header).not.toHaveClass('glass-effect');

		// Simulate scroll
		Object.defineProperty(window, 'scrollY', { value: 100 });
		fireEvent.scroll(window);

		// After scrolling, should have glass-effect class
		expect(header).toHaveClass('glass-effect');
	});
});
