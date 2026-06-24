# AWS Amplify Post-Deployment E2E Testing Setup

This guide explains how to configure AWS Amplify to trigger the E2E test workflow after successful deployment.

## Overview

The `post-deploy.yml` GitHub workflow is triggered via `repository_dispatch` event, which can be called by AWS Amplify using a webhook after deployment completes.

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to GitHub Settings → [Personal access tokens](https://github.com/settings/tokens) → Tokens (classic)
2. Click "Generate new token (classic)"
3. Configure the token:
   - **Name**: `amplify-e2e-webhook`
   - **Expiration**: 90 days (or your preference)
   - **Scopes**: Select `repo` (for full control of private repositories)
4. Copy the token and save it securely

### 2. Add Token to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Select your app
3. Go to **Settings** → **Build Settings**
4. Scroll down to **Webhooks** section
5. Add a new webhook with the following configuration:

   **For Webapp Deployment only:**
   ```
   Name: trigger-e2e-tests-webapp
   URL: https://api.github.com/repos/{OWNER}/{REPO}/dispatches
   ```

   Replace `{OWNER}` with your GitHub username/org and `{REPO}` with `self-portfolio`

### 3. Configure Amplify Post-Deployment Hook

You need to add a post-deployment script to your Amplify app. Update your `amplify.yml`:

```yaml
# Configure only the frontend app post-build hook
applications:
  - frontend:
      phases:
        # ... existing phases ...
        postBuild:
          commands:
            # ... existing commands ...
            - |
              curl -X POST \
                -H "Accept: application/vnd.github+json" \
                -H "Authorization: token $GITHUB_TOKEN" \
                -H "X-GitHub-Api-Version: 2022-11-28" \
                https://api.github.com/repos/jeldikk/self-portfolio/dispatches \
                -d '{"event_type":"amplify-frontend-deployment-complete","client_payload":{"environment":"webapp-${AWS_BRANCH}","deployment_url":"https://${AWS_APP_URL}","branch":"${AWS_BRANCH}"}}'
    appRoot: apps/webapp
```

### 4. Add GitHub Token to Amplify Environment Variables

1. In AWS Amplify Console → **Environment variables**
2. Add:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: Your personal access token from Step 1
   - **Select branches**: Apply to all branches

### 5. Alternative: Use AWS Secrets Manager

For better security, store the token in AWS Secrets Manager:

1. Go to [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/)
2. Create a new secret with your GitHub token
3. Reference it in `amplify.yml`:
   ```yaml
   postDeploy:
     commands:
       - export GITHUB_TOKEN=$(aws secretsmanager get-secret-value --secret-id github-e2e-token --query SecretString --output text)
   ```

## Workflow Payload Format

The workflow expects the following payload in `client_payload`:

```json
{
  "event_type": "amplify-frontend-deployment-complete",
  "client_payload": {
    "environment": "webapp-develop",
    "deployment_url": "https://develop.d1234567.amplifyapp.com",
    "branch": "develop"
  }
}
```

**Available variables in Amplify:**
- `${AWS_BRANCH}` - Current branch
- `${AWS_APP_URL}` - App domain
- `${AWS_COMMIT_SHA}` - Commit SHA
- `${AWS_COMMIT_MESSAGE}` - Commit message

## Testing the Webhook

You can manually trigger the workflow using:

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/jeldikk/self-portfolio/dispatches \
  -d '{"event_type":"amplify-frontend-deployment-complete","client_payload":{"environment":"webapp-develop","deployment_url":"https://develop.d1234567.amplifyapp.com","branch":"develop"}}'
```

## Monitoring

1. Check GitHub Actions workflow runs: https://github.com/jeldikk/self-portfolio/actions/workflows/post-deploy.yml
2. View Amplify deployment logs in the console
3. Artifacts are uploaded and available for download (30-day retention)

## Troubleshooting

**Issue: Workflow not triggered**
- Verify `GITHUB_TOKEN` is correctly set in Amplify environment variables
- Check token has `repo` scope
- Verify curl command syntax in `amplify.yml`

**Issue: Tests failing**
- Check `BASE_URL` environment variable is set correctly
- Verify deployment URL is accessible
- Review Playwright report artifacts in GitHub Actions

**Issue: Token expired**
- Regenerate token in GitHub Personal access tokens
- Update token in AWS Amplify environment variables
