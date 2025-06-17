/**
 * Deployment notification script
 * Sends deployment status updates to GitHub and other notification channels
 */
module.exports = async ({ github, context, status, core }) => {
  try {
    // Only run on pull request or push to main
    if (!context.payload.pull_request && context.ref !== 'refs/heads/main') {
      core.info('Skipping notification - not a PR or push to main');
      return;
    }
    
    const isPR = !!context.payload.pull_request;
    const repo = context.repo;
    const sha = isPR ? context.payload.pull_request.head.sha : context.sha;
    const env = context.payload.deployment?.environment || 'production';
    
    // Create deployment status
    await github.rest.repos.createDeploymentStatus({
      owner: repo.owner,
      repo: repo.repo,
      deployment_id: context.payload.deployment?.id || 0,
      state: status.toLowerCase() === 'success' ? 'success' : 'failure',
      environment: env,
      environment_url: `https://${env}.gdevelopers.com`,
      description: `Deployment ${status.toLowerCase()}`,
      auto_inactive: false,
    }).catch(err => {
      // If there's no deployment, this will fail - that's ok
      core.info(`Couldn't create deployment status: ${err.message}`);
    });
    
    // If it's a PR, add a comment
    if (isPR) {
      const deploymentState = status.toLowerCase() === 'success' ? '✅ Deployment succeeded' : '❌ Deployment failed';
      const deploymentUrl = `https://${env}.gdevelopers.com`;
      
      await github.rest.issues.createComment({
        owner: repo.owner,
        repo: repo.repo,
        issue_number: context.payload.pull_request.number,
        body: `## Deployment Update\n\n${deploymentState}\n\n${status.toLowerCase() === 'success' ? `🔍 Preview: [${deploymentUrl}](${deploymentUrl})` : ''}`,
      });
    }
    
    // Update commit status
    await github.rest.repos.createCommitStatus({
      owner: repo.owner,
      repo: repo.repo,
      sha: sha,
      state: status.toLowerCase() === 'success' ? 'success' : 'failure',
      target_url: `https://${env}.gdevelopers.com`,
      description: `Deployment to ${env} ${status.toLowerCase() === 'success' ? 'succeeded' : 'failed'}`,
      context: `vercel/${env}`,
    });
    
    // Log success
    core.info(`Deployment notification sent for ${env} environment with status: ${status}`);
  } catch (error) {
    core.warning(`Failed to send deployment notification: ${error.message}`);
  }
}; 