# The GDevelopers Portal

A modern multi-app portal built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Structure

After cleanup, the project is now organized as a monorepo using Turborepo:

```
GDevelopers-New/
├── apps/
│   ├── main/       # Main website
│   └── blog/       # Blog section
├── packages/
│   ├── ui/         # Shared UI components
│   ├── config/     # Shared configuration
│   └── design-system/ # Shared design system
```

## Key Features

- **Monorepo Architecture**: Using Turborepo for managing multiple applications and shared packages
- **Modern Stack**: Next.js, React, TypeScript, and Tailwind CSS
- **Shared Components**: Common UI elements, layout components, and design system
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Mode**: Theme switching capabilities
- **Modular Structure**: Independent apps that can be developed and deployed separately

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
cd GDevelopers-New
npm install
```

3. Run the development server:

```bash
npm run dev
```

This will start all applications in development mode.

## Apps

### Main App
The primary application serving as the main website. 

### Blog App
A separate application for blog posts and articles.

## Packages

### UI Package
Shared UI components used across all applications:
- Layout components (Header, Footer)
- Common UI elements (Button, Card)
- Theme provider

### Design System
Shared design tokens, colors, typography, and styling utilities.

### Config
Shared configuration for ESLint, TypeScript, and other tools.

## Development Commands

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications for production
- `npm run lint` - Run linting across all applications and packages

## Future Plans

1. Re-implement Team, Projects, and Contact sections as separate apps
2. Enhance the design system and shared components
3. Implement proper routing between all apps
4. Set up CI/CD pipelines for automated deployment 