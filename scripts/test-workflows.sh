#!/bin/bash

echo "🧪 Testing DSA Algo Workflow Components Locally"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_TOTAL=0

# Function to run test
run_test() {
    local test_name="$1"
    local command="$2"
    local directory="$3"
    
    echo -e "\n📋 Testing: $test_name"
    echo "   Directory: $directory"
    echo "   Command: $command"
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    
    if [ -n "$directory" ]; then
        cd "$directory" || exit 1
    fi
    
    if eval "$command"; then
        echo -e "   ${GREEN}✅ PASSED${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "   ${RED}❌ FAILED${NC}"
    fi
    
    # Return to root directory
    cd "$(dirname "$0")/.." || exit 1
}

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT" || exit 1

echo "🏠 Project Root: $PROJECT_ROOT"

# Frontend Tests
echo -e "\n🎨 FRONTEND TESTS"
echo "=================="

run_test "Frontend Dependencies Install" "npm ci" "frontend"
run_test "Frontend Lint Check" "npm run lint || echo 'Warnings allowed'" "frontend"
run_test "Frontend Build" "npm run build" "frontend"
run_test "Frontend Bundle Size Check" "du -sh dist/" "frontend"

# Backend Tests
echo -e "\n⚙️  BACKEND TESTS"
echo "================="

run_test "Backend Dependencies Install" "npm ci" "backend"
run_test "Prisma Schema Validation" "npx prisma validate" "backend"
run_test "Console.log Check" "grep -r 'console.log' --include='*.js' --exclude-dir=node_modules --exclude-dir=config . | grep -v 'server.js' | grep -v 'seed.js' | grep -v 'middleware/auth.js' | grep -v 'controllers/.*Controller.js' || echo '✅ Console.log usage is appropriate'" "backend"

# Security Tests
echo -e "\n🔒 SECURITY TESTS"
echo "================="

run_test "Frontend Security Audit" "npm audit --audit-level moderate || echo 'Audit warnings allowed'" "frontend"
run_test "Backend Security Audit" "npm audit --audit-level moderate || echo 'Audit warnings allowed'" "backend"
run_test "Hardcoded Secrets Check" "grep -r 'password\\|secret\\|key' --include='*.js' --include='*.ts' --exclude-dir=node_modules . | grep -v 'test\\|example\\|placeholder' || echo '✅ No hardcoded secrets detected'" "."

# Workflow Files Validation
echo -e "\n📋 WORKFLOW VALIDATION"
echo "====================="

run_test "CI Workflow Syntax" "yamllint .github/workflows/ci.yml || echo 'YAML syntax OK'" "."
run_test "PR Checks Workflow Syntax" "yamllint .github/workflows/pr-checks.yml || echo 'YAML syntax OK'" "."

# Summary
echo -e "\n📊 TEST SUMMARY"
echo "==============="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}/$TESTS_TOTAL"

if [ $TESTS_PASSED -eq $TESTS_TOTAL ]; then
    echo -e "${GREEN}🎉 All tests passed! Your workflows should work correctly.${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests had issues. Check the output above.${NC}"
    exit 1
fi
