# 🛡️ Branch Protection Setup Guide

## Overview
This guide helps you set up branch protection rules to work with our GitHub bots.

## 🔧 Required Settings

### 1. Go to Repository Settings
1. Navigate to your repository on GitHub
2. Click **Settings** tab
3. Go to **Branches** in the left sidebar
4. Click **Add rule** for `main` branch

### 2. Branch Protection Rule Configuration

#### 📋 Rule Name
```
main
```

#### ✅ Required Settings

**Require a pull request before merging:**
- ✅ Enable this option
- Required number of reviewers: `1`
- ✅ Dismiss stale PR approvals when new commits are pushed
- ❌ Require review from code owners (optional)

**Require status checks to pass before merging:**
- ✅ Enable this option
- ✅ Require branches to be up to date before merging
- Required status checks:
  - `🔍 Automated PR Review`
  - `pr-review-bot`

**Require conversation resolution before merging:**
- ✅ Enable this option (recommended)

**Require signed commits:**
- ❌ Disable (optional, can enable for higher security)

**Require linear history:**
- ✅ Enable (recommended for cleaner history)

**Include administrators:**
- ❌ Disable (allows admins to bypass rules in emergencies)

**Restrict pushes that create files:**
- ❌ Disable

**Allow force pushes:**
- ❌ Disable (recommended)

**Allow deletions:**
- ❌ Disable (recommended)

### 3. GitHub Actions Permissions

#### Go to Settings > Actions > General

**Actions permissions:**
- ✅ Allow all actions and reusable workflows

**Workflow permissions:**
- ✅ Read and write permissions
- ✅ Allow GitHub Actions to create and approve pull requests

### 4. Security Settings

#### Go to Settings > Security & analysis

**Dependency graph:**
- ✅ Enable

**Dependabot alerts:**
- ✅ Enable

**Dependabot security updates:**
- ✅ Enable

**Secret scanning:**
- ✅ Enable (if available)

**Push protection:**
- ✅ Enable (prevents pushing secrets)

## 🤖 Bot Integration

### Required Secrets (if needed)
Go to Settings > Secrets and variables > Actions

Currently, our bots use the default `GITHUB_TOKEN` which is automatically provided.

### Webhook Configuration (Optional)
For external notifications:

1. Go to Settings > Webhooks
2. Add webhook URL (if using Slack/Discord notifications)
3. Select events:
   - Pull requests
   - Pull request reviews
   - Check runs
   - Status

## 📋 Verification Checklist

After setup, verify:

- [ ] ✅ Cannot push directly to `main` branch
- [ ] ✅ PRs require review before merge
- [ ] ✅ Status checks must pass before merge
- [ ] ✅ Bot comments appear on new PRs
- [ ] ✅ Auto-merge works for approved PRs
- [ ] ✅ Security scanning blocks secret pushes
- [ ] ✅ Labels are automatically applied

## 🧪 Test the Setup

### 1. Create Test PR
```bash
git checkout -b test/bot-setup
echo "console.log('Testing bot');" > test-file.js
git add test-file.js
git commit -m "🧪 Test bot setup"
git push origin test/bot-setup
```

### 2. Check Bot Response
- Bot should comment within 1-2 minutes
- Labels should be applied automatically
- Status checks should appear

### 3. Test Auto-Merge
- Get PR approved
- Add `🤖 auto-merge` label
- PR should merge automatically

## 🚨 Troubleshooting

### Bot Not Running
1. Check Actions tab for workflow runs
2. Verify workflow files are in `.github/workflows/`
3. Check repository permissions
4. Ensure branch protection includes required checks

### Auto-Merge Not Working
1. Verify all status checks pass
2. Check for blocking labels
3. Ensure required approvals are present
4. Check merge conflicts

### Status Checks Missing
1. Go to Settings > Branches
2. Edit branch protection rule
3. Add required status checks:
   - `🔍 Automated PR Review`
   - `pr-review-bot`

## 📞 Support

If you encounter issues:

1. Check the [BOT_GUIDE.md](.github/BOT_GUIDE.md)
2. Review workflow logs in Actions tab
3. Create an issue with:
   - Error messages
   - Screenshots
   - Steps to reproduce

## 🔄 Updates

When updating bot configuration:

1. Modify `.github/bot-config.yml`
2. Update workflow files if needed
3. Test changes with a test PR
4. Update this guide if settings change

---

*🛡️ Proper branch protection ensures code quality and security while enabling automation.*
