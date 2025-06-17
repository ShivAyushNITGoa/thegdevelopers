# The GDevelopers Portal

A comprehensive monorepo project built with Next.js, React, TypeScript, and Tailwind CSS, featuring multiple apps and shared packages for accessibility, performance monitoring, SEO optimization, and UI components.

## Project Structure

```
gdevelopers-portal/
├── apps/
│   ├── main/       # Main application
│   ├── blog/       # Blog application
│   ├── docs/       # Documentation application
│   └── ...
├── packages/
│   ├── accessibility/  # Accessibility components and utilities
│   ├── performance/    # Performance monitoring tools
│   ├── seo/            # SEO optimization components
│   ├── ui/             # Shared UI components
│   ├── i18n/           # Internationalization package
│   ├── ab-testing/     # A/B testing framework
│   ├── caching/        # Advanced caching strategies
│   └── ...
└── ...
```

## Key Features

### Accessibility Integration
- **AccessibilitySetup**: Comprehensive wrapper component that combines all accessibility features
- **SkipLink**: Component for keyboard navigation to skip to main content
- **Announcement**: Component for screen reader notifications
- **FocusTrap**: Component for trapping focus within modals and dialogs
- **AccessibilityChecker**: Development-mode component for automated accessibility checking
- **AccessibilityProvider**: Context provider for accessibility settings
- **DarkModeToggle**: Component for toggling between light and dark modes

### Performance Monitoring
- **PerformanceMonitor**: Client-side component for collecting performance metrics
- **PerformanceDashboard**: Component for visualizing performance metrics
- **Core Web Vitals Tracking**: Utilities for monitoring LCP, FID, CLS, FCP, TTFB, and INP
- **Navigation Timing**: Utilities for detailed page load performance metrics
- **Resource Timing**: Utilities for resource loading performance metrics
- **MetricsDatabase**: Server-side database implementation for storing metrics
- **Real-time Monitoring Dashboard**: Dashboard for visualizing performance metrics

### SEO Integration
- **HomeStructuredData**: Component for structured data on the homepage
- **FAQStructuredData**: Component for FAQ structured data
- **ProductStructuredData**: Component for product structured data
- **Enhanced Meta Tags**: Components for comprehensive meta tags
- **OpenGraph Support**: Components for social media preview optimization
- **Twitter Cards**: Components for Twitter-specific preview optimization
- **Sitemap Generation**: Configuration for generating sitemaps
- **Robots.txt**: Configuration for search engine crawling

### CI/CD Pipeline
- **GitHub Actions Workflow**: Complete workflow with lint, test, build, and deploy jobs
- **Lighthouse CI**: Configuration for automated performance and accessibility testing
- **Accessibility Testing**: Automated testing with axe-core
- **Vercel Deployment**: Configuration for deploying to Vercel

### Internationalization (i18n)
- **Language Detection**: Automatic detection of user's preferred language
- **Language Switcher**: Component for switching between languages
- **RTL Support**: Support for right-to-left languages like Arabic
- **Localized Formatting**: Utilities for formatting dates, numbers, and currencies
- **Translation Context**: Provider and hooks for easy translation integration

### A/B Testing Framework
- **Test Variant Assignment**: Logic for assigning users to test variants
- **Variant Persistence**: Storage of variant assignments across sessions
- **Exposure & Conversion Tracking**: Tracking of test exposures and conversions
- **Debug Mode**: Tools for testing different variants during development
- **React Integration**: Components and hooks for easy A/B test implementation

### Progressive Web App (PWA)
- **Service Worker**: Support for offline functionality
- **Web App Manifest**: Configuration for installable web app
- **Offline Page**: Fallback page when offline
- **Background Sync**: Support for syncing data when back online
- **Push Notifications**: Support for sending push notifications

### Advanced Caching
- **Multiple Cache Adapters**: Support for memory, Redis, and browser storage
- **Cache Manager**: Coordination between different cache layers
- **Stale-While-Revalidate**: Support for serving stale content while refreshing
- **Cache Invalidation**: Tag-based cache invalidation system
- **API Route Caching**: Middleware for caching API responses

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gdevelopers-portal.git
   cd gdevelopers-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

5. Run tests:
   ```
   npm run test
   ```

## Documentation

For detailed documentation on each package, see:
- [Accessibility Package Documentation](./packages/accessibility/README.md)
- [Performance Package Documentation](./packages/performance/README.md)
- [SEO Package Documentation](./packages/seo/README.md)
- [UI Package Documentation](./packages/ui/README.md)
- [i18n Package Documentation](./packages/i18n/README.md)
- [A/B Testing Package Documentation](./packages/ab-testing/README.md)
- [Caching Package Documentation](./packages/caching/README.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
