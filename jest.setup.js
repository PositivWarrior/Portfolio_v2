// Learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
	useRouter: () => ({
		push: jest.fn(),
		pathname: '/',
		route: '/',
		asPath: '/',
		query: {},
	}),
}));

// Mock next/image component
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
	const mockVariantProps = {
		initial: jest.fn(),
		animate: jest.fn(),
		exit: jest.fn(),
		variants: jest.fn(),
		transition: jest.fn(),
		whileHover: jest.fn(),
		whileTap: jest.fn(),
		whileInView: jest.fn(),
		viewport: jest.fn(),
	};

	const createMockComponent = (type) => {
		const Component = ({ children, ...props }) => {
			const omitProps = { ...props };
			// Convert object props to strings to avoid testing-library warnings
			Object.keys(omitProps).forEach((key) => {
				if (typeof omitProps[key] === 'object') {
					omitProps[key] = JSON.stringify(omitProps[key]);
				}
			});
			return React.createElement(type, omitProps, children);
		};
		return Component;
	};

	return {
		motion: {
			div: createMockComponent('div'),
			span: createMockComponent('span'),
			h1: createMockComponent('h1'),
			h2: createMockComponent('h2'),
			h3: createMockComponent('h3'),
			p: createMockComponent('p'),
			img: createMockComponent('img'),
			a: createMockComponent('a'),
			button: createMockComponent('button'),
			nav: createMockComponent('nav'),
			header: createMockComponent('header'),
			form: createMockComponent('form'),
			input: createMockComponent('input'),
			textarea: createMockComponent('textarea'),
			section: createMockComponent('section'),
			ul: createMockComponent('ul'),
			li: createMockComponent('li'),
		},
		AnimatePresence: ({ children }) => children,
		useAnimation: () => ({
			start: jest.fn(),
			stop: jest.fn(),
		}),
	};
});

// Mock typewriter-effect
jest.mock('typewriter-effect', () => ({
	__esModule: true,
	default: () => <div>Typewriter Effect Mock</div>,
}));
