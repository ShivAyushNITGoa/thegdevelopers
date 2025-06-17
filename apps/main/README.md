# Main App - The GDevelopers Portal

This is the main application for The GDevelopers Portal, built with Next.js, React, TypeScript, and Tailwind CSS.

## Integrated Features

### SEO
The app uses the `seo` package for comprehensive search engine optimization:
- Meta tags for all pages with proper titles and descriptions
- JSON-LD structured data for better rich results in search engines
- OpenGraph and Twitter Card support for social sharing
- Sitemap generation and robots.txt configuration

### Accessibility
The app implements the `accessibility` package to ensure an inclusive experience:
- Skip links for keyboard navigation
- Accessibility preferences UI for user customization
- Focus management and traps for modals
- ARIA attributes and semantic HTML
- Screen reader announcements for important changes

### Performance
The app leverages the `performance` package for optimized user experience:
- Core Web Vitals tracking and monitoring
- Resource timing and navigation timing analysis
- Optimized image loading and code splitting
- Lazy loading of non-critical components

### Testing
The app is thoroughly tested using the `testing` package:
- Unit tests for components and hooks
- Integration tests for feature flows
- Mock API utilities for backend simulation
- Custom render utilities for testing complex components

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Building for Production
```bash
# Build the app
npm run build

# Start the production server
npm start
```

## CI/CD Pipeline
The app is deployed using GitHub Actions with the following workflow:
1. Lint and test
2. Build
3. Deploy to Vercel
4. Run post-deployment checks for accessibility and performance

## Contributing
Please see the main README in the root directory for contribution guidelines. 