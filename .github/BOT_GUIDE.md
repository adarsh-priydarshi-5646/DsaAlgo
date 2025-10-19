# 🤖 GitHub Bot Guide - DSA Algorithm Platform

## Overview

Our repository uses automated GitHub bots to ensure code quality, security, and smooth collaboration. This guide explains how our bots work and how to interact with them.

## 🔍 PR Review Bot

### What it does:
- **Automatically reviews** every Pull Request
- **Checks code quality** (lint, build, syntax)
- **Scans for security issues** (hardcoded secrets, vulnerabilities)
- **Validates database schema** changes
- **Provides detailed feedback** with actionable suggestions

### When it runs:
- ✅ When a PR is **opened**
- ✅ When new **commits are pushed**
- ✅ When a PR is **reopened**

### What it checks:

#### 🔒 Security Scan
- Hardcoded API keys, passwords, secrets
- URLs with embedded credentials
- Potential security vulnerabilities

#### 🏗️ Frontend Checks
- **ESLint** code quality
- **Build process** (Vite build)
- **Bundle size** monitoring
- **TypeScript** compilation (if applicable)

#### 🧪 Backend Checks
- **JavaScript syntax** validation
- **Node.js** compatibility
- **Import/export** statement validation

#### 🗄️ Database Checks
- **Prisma schema** validation
- **Migration** compatibility
- **Database** connection testing

### Bot Response Examples:

#### ✅ All Checks Passed
```markdown
## 🤖 Automated PR Review

### 📊 PR Overview
- **Changed Files:** 5
- **PR Size:** small
- **Critical Files Changed:** None

### 🔍 Code Quality Checks
✅ **Security Scan:** No issues found
✅ **Frontend Lint:** Passed
✅ **Frontend Build:** Passed (Bundle: 1.2MB)
✅ **Backend Syntax:** Passed

### 🎯 Review Status
🎉 **All checks passed!** This PR is ready for human review.
```

#### ❌ Issues Found
```markdown
## 🤖 Automated PR Review

### 🔍 Code Quality Checks
❌ **Security Issues Found**
- Potential secrets detected in: frontend/src/config.js
- Please remove hardcoded secrets and use environment variables

❌ **Frontend Build:** Failed
```
Error: Module not found: 'missing-dependency'
```

### 🔧 Required Actions
1. Fix all failed checks mentioned above
2. Push your changes to update this PR
3. Wait for re-review by the bot
```

## 🔄 Auto Merge Bot

### What it does:
- **Automatically merges** approved PRs
- **Ensures all checks** have passed
- **Verifies required approvals** are present
- **Prevents merging** PRs with issues

### Merge Requirements:
1. ✅ **All automated checks** must pass
2. ✅ **At least 1 approval** from maintainers
3. ✅ **No blocking labels** present
4. ✅ **No merge conflicts**
5. ✅ **Branch is up to date**

### Blocking Labels:
- `❌ needs-fixes` - Issues need to be resolved
- `🔒 security-review` - Security review required
- `⚠️ do-not-merge` - Manual hold on merging
- `🚧 work-in-progress` - PR not ready
- `❓ needs-discussion` - Requires team discussion

### Auto-Merge Labels:
- `🤖 auto-merge` - Enable auto-merge for this PR
- `✅ ready-for-merge` - PR is ready for auto-merge

## 📋 How to Use the Bots

### For Contributors:

#### 1. **Create a PR**
```bash
git checkout -b feature/new-algorithm
git add .
git commit -m "✨ Add new sorting algorithm"
git push origin feature/new-algorithm
```

#### 2. **Wait for Bot Review**
- Bot will automatically review your PR
- Check the bot comment for any issues
- Fix any problems and push updates

#### 3. **Request Human Review**
- Once bot checks pass, request review from maintainers
- Address any human feedback
- Bot will re-check after each update

#### 4. **Auto-Merge (Optional)**
- Add `🤖 auto-merge` label to enable auto-merge
- Once approved, PR will merge automatically
- Or maintainers can merge manually

### For Maintainers:

#### 1. **Review PRs**
- Check bot feedback first
- Focus on logic, architecture, and design
- Bot handles code quality and security

#### 2. **Approve PRs**
- Use GitHub's review system
- PR will auto-merge if enabled
- Or merge manually when ready

#### 3. **Handle Issues**
- Add blocking labels if needed
- Provide feedback to contributors
- Bot will update status automatically

## 🏷️ Label System

### Size Labels (Auto-assigned):
- `size/small` - < 20 files changed
- `size/medium` - 20-50 files changed
- `size/large` - > 50 files changed

### Status Labels (Auto-assigned):
- `✅ ready-for-review` - All checks passed
- `❌ needs-fixes` - Issues need resolution
- `🔒 security-review` - Security issues found
- `⚠️ critical-changes` - Critical files modified

### Type Labels (Manual):
- `🐛 bug` - Bug fixes
- `✨ feature` - New features
- `📚 documentation` - Documentation updates
- `🎯 dsa-problem` - New DSA problems
- `🔐 authentication` - Auth-related changes
- `🗄️ database` - Database changes

## 🚨 Common Issues & Solutions

### ❌ Security Issues Found
**Problem:** Bot detected hardcoded secrets
```javascript
// ❌ Bad
const API_KEY = "sk-1234567890abcdef";

// ✅ Good  
const API_KEY = process.env.REACT_APP_API_KEY;
```

### ❌ Build Failed
**Problem:** Frontend build errors
```bash
# Check locally
cd frontend
npm run build

# Fix dependencies
npm install
npm run lint --fix
```

### ❌ Syntax Errors
**Problem:** Backend syntax issues
```bash
# Check syntax
node -c backend/server.js

# Fix and test
npm run start
```

### ❌ Merge Conflicts
**Problem:** Branch conflicts with main
```bash
# Update your branch
git checkout main
git pull origin main
git checkout your-branch
git merge main
# Resolve conflicts
git push origin your-branch
```

## 🔧 Bot Configuration

Bot settings are configured in `.github/bot-config.yml`:

```yaml
# Enable/disable features
pr_review:
  enabled: true
  
auto_merge:
  enabled: true
  min_approvals: 1
  
# Customize checks
quality_checks:
  frontend_lint: true
  security_scan: true
```

## 📞 Getting Help

### If Bot is Wrong:
1. **Comment on PR** explaining the issue
2. **Tag maintainers** for manual review
3. **Add `⚠️ do-not-merge`** label to prevent auto-merge

### For Bot Issues:
1. Check `.github/workflows/` files
2. Review bot configuration
3. Contact repository maintainers

### Emergency Override:
Maintainers can:
- Add `⚠️ do-not-merge` to stop auto-merge
- Merge manually despite bot warnings
- Disable bots temporarily if needed

## 🎯 Best Practices

### For Contributors:
1. **Test locally** before pushing
2. **Follow code style** guidelines
3. **Keep PRs small** and focused
4. **Write clear descriptions**
5. **Respond to bot feedback** quickly

### For Maintainers:
1. **Trust the bot** for code quality
2. **Focus on logic** and architecture
3. **Use labels** effectively
4. **Provide clear feedback**
5. **Keep bot config** updated

## 📊 Bot Statistics

The bots help maintain:
- ✅ **Code Quality** - Consistent style and standards
- 🔒 **Security** - No hardcoded secrets or vulnerabilities  
- ⚡ **Speed** - Faster review and merge process
- 🎯 **Focus** - Human reviewers focus on logic, not syntax
- 📈 **Reliability** - Automated checks prevent issues

---

*🤖 This guide covers our automated GitHub bots. For questions or issues, contact the maintainers or create an issue.*
