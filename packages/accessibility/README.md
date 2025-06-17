# Accessibility Package

A comprehensive accessibility package for The GDevelopers Portal, providing components and utilities to make your applications accessible to all users.

## Features

- **AccessibilityProvider**: Context provider for accessibility settings
- **SkipLink**: Component for keyboard navigation to skip to main content
- **Announcement**: Component for screen reader notifications
- **FocusTrap**: Component for trapping focus within modals and dialogs
- **AccessibilityChecker**: Development-mode component for automated accessibility checking
- **AccessibilityPreferences**: UI component for user accessibility preferences
- **DarkModeToggle**: Component for toggling between light and dark modes
- **AccessibilitySetup**: Wrapper component that combines all accessibility features

## Installation

```bash
npm install accessibility
```

## Usage

### Basic Setup

To set up basic accessibility features, wrap your application with the `AccessibilitySetup` component:

```tsx
import { AccessibilitySetup } from 'accessibility';

function App({ children }) {
  return (
    <AccessibilitySetup>
      {children}
    </AccessibilitySetup>
  );
}
```

This will provide:
- Route change announcements for screen readers
- Skip link for keyboard navigation
- Accessibility context for settings
- Focus management

### AccessibilityProvider

The `AccessibilityProvider` provides accessibility settings through React Context:

```tsx
import { AccessibilityProvider, useAccessibility } from 'accessibility';

function App({ children }) {
  return (
    <AccessibilityProvider
      defaultSettings={{
        reducedMotion: false,
        highContrast: false,
        largeText: false,
        darkMode: false,
      }}
    >
      {children}
    </AccessibilityProvider>
  );
}

function MyComponent() {
  const { settings, updateSettings } = useAccessibility();
  
  return (
    <div>
      <p>Reduced Motion: {settings.reducedMotion ? 'On' : 'Off'}</p>
      <button onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}>
        Toggle Reduced Motion
      </button>
    </div>
  );
}
```

### SkipLink

The `SkipLink` component provides a way for keyboard users to skip navigation and go directly to the main content:

```tsx
import { SkipLink } from 'accessibility';

function Layout() {
  return (
    <>
      <SkipLink targetId="main-content" />
      <header>...</header>
      <main id="main-content">...</main>
    </>
  );
}
```

### Announcement

The `Announcement` component provides a way to make announcements to screen readers:

```tsx
import { Announcement } from 'accessibility';

function MyComponent() {
  return (
    <>
      <Announcement message="Data has been saved successfully" />
      <button onClick={saveData}>Save Data</button>
    </>
  );
}
```

### FocusTrap

The `FocusTrap` component traps focus within a component, useful for modals and dialogs:

```tsx
import { FocusTrap } from 'accessibility';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <FocusTrap>
      <div className="modal">
        <h2>Modal Title</h2>
        <p>Modal content...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </FocusTrap>
  );
}
```

### AccessibilityChecker

The `AccessibilityChecker` component provides automated accessibility checking in development mode:

```tsx
import { AccessibilityChecker } from 'accessibility';

function App({ children }) {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <AccessibilityChecker />}
      {children}
    </>
  );
}
```

### AccessibilityPreferences

The `AccessibilityPreferences` component provides a UI for users to set their accessibility preferences:

```tsx
import { AccessibilityPreferences } from 'accessibility';

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <AccessibilityPreferences />
    </div>
  );
}
```

### DarkModeToggle

The `DarkModeToggle` component provides a toggle for dark mode:

```tsx
import { DarkModeToggle } from 'accessibility';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <DarkModeToggle />
    </header>
  );
}
```

## API Reference

### AccessibilityProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultSettings | AccessibilitySettings | See below | Default accessibility settings |
| children | ReactNode | | Child components |

Default settings:
```ts
{
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  darkMode: false,
}
```

### SkipLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| targetId | string | 'main-content' | ID of the element to skip to |
| className | string | '' | Additional CSS class |
| label | string | 'Skip to main content' | Link text |

### Announcement

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | string | '' | Message to announce |
| assertive | boolean | false | Whether to use assertive role |
| clearAfter | number | 5000 | Time in ms to clear message |

### FocusTrap

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | | Child components |
| active | boolean | true | Whether the focus trap is active |
| initialFocus | RefObject | null | Element to focus initially |

### AccessibilityChecker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showInProduction | boolean | false | Whether to show in production |
| rules | string[] | All rules | Rules to check |

### AccessibilityPreferences

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | '' | Additional CSS class |

### DarkModeToggle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | '' | Additional CSS class |
| iconOnly | boolean | false | Whether to show only the icon |

## Best Practices

1. **Always provide text alternatives** for non-text content like images, using the `alt` attribute.

2. **Ensure keyboard accessibility** for all interactive elements. Users should be able to navigate and interact with your application using only a keyboard.

3. **Use semantic HTML** elements like `<button>`, `<a>`, `<nav>`, `<main>`, etc., to provide proper structure and meaning to your content.

4. **Maintain sufficient color contrast** between text and background to ensure readability for users with low vision.

5. **Provide visible focus indicators** for keyboard users to know which element currently has focus.

6. **Test with screen readers** like NVDA, JAWS, or VoiceOver to ensure your application is usable with assistive technologies.

7. **Implement the SkipLink component** to allow keyboard users to bypass navigation and repetitive content.

8. **Use ARIA attributes** judiciously and only when necessary. Proper HTML semantics should be your first choice.

## Compliance

This package helps your application comply with:

- **WCAG 2.1 AA**: Web Content Accessibility Guidelines
- **ADA**: Americans with Disabilities Act
- **Section 508**: Requirements for federal agencies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 