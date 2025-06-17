module.exports = {
  ci: {
    collect: {
      // Static site setup - use this if you're deploying static HTML files
      staticDistDir: './.vercel/output/static',
      
      // Dynamic site setup - use this if you're testing a deployed site
      // url: ['https://preview-url.vercel.app', 'https://preview-url.vercel.app/blog', 'https://preview-url.vercel.app/docs'],
      
      // Lighthouse settings
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance assertions
        'categories:performance': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        
        // Accessibility assertions
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'aria-required-attr': ['error', { maxLength: 0 }],
        'aria-valid-attr': ['error', { maxLength: 0 }],
        'button-name': ['error', { maxLength: 0 }],
        'document-title': ['error', { maxLength: 0 }],
        'html-has-lang': ['error', { maxLength: 0 }],
        'image-alt': ['error', { maxLength: 0 }],
        'link-name': ['error', { maxLength: 0 }],
        'meta-viewport': ['error', { maxLength: 0 }],
        
        // Best practices assertions
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        
        // SEO assertions
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // PWA assertions - disable if not building a PWA
        'categories:pwa': 'off',
        
        // Relaxed assertions for CI environment
        'uses-text-compression': 'off',
        'uses-http2': 'off',
        'render-blocking-resources': 'off',
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',
        'unused-javascript': 'warn',
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'off',
        'legacy-javascript': 'warn',
      },
    },
    server: {
      // Server options for local testing
      port: 9000,
      buildDir: './.vercel/output/static',
    },
  },
}; 