import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '@/components/sections/Projects';

// Mock next/image
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => <img {...props} />,
}));

describe('Projects Component', () => {
	it('renders the section heading', () => {
		render(<Projects />);
		expect(screen.getByText('Featured Projects')).toBeInTheDocument();
	});

	it('renders all projects', () => {
		render(<Projects />);

		// Check if all project titles are rendered
		expect(screen.getByText('CV Mentor')).toBeInTheDocument();
		expect(screen.getByText('FotoDS')).toBeInTheDocument();
		expect(screen.getByText('GawlakTrans')).toBeInTheDocument();
		expect(screen.getByText('LukMeg')).toBeInTheDocument();
		expect(screen.getByText('MKDoc')).toBeInTheDocument();
		expect(screen.getByText('Marblogger')).toBeInTheDocument();
	});

	it('renders project descriptions', () => {
		render(<Projects />);

		// Check if descriptions are rendered
		expect(
			screen.getByText(
				'AI-powered resume builder to create professional resumes quickly and easily.',
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				'Personolized photographer portfolio with admin panel',
			),
		).toBeInTheDocument();
	});

	it('renders project tags', () => {
		render(<Projects />);

		// Check some tags across different projects using getAllByText since tags appear multiple times
		const nextjsTags = screen.getAllByText('Next.js');
		expect(nextjsTags.length).toBeGreaterThan(0);

		const reactTags = screen.getAllByText('React');
		expect(reactTags.length).toBeGreaterThan(0);

		const tailwindTags = screen.getAllByText('Tailwind CSS');
		expect(tailwindTags.length).toBeGreaterThan(0);

		const openAITags = screen.getAllByText('OpenAI');
		expect(openAITags.length).toBeGreaterThan(0);

		const mongoDBTags = screen.getAllByText('MongoDB');
		expect(mongoDBTags.length).toBeGreaterThan(0);
	});

	it('renders project links', () => {
		render(<Projects />);

		// Check for GitHub and live links
		const links = screen.getAllByRole('link');

		// GitHub links
		const githubLinks = links.filter((link) =>
			link.getAttribute('href')?.includes('github.com'),
		);
		expect(githubLinks.length).toBeGreaterThanOrEqual(6); // 6 projects

		// Live links
		const liveLinks = links.filter(
			(link) => !link.getAttribute('href')?.includes('github.com'),
		);
		expect(liveLinks.length).toBeGreaterThanOrEqual(6); // 6 projects
	});
});
