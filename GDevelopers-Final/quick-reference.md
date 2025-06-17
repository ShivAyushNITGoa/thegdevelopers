# Quick Reference Guide

## Project Navigation

### Key Directories
- `apps/main` - Main website application
- `apps/blog` - Blog application
- `packages/ui` - Shared UI components
- `packages/config` - Shared configuration
- `packages/design-system` - Design system

### Important Files
- `development-plan.md` - Detailed development roadmap
- `README.md` - Project overview
- `turbo.json` - Monorepo configuration
- `apps/*/next.config.js` - Next.js configuration for each app

## Development Phases

### Phase 1: Core Functionality (Current Focus)
- Complete main app implementation
- Develop blog functionality
- Expand shared component library

### Phase 2: Additional Applications
- Projects app
- Team app
- Contact app

### Phase 3: Advanced Features
- Authentication
- Content management
- AI integration

### Phase 4: Optimization & Deployment
- Performance optimization
- SEO enhancements
- CI/CD setup

## Common Commands

### Development
```bash
# Start all applications
npm run dev

# Start a specific app
cd apps/main && npm run dev

# Build all applications
npm run build

# Lint all code
npm run lint
```

### Creating New Components
1. Add component to appropriate package
2. Export from index file
3. Import in consuming application

### Adding a New App
1. Copy structure from existing app
2. Update package.json with appropriate name
3. Configure next.config.js for routing
4. Add to workspace in root package.json

## Getting Help

Refer to the following resources:
- `development-plan.md` for detailed task breakdown
- Next.js documentation: https://nextjs.org/docs
- Turborepo documentation: https://turbo.build/repo/docs
- Project README for overview and setup instructions 