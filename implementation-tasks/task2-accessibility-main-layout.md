# Task 2: Implement Accessibility in Main App Layout

## Objective
Integrate the accessibility package into the main app layout to improve the user experience for all users, including those with disabilities.

## Prerequisites
- Accessibility package (`packages/accessibility`) is available and fully implemented
- Access to the main app layout file (`apps/main/src/app/layout.tsx`)
- Access to the main navigation component

## Implementation Steps

### 1. Import Required Components
Update the layout file to import the accessibility components:

```tsx
import { AccessibilityProvider, SkipLink } from 'accessibility';
```

### 2. Add AccessibilityProvider
Wrap the app content with the AccessibilityProvider component:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <MetaTags {...seoMetadata} />
        
        <AccessibilityProvider>
          <SkipLink href="#main-content" label="Skip to main content" />
          
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main-content" className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
```

### 3. Add id to Main Content
Ensure the main content section has an id attribute that matches the SkipLink href:

```tsx
<main id="main-content" className="flex-grow">
  {children}
</main>
```

### 4. Update Modal Components
For any modal components in the main app, update them to use the FocusTrap component:

```tsx
// apps/main/src/components/Modal.tsx
"use client";

import { FocusTrap } from 'accessibility';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <FocusTrap>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </FocusTrap>
    </div>
  );
};
```

### 5. Add Announcement Component
For dynamic content changes, add the Announcement component:

```tsx
// apps/main/src/components/SearchResults.tsx
"use client";

import { Announcement } from 'accessibility';

export const SearchResults = ({ results, searchTerm }) => {
  const resultCount = results.length;
  
  return (
    <div>
      <Announcement message={`${resultCount} results found for ${searchTerm}`} />
      
      <h2>Search Results for "{searchTerm}"</h2>
      <p>Found {resultCount} results</p>
      
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};
```

### 6. Add AccessibilityPreferences Component
Add the AccessibilityPreferences component to the user settings page:

```tsx
// apps/main/src/app/settings/page.tsx
"use client";

import { AccessibilityPreferences } from 'accessibility';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">User Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Accessibility Preferences</h2>
        <AccessibilityPreferences />
      </div>
      
      {/* Other settings sections */}
    </div>
  );
}
```

### 7. Add AccessibilityChecker in Development Mode
Add the AccessibilityChecker component in development mode only:

```tsx
// apps/main/src/app/layout.tsx
import { AccessibilityProvider, SkipLink, AccessibilityChecker } from 'accessibility';

// ... rest of the code

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <MetaTags {...seoMetadata} />
        
        <AccessibilityProvider>
          <SkipLink href="#main-content" label="Skip to main content" />
          
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main-content" className="flex-grow">
                {children}
                {isDevelopment && <AccessibilityChecker />}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
```

## Testing
- Test keyboard navigation throughout the app
- Test with screen readers (NVDA, VoiceOver, JAWS)
- Verify skip link functionality
- Test modal focus management
- Test AccessibilityPreferences settings
- Run axe-core accessibility checker

## Acceptance Criteria
- Skip link is properly implemented and works with keyboard navigation
- Focus is properly trapped in modal dialogs
- Dynamic content changes are announced to screen readers
- User can customize accessibility preferences
- No accessibility violations detected by automated tools
- Keyboard navigation works for all interactive elements

## Resources
- Accessibility package documentation: `packages/accessibility/README.md`
- WCAG 2.1 Guidelines: https://www.w3.org/TR/WCAG21/
- WebAIM: https://webaim.org/
- axe-core: https://github.com/dequelabs/axe-core 