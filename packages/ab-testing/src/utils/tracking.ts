import { ABTestEvent } from '../types';

/**
 * Track an A/B test exposure event
 * 
 * @param event - Event data
 * @param customTracker - Optional custom tracking function
 */
export function trackExposure(
  event: ABTestEvent,
  customTracker?: (event: ABTestEvent) => void
): void {
  const exposureEvent: ABTestEvent = {
    ...event,
    type: 'exposure',
    timestamp: event.timestamp || Date.now(),
  };
  
  // Use custom tracker if provided
  if (customTracker) {
    customTracker(exposureEvent);
    return;
  }
  
  // Default tracking
  sendToAnalytics(exposureEvent);
}

/**
 * Track an A/B test conversion event
 * 
 * @param event - Event data
 * @param customTracker - Optional custom tracking function
 */
export function trackConversion(
  event: ABTestEvent,
  customTracker?: (event: ABTestEvent) => void
): void {
  const conversionEvent: ABTestEvent = {
    ...event,
    type: 'conversion',
    timestamp: event.timestamp || Date.now(),
  };
  
  // Use custom tracker if provided
  if (customTracker) {
    customTracker(conversionEvent);
    return;
  }
  
  // Default tracking
  sendToAnalytics(conversionEvent);
}

/**
 * Track a custom A/B test event
 * 
 * @param event - Event data
 * @param customTracker - Optional custom tracking function
 */
export function trackCustomEvent(
  event: ABTestEvent,
  customTracker?: (event: ABTestEvent) => void
): void {
  const customEvent: ABTestEvent = {
    ...event,
    type: 'custom',
    timestamp: event.timestamp || Date.now(),
  };
  
  // Use custom tracker if provided
  if (customTracker) {
    customTracker(customEvent);
    return;
  }
  
  // Default tracking
  sendToAnalytics(customEvent);
}

/**
 * Send event to analytics
 * 
 * @param event - Event data
 */
function sendToAnalytics(event: ABTestEvent): void {
  // Send to data layer for Google Analytics
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: `ab_test_${event.type}`,
      ab_test_id: event.testId,
      ab_variant_id: event.variantId,
      ab_event_name: event.name,
      ab_event_value: event.value,
      ab_event_metadata: event.metadata,
      ab_event_timestamp: event.timestamp,
    });
  }
  
  // Send to server
  if (typeof fetch !== 'undefined') {
    try {
      fetch('/api/analytics/ab-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch(error => {
        console.error('Error sending A/B test event to server:', error);
      });
    } catch (error) {
      console.error('Error sending A/B test event to server:', error);
    }
  }
}

// Add type definition for window.dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
} 