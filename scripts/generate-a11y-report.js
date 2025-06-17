/**
 * Script to generate accessibility reports from axe-core scan results
 */
const fs = require('fs');
const path = require('path');

// Create accessibility report directory if it doesn't exist
const reportDir = path.join(process.cwd(), 'accessibility-report');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Path to the axe-core scan results
const axeResultsPath = path.join(reportDir, 'axe-results.json');

// Check if the results file exists
if (!fs.existsSync(axeResultsPath)) {
  console.error('❌ No axe-core scan results found. Run npm run accessibility-check first.');
  process.exit(1);
}

try {
  // Read and parse the axe-core scan results
  const axeResults = JSON.parse(fs.readFileSync(axeResultsPath, 'utf8'));
  
  // Extract violations by impact level
  const violationsByImpact = {
    critical: [],
    serious: [],
    moderate: [],
    minor: [],
  };
  
  // Group violations by impact
  axeResults.forEach(result => {
    result.violations?.forEach(violation => {
      if (violationsByImpact[violation.impact]) {
        violationsByImpact[violation.impact].push({
          url: result.url,
          id: violation.id,
          description: violation.description,
          help: violation.help,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.length,
        });
      }
    });
  });
  
  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Report - The GDevelopers Portal</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      margin-bottom: 30px;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 20px;
    }
    h1 {
      color: #111;
    }
    h2 {
      margin-top: 30px;
      color: #222;
    }
    .summary {
      display: flex;
      gap: 20px;
      margin: 20px 0;
    }
    .summary-item {
      flex: 1;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
    }
    .critical {
      background-color: #fee2e2;
      color: #991b1b;
    }
    .serious {
      background-color: #fef3c7;
      color: #92400e;
    }
    .moderate {
      background-color: #f3f4f6;
      color: #4b5563;
    }
    .minor {
      background-color: #ecfdf5;
      color: #065f46;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f9fafb;
    }
    .url {
      color: #2563eb;
    }
    .help {
      color: #5a5a5a;
    }
  </style>
</head>
<body>
  <header>
    <h1>Accessibility Report - The GDevelopers Portal</h1>
    <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
  </header>
  
  <section>
    <h2>Summary</h2>
    <div class="summary">
      <div class="summary-item critical">
        <h3>Critical</h3>
        <p>${violationsByImpact.critical.length}</p>
      </div>
      <div class="summary-item serious">
        <h3>Serious</h3>
        <p>${violationsByImpact.serious.length}</p>
      </div>
      <div class="summary-item moderate">
        <h3>Moderate</h3>
        <p>${violationsByImpact.moderate.length}</p>
      </div>
      <div class="summary-item minor">
        <h3>Minor</h3>
        <p>${violationsByImpact.minor.length}</p>
      </div>
    </div>
  </section>
  
  ${Object.entries(violationsByImpact).map(([impact, violations]) => {
    if (violations.length === 0) return '';
    return `
      <section>
        <h2>${impact.charAt(0).toUpperCase() + impact.slice(1)} Issues (${violations.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Rule ID</th>
              <th>Description</th>
              <th>Instances</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            ${violations.map(v => `
              <tr>
                <td><a href="${v.helpUrl}" target="_blank">${v.id}</a></td>
                <td>
                  <div>${v.description}</div>
                  <div class="help">${v.help}</div>
                </td>
                <td>${v.nodes}</td>
                <td class="url">${v.url}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `;
  }).join('')}
  
  <footer>
    <p>This report was automatically generated as part of the CI/CD pipeline.</p>
  </footer>
</body>
</html>
  `.trim();
  
  // Write HTML report to file
  fs.writeFileSync(path.join(reportDir, 'accessibility-report.html'), htmlReport);
  
  // Generate JSON summary
  const summary = {
    timestamp: new Date().toISOString(),
    totalViolations: Object.values(violationsByImpact).reduce((acc, v) => acc + v.length, 0),
    violationsByImpact,
    passedTests: axeResults.reduce((acc, result) => acc + result.passes?.length || 0, 0),
  };
  
  // Write JSON summary to file
  fs.writeFileSync(
    path.join(reportDir, 'summary.json'), 
    JSON.stringify(summary, null, 2)
  );
  
  // Log success message
  console.log('✅ Accessibility report generated successfully:');
  console.log(`- HTML Report: ${path.join(reportDir, 'accessibility-report.html')}`);
  console.log(`- Summary: ${path.join(reportDir, 'summary.json')}`);
  
  // Exit with code 1 if critical or serious violations found
  if (violationsByImpact.critical.length > 0 || violationsByImpact.serious.length > 0) {
    console.warn(`❌ Found ${violationsByImpact.critical.length} critical and ${violationsByImpact.serious.length} serious violations.`);
    process.exit(1);
  }
  
  console.log('✅ No critical or serious violations found.');
  
} catch (error) {
  console.error('❌ Error generating accessibility report:', error);
  process.exit(1);
} 