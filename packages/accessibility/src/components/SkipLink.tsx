"use client";

import React from 'react';

interface SkipLinkProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SkipLink component for keyboard navigation
 * 
 * This component creates a skip link that allows keyboard users to bypass
 * navigation and jump directly to the main content or other important sections.
 * It's visually hidden until focused.
 */
export function SkipLink({ id, children, className = '' }: SkipLinkProps) {
  return (
    <a
      href={`#${id}`}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4
        focus:bg-white focus:text-black focus:border-2 focus:border-blue-600
        focus:top-2 focus:left-2 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${className}
      `}
    >
      {children}
    </a>
  );
} 