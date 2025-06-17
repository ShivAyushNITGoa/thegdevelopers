import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { AccessibilityProvider } from '../context/AccessibilityProvider';

// Mock the localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('DarkModeToggle', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });
  
  it('renders correctly with default props', () => {
    render(
      <AccessibilityProvider>
        <DarkModeToggle />
      </AccessibilityProvider>
    );
    
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });
  
  it('toggles dark mode when clicked', () => {
    render(
      <AccessibilityProvider>
        <DarkModeToggle />
      </AccessibilityProvider>
    );
    
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    
    // Initial state should be light mode
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    
    // Click to toggle to dark mode
    fireEvent.click(button);
    
    // Should now be in dark mode
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    
    // Click to toggle back to light mode
    fireEvent.click(button);
    
    // Should now be back in light mode
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });
  
  it('renders with icon only', () => {
    render(
      <AccessibilityProvider>
        <DarkModeToggle iconOnly={true} />
      </AccessibilityProvider>
    );
    
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByText('Dark Mode')).not.toBeInTheDocument();
    expect(screen.queryByText('Light Mode')).not.toBeInTheDocument();
  });
  
  it('renders without icon', () => {
    render(
      <AccessibilityProvider>
        <DarkModeToggle showIcon={false} />
      </AccessibilityProvider>
    );
    
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    // Check that SVG icon is not present
    expect(button.querySelector('svg')).toBeNull();
  });
  
  it('applies custom className', () => {
    render(
      <AccessibilityProvider>
        <DarkModeToggle className="custom-class" />
      </AccessibilityProvider>
    );
    
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toHaveClass('custom-class');
  });
}); 