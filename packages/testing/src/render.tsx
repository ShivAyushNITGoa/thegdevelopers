import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Define a type for the wrapper providers
interface ProvidersProps {
  children: React.ReactNode;
}

// Create a function to wrap components with all necessary providers
export const AllProviders = ({ children }: ProvidersProps) => {
  // Add any providers that should wrap all components in tests
  // For example: ThemeProvider, AuthProvider, etc.
  return (
    <>
      {children}
    </>
  );
};

// Custom render function that includes the AllProviders wrapper
export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method with our custom render
export { customRender as render }; 