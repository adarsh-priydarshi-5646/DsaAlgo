# 🛡️ Branch Protection Rules Setup

## Required Settings for Main Branch

To enable automatic code review and prevent bad code from being merged, configure these branch protection rules in GitHub:

### 1. Go to Repository Settings
- Navigate to your repository on GitHub
- Click on **Settings** tab
- Go to **Branches** in the left sidebar

### 2. Add Branch Protection Rule
- Click **Add rule**
- Branch name pattern: `main`

### 3. Configure Protection Settings

#### ✅ Required Status Checks
- [x] Require status checks to pass before merging
- [x] Require branches to be up to date before merging
- Required status checks:
  - `Code Review Bot`
  - `CI / Frontend Tests`
  - `CI / Backend Tests`
  - `PR Checks / Code Quality`

#### ✅ Required Reviews
- [x] Require pull request reviews before merging
- Required approving reviews: `1`
- [x] Dismiss stale reviews when new commits are pushed
- [x] Require review from code owners (if CODEOWNERS file exists)

#### ✅ Additional Restrictions
- [x] Restrict pushes that create files larger than 100MB
- [x] Require conversation resolution before merging
- [x] Require linear history (optional)

#### ✅ Admin Enforcement
- [x] Include administrators (recommended for team projects)

### 4. Auto-merge Configuration
- [x] Allow auto-merge
- [x] Automatically delete head branches

## 🤖 How the Bot Works

### Automatic Checks
1. **Code Quality**: Linting, formatting, build verification
2. **Security**: Vulnerability scanning, credential detection
3. **Best Practices**: Console log detection, TODO tracking
4. **Performance**: Build size monitoring

### Review Outcomes
- ✅ **APPROVED**: All checks pass, ready to merge
- ⚠️ **APPROVED WITH COMMENTS**: Minor issues, can merge with caution
- ❌ **CHANGES REQUESTED**: Critical issues, must fix before merge

### Status Checks
- **Success**: Green checkmark, PR can be merged
- **Failure**: Red X, PR blocked until issues are resolved

## 📋 Code Quality Standards

### Required Checks
- No linting errors
- Successful build
- No high-severity security vulnerabilities
- No hardcoded credentials
- Minimal console.log statements (except in allowed files)

### Allowed Console Logs
- `server.js` - Server startup logs
- `seed.js` - Database seeding logs
- `config/` - Configuration logs
- `middleware/auth.js` - Authentication logs
- `controllers/` - API endpoint logs

### Best Practices
- Use proper error handling
- Follow consistent code formatting
- Add meaningful commit messages
- Keep functions small and focused
- Use TypeScript types where applicable

## 🚀 Quick Setup Commands

```bash
# Enable branch protection via GitHub CLI (if available)
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Code Review Bot"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

## 📞 Support

If you encounter issues with the code review bot:
1. Check the Actions tab for detailed logs
2. Ensure all required files are present
3. Verify branch protection rules are configured
4. Contact the repository maintainers for assistance
