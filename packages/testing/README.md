# Testing Package

This package provides testing utilities for The GDevelopers Portal applications.

## Features

- Custom render function with providers
- Mock API utilities
- Hook testing utilities
- Form testing helpers
- Jest configuration
- Test setup with mocks for Next.js, IntersectionObserver, etc.

## Installation

This package is part of the monorepo and is available as a workspace package:

```bash
npm install testing
```

## Usage

### Basic Component Testing

```tsx
import { render, screen } from 'testing';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

### API Mocking

```tsx
import { createMockServer, createMockHandler } from 'testing';

const handlers = [
  createMockHandler('/api/users', { users: [] }),
  createMockHandler('/api/posts', { posts: [] }, { method: 'post' }),
];

// This will automatically set up beforeAll, afterEach, and afterAll hooks
createMockServer(handlers);
```

### Hook Testing

```tsx
import { renderHookWithProviders } from 'testing';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('returns the expected value', () => {
    const { result } = renderHookWithProviders(() => useMyHook());
    expect(result.current).toBe('expected value');
  });
});
```

### Form Testing

```tsx
import { render, fillField, submitForm } from 'testing';
import { MyForm } from './MyForm';

describe('MyForm', () => {
  it('submits the form with the correct values', async () => {
    render(<MyForm onSubmit={jest.fn()} />);
    
    await fillField('Name', 'John Doe');
    await fillField('Email', 'john@example.com');
    await submitForm('Submit');
    
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
```

## API Reference

### Rendering

- `render`: Custom render function that includes all providers
- `AllProviders`: Provider wrapper for testing

### Mock API

- `createMockHandler`: Creates a mock API handler
- `createMockServer`: Creates a mock API server
- `createMockErrorHandler`: Creates a mock API error handler
- `createMockResponse`: Creates a mock API response
- `createMockErrorResponse`: Creates a mock API error response

### Hook Testing

- `renderHookWithProviders`: Renders a hook with all providers
- `waitForHookToResolve`: Waits for a hook result to satisfy a condition
- `createHookTestContext`: Creates a test context for a hook with state

### Form Testing

- `fillField`: Fills in a form field
- `selectOption`: Selects an option from a select field
- `toggleCheckbox`: Checks or unchecks a checkbox
- `submitForm`: Submits a form
- `waitForValidationError`: Waits for form validation errors to appear
- `fillForm`: Fills in a complete form with the given values
- `waitForFormSuccess`: Waits for a form to be submitted successfully 