const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

// URLs to test
const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/blog',
  'http://localhost:3000/dashboard/performance',
];

// Output directory for reports
const outputDir = path.join(__dirname, '../.accessibility-reports');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to format date for filenames
const formatDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}`;
};

// Main function to run accessibility tests
async function runAccessibilityTests() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let hasViolations = false;
  
  console.log('🔍 Running accessibility tests...');
  
  for (const url of urls) {
    try {
      console.log(`\nTesting URL: ${url}`);
      
      // Navigate to the URL
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Analyze the page with axe
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      
      // Generate a filename based on the URL and current date
      const urlPath = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${urlPath}_${formatDate()}.json`;
      const filePath = path.join(outputDir, filename);
      
      // Write results to file
      fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
      
      // Log results summary
      console.log(`✅ Passes: ${results.passes.length}`);
      
      if (results.violations.length > 0) {
        hasViolations = true;
        console.log(`❌ Violations: ${results.violations.length}`);
        
        // Log detailed violations
        results.violations.forEach((violation, index) => {
          console.log(`\n${index + 1}. ${violation.id}: ${violation.help}`);
          console.log(`   Impact: ${violation.impact}`);
          console.log(`   Description: ${violation.description}`);
          console.log(`   Affected nodes: ${violation.nodes.length}`);
        });
      } else {
        console.log('✅ No violations found!');
      }
      
      console.log(`📝 Full report saved to: ${filePath}`);
      
    } catch (error) {
      console.error(`Error testing ${url}:`, error);
      hasViolations = true;
    }
  }
  
  await browser.close();
  
  // Exit with appropriate code
  if (hasViolations) {
    console.log('\n❌ Accessibility issues found. Please fix them before proceeding.');
    process.exit(1);
  } else {
    console.log('\n✅ All accessibility tests passed!');
    process.exit(0);
  }
}

// Start the server and run tests
const { spawn } = require('child_process');

console.log('🚀 Starting development server...');
const server = spawn('npm', ['run', 'dev'], { shell: true });

// Wait for server to be ready
server.stdout.on('data', (data) => {
  const output = data.toString();
  
  if (output.includes('ready started server on') || output.includes('Local:')) {
    console.log('✅ Development server started!');
    
    // Run tests after server is ready
    runAccessibilityTests()
      .then(() => {
        // Kill the server when tests are done
        server.kill();
      })
      .catch((error) => {
        console.error('Error running tests:', error);
        server.kill();
        process.exit(1);
      });
  }
});

// Handle server errors
server.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});

// Handle server exit
server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
}); 