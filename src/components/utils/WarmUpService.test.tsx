import React from 'react';
import { render, waitFor } from '@testing-library/react';
import WarmUpService from './WarmUpService'; // Assuming the test file is in the same directory or adjust path

const MOCK_API_URL = 'https://mockapi.example.com';
const FALLBACK_API_URL = 'https://portfolio-v2-backend-email.onrender.com';

// Mock fetch
global.fetch = jest.fn(() =>
	Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response),
);

describe('WarmUpService Component', () => {
	let originalEnv: NodeJS.ProcessEnv;

	beforeEach(() => {
		jest.clearAllMocks();
		originalEnv = { ...process.env }; // Backup original environment variables
	});

	afterEach(() => {
		process.env = originalEnv; // Restore original environment variables
	});

	it('should call fetch with the environment variable URL if set', async () => {
		process.env.NEXT_PUBLIC_EMAIL_API_URL = MOCK_API_URL;
		render(<WarmUpService />);
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				`${MOCK_API_URL}/health`,
				{ method: 'GET' },
			);
		});
	});

	it('should call fetch with the fallback URL if environment variable is not set', async () => {
		delete process.env.NEXT_PUBLIC_EMAIL_API_URL;
		render(<WarmUpService />);
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				`${FALLBACK_API_URL}/health`,
				{ method: 'GET' },
			);
		});
	});

	it('should not throw if fetch fails', async () => {
		(global.fetch as jest.Mock).mockImplementationOnce(() =>
			Promise.reject('Network error'),
		);
		delete process.env.NEXT_PUBLIC_EMAIL_API_URL;
		// We are testing that no error is thrown during render and useEffect
		expect(() => render(<WarmUpService />)).not.toThrow();
		// Wait for the fetch call to be made and potentially fail
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledTimes(1);
		});
	});

	it('should not call fetch if NEXT_PUBLIC_EMAIL_API_URL is an empty string and no fallback was coded (current code has fallback)', async () => {
		// This test reflects the component's current logic where an empty env var would still lead to fallback.
		// If the component were changed to treat empty string differently, this test would need adjustment.
		process.env.NEXT_PUBLIC_EMAIL_API_URL = '';
		render(<WarmUpService />);
		await waitFor(() => {
			// Current component logic: empty string for env var results in using the hardcoded fallback.
			expect(global.fetch).toHaveBeenCalledWith(
				`${FALLBACK_API_URL}/health`,
				{ method: 'GET' },
			);
		});
	});
});
