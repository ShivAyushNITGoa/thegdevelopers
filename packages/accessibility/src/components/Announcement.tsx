"use client";

import React, { useEffect, useState } from 'react';

interface AnnouncementProps {
  children: React.ReactNode;
  politeness?: 'polite' | 'assertive';
  timeout?: number;
}

/**
 * Announcement component for screen readers
 * 
 * This component creates a visually hidden announcement that is read by screen readers.
 * It supports both polite and assertive announcements and can automatically clear
 * the announcement after a specified timeout.
 */
export function Announcement({ 
  children, 
  politeness = 'polite',
  timeout = 5000 
}: AnnouncementProps) {
  const [message, setMessage] = useState<React.ReactNode>(children);
  
  useEffect(() => {
    setMessage(children);
    
    // Clear announcement after timeout for one-time announcements
    if (timeout > 0 && children) {
      const timerId = setTimeout(() => {
        setMessage('');
      }, timeout);
      
      return () => clearTimeout(timerId);
    }
  }, [children, timeout]);
  
  // Don't render anything if there's no message
  if (!message) {
    return null;
  }
  
  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
      role={politeness === 'assertive' ? 'alert' : 'status'}
    >
      {message}
    </div>
  );
} 