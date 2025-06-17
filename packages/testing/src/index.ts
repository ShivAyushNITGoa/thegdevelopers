// Export setup
export * from './setup';

// Export render utilities
export * from './render';

// Export mock API utilities
export * from './mockApi';

// Export hook testing utilities
// Temporarily commenting out due to module error
// export * from './hookUtils';

// Export form testing helpers
export * from './formHelpers';

// Re-export testing-library
export * from '@testing-library/react';
// Export specific items from jest-dom since it's not a module
export { 
  toBeInTheDocument,
  toBeVisible,
  toHaveTextContent,
  toHaveValue,
  toBeChecked,
  toBeDisabled,
  toHaveClass,
  toHaveFocus,
  toBeEmpty,
  toContainElement,
  toContainHTML,
  toHaveAttribute,
  toHaveStyle
} from '@testing-library/jest-dom/matchers';
export * from '@testing-library/user-event';