"use client";

import React, { useState, useEffect, useRef } from 'react';
import { mark, measure } from '../utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  style?: React.CSSProperties;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  sizes = '100vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const uniqueId = useRef(`img-${Math.random().toString(36).substring(2, 15)}`);

  // Handle image loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || priority) {
          // Mark the start of image loading
          mark(`${uniqueId.current}-start`);

          // Start loading the image
          if (imgRef.current) {
            imgRef.current.src = src;
            imgRef.current.loading = priority ? 'eager' : loading;
            
            // Disconnect the observer once the image starts loading
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src, priority, loading]);

  // Handle image loaded
  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);

    // Mark the end of image loading and measure the time
    mark(`${uniqueId.current}-end`);
    measure(`${uniqueId.current}-load-time`, `${uniqueId.current}-start`, `${uniqueId.current}-end`);

    // Call the onLoad callback if provided
    if (onLoad) {
      onLoad();
    }
  };

  // Handle image error
  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined;

    const widths = [width / 2, width, width * 2];
    return widths
      .map((w) => {
        const url = new URL(src, typeof window !== 'undefined' ? window.location.href : undefined);
        url.searchParams.set('w', Math.round(w).toString());
        url.searchParams.set('q', quality.toString());
        return `${url.toString()} ${Math.round(w)}w`;
      })
      .join(', ');
  };

  // Generate blur placeholder
  const blurStyle = placeholder === 'blur' && !isLoaded && blurDataURL
    ? {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${blurDataURL})`,
        filter: 'blur(20px)',
      }
    : {};

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        ...style,
      }}
    >
      <img
        ref={imgRef}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        srcSet={generateSrcSet()}
        style={{
          ...blurStyle,
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          width: '100%',
          height: '100%',
        }}
        {...rest}
      />

      {error && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666',
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
}; 