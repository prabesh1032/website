# GitHub Pages Setup Instructions

## Problem Solved
This repository was configured with a custom domain in the CNAME file (`www.prabeshacharya10.np.com`), which prevented it from being accessible at the default GitHub Pages URL: `prabesh1032.github.io/website`.

## Solution Applied
1. **Removed custom domain**: Cleared the CNAME file to allow GitHub Pages to use the default URL structure
2. **Verified relative paths**: Confirmed all HTML, CSS, JS, and image paths are relative (no leading slashes)

## How to Access Your Website
After these changes, your website should be accessible at:
**https://prabesh1032.github.io/website**

## GitHub Pages Configuration
To ensure GitHub Pages is properly configured:

1. Go to your repository settings: https://github.com/prabesh1032/website/settings/pages
2. Under "Source", select "Deploy from a branch"
3. Choose the branch containing your website files (likely `main` or the current branch)
4. Select "/ (root)" as the folder
5. Click "Save"

## Important Notes
- It may take a few minutes for changes to propagate to GitHub Pages
- If you want to use a custom domain in the future, add it back to the CNAME file
- All paths in your HTML files are correctly relative, making them compatible with subdirectory hosting

## File Structure
Your website includes:
- `index.html` - Main homepage
- `projects.html` - Projects showcase
- `contact.html` - Contact information
- `resume.html` - Resume/CV page
- `css/` - Stylesheets
- `js/` - JavaScript files
- `images/` - Image assets