import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the next/font
jest.mock('next/font/google', () => ({
	Dancing_Script: () => ({ className: 'mocked-dancing-script' }),
	Eagle_Lake: () => ({ className: 'mocked-eagle-lake' }),
}));

// Mock Typewriter component
jest.mock('typewriter-effect', () => ({
	__esModule: true,
	default: (props: any) => <div>Typewriter Mock</div>,
}));

// Mock the components that use client-side functionality
jest.mock('@/components/Navigation', () => () => (
	<div data-testid="navigation">Navigation Mock</div>
));
jest.mock('@/components/sections/About', () => () => (
	<div data-testid="about">About Section Mock</div>
));
jest.mock('@/components/sections/Projects', () => () => (
	<div data-testid="projects">Projects Section Mock</div>
));
jest.mock('@/components/sections/Testimonials', () => () => (
	<div data-testid="testimonials">Testimonials Section Mock</div>
));
jest.mock('@/components/sections/Contact', () => () => (
	<div data-testid="contact">Contact Section Mock</div>
));

describe('Home Page', () => {
	it('renders all major sections', () => {
		render(<Home />);

		// Check for mocked components
		expect(screen.getByTestId('navigation')).toBeInTheDocument();
		expect(screen.getByTestId('about')).toBeInTheDocument();
		expect(screen.getByTestId('projects')).toBeInTheDocument();
		expect(screen.getByTestId('testimonials')).toBeInTheDocument();
		expect(screen.getByTestId('contact')).toBeInTheDocument();
	});

	it('renders the hero section with appropriate content', () => {
		render(<Home />);

		// Check for the hero content
		expect(screen.getByText('Kacper Margol')).toBeInTheDocument();
		expect(screen.getByText('View My Work')).toBeInTheDocument();
		expect(screen.getByText('Typewriter Mock')).toBeInTheDocument();
	});
});
