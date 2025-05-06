# Portfolio Testing Strategy

This directory contains tests for the Portfolio website to ensure it functions correctly and maintains a good user experience.

## Test Structure

The tests are organized by component type and mimic the directory structure of the source code:

-   `app/` - Tests for page components
-   `components/` - Tests for UI components
    -   `sections/` - Tests for section components

## Testing Approach

We use Jest with React Testing Library to test the components. Our testing strategy focuses on:

1. **Component Rendering**: Verifying components render correctly with all expected elements
2. **User Interactions**: Testing user interactions like form submissions and button clicks
3. **Responsiveness**: Ensuring mobile menu functionality works properly
4. **Integration**: Testing that components work together as expected

## Mocks

We mock several dependencies to isolate component testing:

-   `next/image`: Mocked to simplify image rendering
-   `framer-motion`: Mocked to render static components instead of animations
-   `typewriter-effect`: Mocked with a simple placeholder
-   `next/router`: Mocked to simulate routing
-   `@emailjs/browser`: Mocked to test form submissions without making real API calls

## Running Tests

Tests can be run with the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage
```
