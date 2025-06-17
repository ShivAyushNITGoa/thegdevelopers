const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// List of app configurations
const apps = [
  { name: 'main', port: 3000 },
  { name: 'blog', port: 3001 },
  { name: 'auth', port: 3002 },
  { name: 'team', port: 3003 },
  { name: 'contact', port: 3004 },
  { name: 'docs', port: 3005 },
  { name: 'projects', port: 3006 },
];

console.log('GDevelopers Apps Configuration');
console.log('-----------------------------');
console.log('This monorepo contains the following apps:');
console.log('');

apps.forEach(app => {
  console.log(`- ${app.name.padEnd(8)} - http://localhost:${app.port}`);
});

console.log('\nTo run all apps together, use:');
console.log('  npm run dev:all');
console.log('\nTo run individual apps, use:');
console.log('  npm run dev:main');
console.log('  npm run dev:blog');
console.log('  etc.');

console.log('\nApp routing is configured in apps/main/next.config.js');
console.log('All apps are integrated via Next.js rewrites');

// Check if each app exists
const existingApps = apps.filter(app => {
  const appDir = path.join(__dirname, 'apps', app.name);
  return fs.existsSync(appDir);
});

console.log('Starting GDevelopers apps...');
console.log('----------------------------');

// Start each app
const processes = existingApps.map(app => {
  console.log(`Starting ${app.name} on port ${app.port}...`);
  
  const proc = spawn('npm', ['run', 'dev', '--', '--port', app.port.toString()], {
    cwd: path.join(__dirname, 'apps', app.name),
    shell: true,
    stdio: 'pipe',
  });
  
  // Log output with app name prefix
  proc.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      console.log(`[${app.name}] ${line}`);
    });
  });
  
  proc.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      console.error(`[${app.name}] ${line}`);
    });
  });
  
  proc.on('error', (error) => {
    console.error(`[${app.name}] Failed to start: ${error.message}`);
  });
  
  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`[${app.name}] Process exited with code ${code}`);
    }
  });
  
  return proc;
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down all apps...');
  processes.forEach(proc => {
    proc.kill('SIGINT');
  });
  process.exit(0);
});

console.log('\nAll apps started! Press Ctrl+C to stop all apps.');
console.log('\nAvailable apps:');
existingApps.forEach(app => {
  console.log(`- ${app.name}: http://localhost:${app.port}`);
});
