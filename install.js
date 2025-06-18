const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Installing dependencies for the main app only...');

// Change to main app directory
process.chdir(path.join(__dirname, 'apps/main'));

// Install production dependencies only for the main app
execSync('npm install --omit=dev', { stdio: 'inherit' });

console.log('✅ Dependencies installed successfully'); 