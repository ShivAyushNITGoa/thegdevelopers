// Analytics Event Types
export enum EventType {
  PAGE_VIEW = 'page_view',
  CLICK = 'click',
  FORM_SUBMIT = 'form_submit',
  SEARCH = 'search',
  DOWNLOAD = 'download',
  VIDEO_PLAY = 'video_play',
  VIDEO_COMPLETE = 'video_complete',
  ERROR = 'error',
  CUSTOM = 'custom',
}

// Base Analytics Event
export interface AnalyticsEvent {
  type: EventType;
  timestamp: number;
  path: string;
  referrer?: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

// Page View Event
export interface PageViewEvent extends AnalyticsEvent {
  type: EventType.PAGE_VIEW;
  title: string;
  loadTime?: number;
}

// Click Event
export interface ClickEvent extends AnalyticsEvent {
  type: EventType.CLICK;
  elementId?: string;
  elementClass?: string;
  elementText?: string;
  targetUrl?: string;
}

// Form Submit Event
export interface FormSubmitEvent extends AnalyticsEvent {
  type: EventType.FORM_SUBMIT;
  formId?: string;
  formName?: string;
  success: boolean;
  errorMessage?: string;
}

// Search Event
export interface SearchEvent extends AnalyticsEvent {
  type: EventType.SEARCH;
  query: string;
  resultsCount?: number;
}

// Download Event
export interface DownloadEvent extends AnalyticsEvent {
  type: EventType.DOWNLOAD;
  fileName: string;
  fileType: string;
  fileSize?: number;
}

// Video Event
export interface VideoEvent extends AnalyticsEvent {
  type: EventType.VIDEO_PLAY | EventType.VIDEO_COMPLETE;
  videoId: string;
  videoTitle?: string;
  videoDuration?: number;
  videoProgress?: number;
}

// Error Event
export interface ErrorEvent extends AnalyticsEvent {
  type: EventType.ERROR;
  errorMessage: string;
  errorCode?: string;
  errorStack?: string;
}

// Custom Event
export interface CustomEvent extends AnalyticsEvent {
  type: EventType.CUSTOM;
  name: string;
  [key: string]: any;
}

// Analytics Provider Configuration
export interface AnalyticsConfig {
  enabled: boolean;
  debug?: boolean;
  anonymizeIp?: boolean;
  trackingId?: string;
  excludePaths?: string[];
  samplingRate?: number;
  cookieExpiry?: number;
  providers?: {
    googleAnalytics?: boolean;
    plausible?: boolean;
    custom?: boolean;
  };
}

// Analytics Provider Interface
export interface AnalyticsProvider {
  initialize(config: AnalyticsConfig): Promise<void>;
  trackEvent(event: AnalyticsEvent): Promise<void>;
  trackPageView(event: PageViewEvent): Promise<void>;
  trackClick(event: ClickEvent): Promise<void>;
  trackFormSubmit(event: FormSubmitEvent): Promise<void>;
  trackSearch(event: SearchEvent): Promise<void>;
  trackDownload(event: DownloadEvent): Promise<void>;
  trackVideo(event: VideoEvent): Promise<void>;
  trackError(event: ErrorEvent): Promise<void>;
  trackCustom(event: CustomEvent): Promise<void>;
} 