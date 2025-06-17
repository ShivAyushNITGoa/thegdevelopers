// Generate a random session ID
export const generateSessionId = (): string => {
  // Check if session ID already exists in storage
  if (typeof window !== 'undefined') {
    const existingSessionId = sessionStorage.getItem('analytics_session_id');
    if (existingSessionId) {
      return existingSessionId;
    }
    
    // Generate new session ID
    const newSessionId = `session_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('analytics_session_id', newSessionId);
    return newSessionId;
  }
  
  return `session_${Math.random().toString(36).substring(2, 15)}`;
};

// Generate or retrieve a user ID
export const generateUserId = (): string => {
  // Check if user ID already exists in storage
  if (typeof window !== 'undefined') {
    const existingUserId = localStorage.getItem('analytics_user_id');
    if (existingUserId) {
      return existingUserId;
    }
    
    // Generate new user ID
    const newUserId = `user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('analytics_user_id', newUserId);
    return newUserId;
  }
  
  return `user_${Math.random().toString(36).substring(2, 15)}`;
};

// Check if the current path should be excluded from tracking
export const shouldExcludePath = (path: string, excludePatterns: string[] = []): boolean => {
  if (!path || !excludePatterns.length) return false;
  
  return excludePatterns.some(pattern => {
    // Convert pattern to regex
    const regexPattern = new RegExp(pattern.replace(/\*/g, '.*'));
    return regexPattern.test(path);
  });
};

// Get browser and OS information
export const getBrowserInfo = (): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {
      browser: 'unknown',
      os: 'unknown',
      deviceType: 'unknown',
    };
  }
  
  const userAgent = window.navigator.userAgent;
  
  // Detect browser
  let browser = 'unknown';
  if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
  else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) browser = 'Internet Explorer';
  else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
  
  // Detect OS
  let os = 'unknown';
  if (userAgent.indexOf('Windows') > -1) os = 'Windows';
  else if (userAgent.indexOf('Mac') > -1) os = 'MacOS';
  else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
  else if (userAgent.indexOf('Android') > -1) os = 'Android';
  else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) os = 'iOS';
  
  // Detect device type
  let deviceType = 'desktop';
  if (userAgent.indexOf('Mobile') > -1) deviceType = 'mobile';
  else if (userAgent.indexOf('Tablet') > -1 || userAgent.indexOf('iPad') > -1) deviceType = 'tablet';
  
  return {
    browser,
    os,
    deviceType,
  };
};

// Get page performance metrics
export const getPerformanceMetrics = (): Record<string, number> => {
  if (typeof window === 'undefined' || !window.performance || !window.performance.timing) {
    return {
      loadTime: 0,
      domContentLoaded: 0,
      firstPaint: 0,
    };
  }
  
  const timing = window.performance.timing;
  
  return {
    loadTime: timing.loadEventEnd - timing.navigationStart,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    firstPaint: timing.responseEnd - timing.navigationStart,
  };
};

// Anonymize IP address by removing the last octet
export const anonymizeIp = (ip: string): string => {
  if (!ip) return '';
  
  const ipParts = ip.split('.');
  if (ipParts.length === 4) {
    // IPv4
    return `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.0`;
  } else if (ip.includes(':')) {
    // IPv6
    const ipv6Parts = ip.split(':');
    return `${ipv6Parts.slice(0, 4).join(':')}:0000:0000:0000:0000`;
  }
  
  return ip;
};

// Throttle function to limit the rate at which a function can fire
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}; 