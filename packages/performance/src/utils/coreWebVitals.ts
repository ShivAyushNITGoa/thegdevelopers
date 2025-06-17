/**
 * Core Web Vitals tracking utilities
 * 
 * This module provides functions for tracking Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint): measures loading performance
 * - FID (First Input Delay): measures interactivity
 * - CLS (Cumulative Layout Shift): measures visual stability
 */

import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals';

export interface CoreWebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
  navigationType?: string;
}

type ReportHandler = (metric: CoreWebVitalMetric) => void;

/**
 * Track Core Web Vitals metrics
 * 
 * This function tracks the following Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint): measures loading performance
 * - FID (First Input Delay): measures interactivity
 * - CLS (Cumulative Layout Shift): measures visual stability
 * - FCP (First Contentful Paint): measures when first content is painted
 * - TTFB (Time to First Byte): measures time until first byte of response
 * - INP (Interaction to Next Paint): measures responsiveness
 * 
 * @param onReport - Callback function to handle the reported metrics
 */
export function trackCoreWebVitals(onReport: ReportHandler): void {
  // Helper function to determine rating
  const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    switch (name) {
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'FID':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FCP':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'TTFB':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      case 'INP':
        return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
      default:
        return 'needs-improvement';
    }
  };

  // Track Largest Contentful Paint
  onLCP((metric) => {
    onReport({
      name: 'LCP',
      value: metric.value,
      rating: getRating('LCP', metric.value),
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });

  // Track First Input Delay
  onFID((metric) => {
    onReport({
      name: 'FID',
      value: metric.value,
      rating: getRating('FID', metric.value),
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });

  // Track Cumulative Layout Shift
  onCLS((metric) => {
    onReport({
      name: 'CLS',
      value: metric.value,
      rating: getRating('CLS', metric.value),
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });

  // Track First Contentful Paint
  onFCP((metric) => {
    onReport({
      name: 'FCP',
      value: metric.value,
      rating: getRating('FCP', metric.value),
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });

  // Track Time to First Byte
  onTTFB((metric) => {
    onReport({
      name: 'TTFB',
      value: metric.value,
      rating: getRating('TTFB', metric.value),
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });

  // Track Interaction to Next Paint (experimental)
  onINP((metric) => {
    onReport({
      name: 'INP',
      value: metric.value,
      rating: getRating('INP', metric.value),
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });
} 