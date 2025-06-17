"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  AnalyticsConfig,
  AnalyticsEvent,
  AnalyticsProvider as AnalyticsProviderInterface,
  ClickEvent,
  CustomEvent,
  DownloadEvent,
  ErrorEvent,
  EventType,
  FormSubmitEvent,
  PageViewEvent,
  SearchEvent,
  VideoEvent,
} from './types';
import { generateSessionId, generateUserId } from './utils';

// Default configuration
const defaultConfig: AnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
  anonymizeIp: true,
  excludePaths: ['/api/', '/admin/'],
  samplingRate: 100, // 100%
  providers: {
    googleAnalytics: false,
    plausible: false,
    custom: true,
  },
};

// Create analytics context
interface AnalyticsContextValue {
  trackPageView: (metadata?: Record<string, any>) => void;
  trackClick: (metadata?: Record<string, any>) => void;
  trackFormSubmit: (formId: string, success: boolean, metadata?: Record<string, any>) => void;
  trackSearch: (query: string, resultsCount?: number, metadata?: Record<string, any>) => void;
  trackDownload: (fileName: string, fileType: string, metadata?: Record<string, any>) => void;
  trackVideoPlay: (videoId: string, metadata?: Record<string, any>) => void;
  trackVideoComplete: (videoId: string, metadata?: Record<string, any>) => void;
  trackError: (errorMessage: string, errorCode?: string, metadata?: Record<string, any>) => void;
  trackCustomEvent: (name: string, metadata?: Record<string, any>) => void;
  isEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
  config?: Partial<AnalyticsConfig>;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  config: userConfig,
}) => {
  const [provider, setProvider] = useState<AnalyticsProviderInterface | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [config, setConfig] = useState<AnalyticsConfig>({ ...defaultConfig, ...userConfig });
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics provider
  useEffect(() => {
    const initializeProvider = async () => {
      if (!config.enabled) return;

      // Check if path should be excluded
      if (config.excludePaths?.some((path) => pathname?.includes(path))) {
        return;
      }

      // Apply sampling rate
      if (config.samplingRate && config.samplingRate < 100) {
        const randomValue = Math.floor(Math.random() * 100);
        if (randomValue >= config.samplingRate) {
          return;
        }
      }

      try {
        // Load provider dynamically to avoid SSR issues
        const { CustomAnalyticsProvider } = await import('./providers/custom');
        const customProvider = new CustomAnalyticsProvider();
        await customProvider.initialize(config);
        setProvider(customProvider);

        // Generate or retrieve session ID and user ID
        const newSessionId = generateSessionId();
        const newUserId = generateUserId();
        setSessionId(newSessionId);
        setUserId(newUserId);

        if (config.debug) {
          console.log('Analytics initialized with config:', config);
        }
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };

    initializeProvider();
  }, [config, pathname]);

  // Track page views
  useEffect(() => {
    if (!provider || !config.enabled || !pathname) return;

    // Check if path should be excluded
    if (config.excludePaths?.some((path) => pathname.includes(path))) {
      return;
    }

    const trackInitialPageView = async () => {
      const pageViewEvent: PageViewEvent = {
        type: EventType.PAGE_VIEW,
        timestamp: Date.now(),
        path: pathname + (searchParams ? `?${searchParams.toString()}` : ''),
        title: document.title,
        userId,
        sessionId,
      };

      try {
        await provider.trackPageView(pageViewEvent);
        if (config.debug) {
          console.log('Page view tracked:', pageViewEvent);
        }
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Small delay to ensure document title is set
    const timeoutId = setTimeout(trackInitialPageView, 100);
    return () => clearTimeout(timeoutId);
  }, [provider, config.enabled, pathname, searchParams, userId, sessionId, config.excludePaths, config.debug]);

  // Create base event with common properties
  const createBaseEvent = (type: EventType, metadata?: Record<string, any>): AnalyticsEvent => ({
    type,
    timestamp: Date.now(),
    path: pathname + (searchParams ? `?${searchParams.toString()}` : ''),
    userId,
    sessionId,
    metadata,
  });

  // Track click events
  const trackClick = async (metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const clickEvent: ClickEvent = {
      ...createBaseEvent(EventType.CLICK, metadata),
      elementId: metadata?.elementId,
      elementClass: metadata?.elementClass,
      elementText: metadata?.elementText,
      targetUrl: metadata?.targetUrl,
    };

    try {
      await provider.trackClick(clickEvent);
      if (config.debug) {
        console.log('Click tracked:', clickEvent);
      }
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  // Track page view events
  const trackPageView = async (metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const pageViewEvent: PageViewEvent = {
      ...createBaseEvent(EventType.PAGE_VIEW, metadata),
      title: document.title,
      loadTime: metadata?.loadTime,
    };

    try {
      await provider.trackPageView(pageViewEvent);
      if (config.debug) {
        console.log('Page view tracked:', pageViewEvent);
      }
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  // Track form submit events
  const trackFormSubmit = async (formId: string, success: boolean, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const formSubmitEvent: FormSubmitEvent = {
      ...createBaseEvent(EventType.FORM_SUBMIT, metadata),
      formId,
      formName: metadata?.formName,
      success,
      errorMessage: metadata?.errorMessage,
    };

    try {
      await provider.trackFormSubmit(formSubmitEvent);
      if (config.debug) {
        console.log('Form submit tracked:', formSubmitEvent);
      }
    } catch (error) {
      console.error('Failed to track form submit:', error);
    }
  };

  // Track search events
  const trackSearch = async (query: string, resultsCount?: number, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const searchEvent: SearchEvent = {
      ...createBaseEvent(EventType.SEARCH, metadata),
      query,
      resultsCount,
    };

    try {
      await provider.trackSearch(searchEvent);
      if (config.debug) {
        console.log('Search tracked:', searchEvent);
      }
    } catch (error) {
      console.error('Failed to track search:', error);
    }
  };

  // Track download events
  const trackDownload = async (fileName: string, fileType: string, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const downloadEvent: DownloadEvent = {
      ...createBaseEvent(EventType.DOWNLOAD, metadata),
      fileName,
      fileType,
      fileSize: metadata?.fileSize,
    };

    try {
      await provider.trackDownload(downloadEvent);
      if (config.debug) {
        console.log('Download tracked:', downloadEvent);
      }
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  };

  // Track video play events
  const trackVideoPlay = async (videoId: string, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const videoEvent: VideoEvent = {
      ...createBaseEvent(EventType.VIDEO_PLAY, metadata),
      videoId,
      videoTitle: metadata?.videoTitle,
      videoDuration: metadata?.videoDuration,
      videoProgress: metadata?.videoProgress,
    };

    try {
      await provider.trackVideo(videoEvent);
      if (config.debug) {
        console.log('Video play tracked:', videoEvent);
      }
    } catch (error) {
      console.error('Failed to track video play:', error);
    }
  };

  // Track video complete events
  const trackVideoComplete = async (videoId: string, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const videoEvent: VideoEvent = {
      ...createBaseEvent(EventType.VIDEO_COMPLETE, metadata),
      videoId,
      videoTitle: metadata?.videoTitle,
      videoDuration: metadata?.videoDuration,
      videoProgress: metadata?.videoProgress,
    };

    try {
      await provider.trackVideo(videoEvent);
      if (config.debug) {
        console.log('Video complete tracked:', videoEvent);
      }
    } catch (error) {
      console.error('Failed to track video complete:', error);
    }
  };

  // Track error events
  const trackError = async (errorMessage: string, errorCode?: string, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const errorEvent: ErrorEvent = {
      ...createBaseEvent(EventType.ERROR, metadata),
      errorMessage,
      errorCode,
      errorStack: metadata?.errorStack,
    };

    try {
      await provider.trackError(errorEvent);
      if (config.debug) {
        console.log('Error tracked:', errorEvent);
      }
    } catch (error) {
      console.error('Failed to track error:', error);
    }
  };

  // Track custom events
  const trackCustomEvent = async (name: string, metadata?: Record<string, any>) => {
    if (!provider || !config.enabled) return;

    const customEvent: CustomEvent = {
      ...createBaseEvent(EventType.CUSTOM, metadata),
      name,
      ...metadata,
    };

    try {
      await provider.trackCustom(customEvent);
      if (config.debug) {
        console.log('Custom event tracked:', customEvent);
      }
    } catch (error) {
      console.error('Failed to track custom event:', error);
    }
  };

  const contextValue: AnalyticsContextValue = {
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackSearch,
    trackDownload,
    trackVideoPlay,
    trackVideoComplete,
    trackError,
    trackCustomEvent,
    isEnabled: !!provider && config.enabled,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Hook to use analytics
export const useAnalytics = (): AnalyticsContextValue => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}; 