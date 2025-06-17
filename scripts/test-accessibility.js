const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const path = require('path');

// URLs to test
const urls = [
  'http://localhost:3000',
  'http://localhost:3000/blog',
  'http://localhost:3000/docs',
];

// Create report directory if it doesn't exist
const reportDir = path.join(__dirname, '../accessibility-report');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

(async () => {
  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Set up a counter for failures
  let failureCount = 0;
  
  // Test each URL
  for (const url of urls) {
    console.log(`Testing ${url} for accessibility issues...`);
    
    try {
      // Navigate to URL
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Analyze the page with axe
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      
      // Extract page name for report filename
      const pageName = url.replace(/https?:\/\/localhost:\d+\/?/, '').replace(/\//g, '-') || 'home';
      const reportPath = path.join(reportDir, `${pageName}-report.json`);
      
      // Write results to file
      fs.writeFileSync(
        reportPath,
        JSON.stringify(results, null, 2)
      );
      
      // Log violations
      if (results.violations.length > 0) {
        console.log(`Found ${results.violations.length} accessibility violations on ${url}:`);
        
        results.violations.forEach((violation) => {
          console.log(`\n${violation.impact.toUpperCase()}: ${violation.help}`);
          console.log(`Rule: ${violation.id}`);
          console.log(`WCAG: ${violation.tags.filter(tag => tag.startsWith('wcag')).join(', ')}`);
          console.log(`Link: ${violation.helpUrl}`);
          console.log('Elements:');
          
          violation.nodes.forEach((node) => {
            console.log(`- ${node.html}`);
            console.log(`  ${node.failureSummary.replace(/\n/g, '\n  ')}`);
          });
        });
        
        failureCount += results.violations.length;
      } else {
        console.log(`✅ No accessibility violations found on ${url}`);
      }
      
      // Create HTML report
      const htmlReportPath = path.join(reportDir, `${pageName}-report.html`);
      const htmlReport = generateHtmlReport(url, results);
      fs.writeFileSync(htmlReportPath, htmlReport);
      
    } catch (error) {
      console.error(`Error testing ${url}:`, error);
      failureCount++;
    }
  }
  
  // Create index.html that links to all reports
  const indexPath = path.join(reportDir, 'index.html');
  const indexHtml = generateIndexHtml(urls);
  fs.writeFileSync(indexPath, indexHtml);
  
  // Close browser
  await browser.close();
  
  // Exit with error code if violations were found
  if (failureCount > 0) {
    console.log(`\n❌ Found ${failureCount} accessibility violations across all pages.`);
    process.exit(1);
  } else {
    console.log('\n✅ No accessibility violations found across all pages.');
    process.exit(0);
  }
})().catch((error) => {
  console.error('Error running accessibility tests:', error);
  process.exit(1);
});

/**
 * Generate HTML report for a page
 */
function generateHtmlReport(url, results) {
  const violationsByImpact = {
    critical: results.violations.filter(v => v.impact === 'critical'),
    serious: results.violations.filter(v => v.impact === 'serious'),
    moderate: results.violations.filter(v => v.impact === 'moderate'),
    minor: results.violations.filter(v => v.impact === 'minor'),
  };
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Accessibility Report for ${url}</title>
      <style>
        body { font-family: system-ui, sans-serif; line-height: 1.5; max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { margin-top: 0; }
        .summary { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .summary-item { padding: 1rem; border-radius: 0.5rem; flex: 1; }
        .critical { background-color: #fee2e2; color: #991b1b; }
        .serious { background-color: #fef3c7; color: #92400e; }
        .moderate { background-color: #e0f2fe; color: #0369a1; }
        .minor { background-color: #f3f4f6; color: #374151; }
        .passes { background-color: #dcfce7; color: #166534; }
        .violation { margin-bottom: 2rem; padding: 1rem; border-radius: 0.5rem; }
        .violation-critical { border-left: 4px solid #dc2626; }
        .violation-serious { border-left: 4px solid #ea580c; }
        .violation-moderate { border-left: 4px solid #0284c7; }
        .violation-minor { border-left: 4px solid #6b7280; }
        .violation-header { display: flex; justify-content: space-between; }
        .violation-impact { font-weight: bold; text-transform: uppercase; }
        .node { margin-top: 1rem; padding: 1rem; background-color: #f9fafb; border-radius: 0.5rem; }
        .html { font-family: monospace; white-space: pre-wrap; background-color: #f3f4f6; padding: 0.5rem; border-radius: 0.25rem; }
        .failure-summary { white-space: pre-wrap; margin-top: 0.5rem; }
        a { color: #2563eb; }
        .back-link { display: inline-block; margin-bottom: 1rem; }
      </style>
    </head>
    <body>
      <a href="index.html" class="back-link">← Back to Index</a>
      <h1>Accessibility Report</h1>
      <p>URL: <a href="${url}" target="_blank">${url}</a></p>
      
      <div class="summary">
        <div class="summary-item critical">
          <h2>Critical</h2>
          <p>${violationsByImpact.critical.length} violations</p>
        </div>
        <div class="summary-item serious">
          <h2>Serious</h2>
          <p>${violationsByImpact.serious.length} violations</p>
        </div>
        <div class="summary-item moderate">
          <h2>Moderate</h2>
          <p>${violationsByImpact.moderate.length} violations</p>
        </div>
        <div class="summary-item minor">
          <h2>Minor</h2>
          <p>${violationsByImpact.minor.length} violations</p>
        </div>
        <div class="summary-item passes">
          <h2>Passes</h2>
          <p>${results.passes.length} checks</p>
        </div>
      </div>
      
      ${results.violations.length > 0 ? `
        <h2>Violations</h2>
        ${results.violations.map(violation => `
          <div class="violation violation-${violation.impact}">
            <div class="violation-header">
              <h3>${violation.help}</h3>
              <span class="violation-impact">${violation.impact}</span>
            </div>
            <p>${violation.description}</p>
            <p>Rule: ${violation.id}</p>
            <p>WCAG: ${violation.tags.filter(tag => tag.startsWith('wcag')).join(', ')}</p>
            <p><a href="${violation.helpUrl}" target="_blank">Learn more</a></p>
            
            <h4>Affected Elements (${violation.nodes.length})</h4>
            ${violation.nodes.map(node => `
              <div class="node">
                <div class="html">${escapeHtml(node.html)}</div>
                <div class="failure-summary">${node.failureSummary}</div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      ` : `
        <h2>No violations found!</h2>
        <p>This page passes all accessibility checks.</p>
      `}
    </body>
    </html>
  `;
}

/**
 * Generate index HTML that links to all reports
 */
function generateIndexHtml(urls) {
  const pageNames = urls.map(url => {
    const pageName = url.replace(/https?:\/\/localhost:\d+\/?/, '').replace(/\//g, '-') || 'home';
    return { url, pageName };
  });
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Accessibility Reports</title>
      <style>
        body { font-family: system-ui, sans-serif; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { margin-top: 0; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
        a { color: #2563eb; }
      </style>
    </head>
    <body>
      <h1>Accessibility Reports</h1>
      <p>Select a page to view its accessibility report:</p>
      
      <ul>
        ${pageNames.map(({ url, pageName }) => `
          <li>
            <a href="${pageName}-report.html">${url}</a>
          </li>
        `).join('')}
      </ul>
    </body>
    </html>
  `;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
} 