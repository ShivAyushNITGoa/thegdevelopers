import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '../components/SkipLink';

describe('SkipLink', () => {
  it('renders correctly with required props', () => {
    render(<SkipLink id="main-content">Skip to main content</SkipLink>);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
  
  it('applies custom className', () => {
    render(
      <SkipLink id="main-navigation" className="custom-class">
        Skip to navigation
      </SkipLink>
    );
    
    const skipLink = screen.getByRole('link', { name: /skip to navigation/i });
    expect(skipLink).toHaveClass('custom-class');
  });
  
  it('is visually hidden by default but becomes visible on focus', () => {
    render(<SkipLink id="main-content">Skip to main content</SkipLink>);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    
    // Check that it has the sr-only class (visually hidden)
    expect(skipLink).toHaveClass('sr-only');
    
    // Focus the link
    skipLink.focus();
    
    // Check that it has the focus:not-sr-only class (becomes visible on focus)
    // Note: This is a simplified test since Jest doesn't fully support CSS :focus pseudo-classes
    // In a real app, you'd use something like @testing-library/user-event to simulate focus
    expect(skipLink).toHaveAttribute('class', expect.stringContaining('focus:not-sr-only'));
  });
}); 