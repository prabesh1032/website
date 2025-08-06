#!/bin/bash

# Website Validation Script for prabesh1032/website
# This script helps validate the website setup and GitHub Pages configuration

echo "=== Website Validation Report ==="
echo "Date: $(date)"
echo ""

# Test 1: Check if HTML files are valid
echo "1. Checking HTML files..."
html_files=$(find . -name "*.html" -type f | head -5)
for file in $html_files; do
    if [[ -f "$file" ]]; then
        echo "   ✅ Found: $file ($(wc -l < "$file") lines)"
    fi
done
echo ""

# Test 2: Check CNAME configuration
echo "2. Checking CNAME configuration..."
if [[ -f "CNAME" ]]; then
    domain=$(cat CNAME)
    echo "   ✅ CNAME file exists"
    echo "   📍 Configured domain: $domain"
else
    echo "   ❌ CNAME file missing"
fi
echo ""

# Test 3: Test DNS resolution
echo "3. Testing DNS resolution..."
if [[ -f "CNAME" ]]; then
    domain=$(cat CNAME)
    if nslookup "$domain" >/dev/null 2>&1; then
        echo "   ✅ DNS resolution successful for $domain"
    else
        echo "   ❌ DNS resolution failed for $domain"
        echo "   💡 Domain needs DNS configuration at registrar"
    fi
else
    echo "   ⏭️  Skipping DNS test (no CNAME file)"
fi
echo ""

# Test 4: Test GitHub Pages URLs
echo "4. Testing GitHub Pages accessibility..."
github_url="https://prabesh1032.github.io/website/"
if curl -s -I "$github_url" | grep -q "200 OK"; then
    echo "   ✅ GitHub Pages URL accessible: $github_url"
else
    echo "   ❌ GitHub Pages URL not accessible: $github_url"
    echo "   💡 Enable GitHub Pages in repository settings"
fi
echo ""

# Test 5: Check essential files
echo "5. Checking essential files..."
essential_files=("index.html" "favicon.ico" "css" "js")
for file in "${essential_files[@]}"; do
    if [[ -e "$file" ]]; then
        echo "   ✅ Found: $file"
    else
        echo "   ⚠️  Missing: $file"
    fi
done
echo ""

# Summary and recommendations
echo "=== Summary and Next Steps ==="
if [[ -f "CNAME" ]]; then
    domain=$(cat CNAME)
    echo "📋 To make $domain work:"
    echo "   1. Configure DNS: CNAME record www → prabesh1032.github.io"
    echo "   2. Enable GitHub Pages (Settings → Pages → main branch)"
    echo "   3. Wait 24-48 hours for DNS propagation"
    echo "   4. Verify: curl -I https://$domain"
else
    echo "📋 To deploy the website:"
    echo "   1. Create CNAME file with your domain"
    echo "   2. Configure DNS records"
    echo "   3. Enable GitHub Pages"
fi
echo ""
echo "🔗 Temporary access: https://prabesh1032.github.io/website/"
echo "=== End of Report ==="