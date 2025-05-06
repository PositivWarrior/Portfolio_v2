# Portfolio Website Testing Strategy

This document outlines the testing approach for the portfolio website, explaining what tests we've implemented and how to run them.

## Testing Framework

The project uses the following testing tools:

-   **Jest**: As the main test runner and assertion library
-   **React Testing Library**: To test React components in a user-centric way
-   **jest-dom**: For additional DOM-based assertions

## Test Coverage

Tests have been implemented for the following components:

1. **Navigation Component**

    - Verifies the logo renders correctly
    - Checks that all navigation items are present
    - Tests the mobile menu functionality
    - Tests scroll event handling

2. **Contact Component**

    - Verifies the form renders correctly with all fields
    - Tests form submission with success and error cases
    - Verifies social links are present

3. **Projects Component**

    - Checks that all projects render correctly
    - Verifies project details like titles, descriptions, and tech stacks
    - Tests links to GitHub and live projects

4. **Main Page**
    - Tests that the page loads with all required sections
    - Verifies critical hero section content

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Mocks

To isolate components for testing, the following dependencies are mocked:

-   **framer-motion**: Animations are replaced with static elements
-   **next/image**: Simplified to render regular img tags
-   **typewriter-effect**: Replaced with a simple div
-   **emailjs**: Mocked to prevent actual API calls during tests

## Extending Tests

When adding new features to the website, follow these guidelines for adding tests:

1. Create test files in the `src/__tests__` directory, mirroring the structure of the source code
2. Test from a user's perspective - focus on what they would see and do
3. Mock external dependencies to keep tests fast and reliable
4. Test both happy paths and error cases

## Future Improvements

The current test suite could be extended with:

1. **E2E Tests**: Using Cypress or Playwright to test full user journeys
2. **Visual Regression Tests**: To ensure UI doesn't change unexpectedly
3. **Performance Tests**: For measuring loading times and animations
4. **Accessibility Tests**: To ensure the site is usable by everyone
