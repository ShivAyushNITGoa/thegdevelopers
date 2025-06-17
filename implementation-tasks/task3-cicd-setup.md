# Task 3: Set Up CI/CD Pipeline

## Objective
Set up a CI/CD pipeline using GitHub Actions to automate building, testing, and deployment of the applications.

## Prerequisites
- GitHub repository for the project
- Vercel account for deployment
- Access to create GitHub Actions workflows

## Implementation Steps

### 1. Create GitHub Actions Workflow Configuration
Create a `.github/workflows` directory and add a workflow file for CI/CD:

```yml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Type check
      run: npm run type-check
      
    - name: Run tests
      run: npm run test
      
    - name: Build
      run: npm run build
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-artifacts
        path: |
          **/dist
          **/build
          **/.next
        if-no-files-found: warn

  deploy-staging:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-artifacts
        
    - name: Deploy to Vercel (Staging)
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        vercel-args: '--prod'
```

### 2. Set Up Vercel Project
Configure the Vercel project for deployment:

1. Log in to Vercel and create a new project
2. Connect the GitHub repository
3. Configure the project settings:
   - Build command: `npm run build`
   - Output directory: `.next`
   - Environment variables
   - Domain settings

### 3. Configure GitHub Secrets
Add the following secrets to the GitHub repository:

- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

### 4. Add Scripts to package.json
Update the root `package.json` to include the necessary scripts:

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  }
}
```

### 5. Configure Branch Protection Rules
Set up branch protection rules for the main branch:

1. Go to repository settings
2. Navigate to Branches > Branch protection rules
3. Add a rule for the main branch:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include the status check for the CI workflow

### 6. Set Up Environment Configuration
Create environment-specific configuration files:

```js
// apps/[app-name]/config/environment.js
const environments = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    analyticsEnabled: false,
  },
  staging: {
    apiUrl: 'https://staging-api.gdevelopers.com',
    analyticsEnabled: true,
  },
  production: {
    apiUrl: 'https://api.gdevelopers.com',
    analyticsEnabled: true,
  },
};

const currentEnv = process.env.NODE_ENV || 'development';
export const config = environments[currentEnv];
```

### 7. Create Deployment Documentation
Create a `DEPLOYMENT.md` file with deployment instructions:

```md
# Deployment Guide

## Environments

- **Development**: Local development environment
- **Staging**: Pre-production environment for testing
- **Production**: Live production environment

## Deployment Process

1. Changes are pushed to feature branches
2. Pull requests are created to merge into main
3. CI runs tests and builds on the PR
4. After approval and merge, changes are automatically deployed to staging
5. Manual promotion from staging to production

## Environment Variables

The following environment variables need to be set for each environment:

- `API_URL`: API endpoint URL
- `ANALYTICS_KEY`: Analytics API key
- `AUTH_SECRET`: Authentication secret key

## Rollback Procedure

In case of deployment issues:

1. Identify the last stable version
2. Revert to that version in the repository
3. Trigger a new deployment
```

## Testing
- Verify that the GitHub Actions workflow runs successfully
- Test automated deployment to the staging environment
- Verify that branch protection rules are working
- Test rollback procedure

## Acceptance Criteria
- CI pipeline automatically builds and tests the code on every push and pull request
- CD pipeline automatically deploys successful builds to the staging environment
- Branch protection rules prevent merging of broken code
- Deployment process is well-documented
- Environment-specific configuration works correctly

## Resources
- GitHub Actions documentation: https://docs.github.com/en/actions
- Vercel documentation: https://vercel.com/docs
- Turborepo documentation: https://turborepo.org/docs 