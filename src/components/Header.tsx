import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showCTA?: boolean;
  imageUrl?: string;
  height?: 'small' | 'medium' | 'large';
}

export default function Header({
  title,
  subtitle,
  showCTA = true,
  imageUrl,
  height = 'medium',
}: HeaderProps) {
  const heightClasses = {
    small: 'py-16',
    medium: 'py-24',
    large: 'py-32',
  };

  return (
    <div
      className={`relative ${heightClasses[height]} bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden dark:from-blue-800 dark:to-indigo-900`}
    >
      {imageUrl && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          {subtitle && <p className="text-xl md:text-2xl text-white/80 mb-8">{subtitle}</p>}
          {showCTA && (
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium shadow-md transition duration-200"
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition duration-200"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 