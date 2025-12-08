# da.live Editor - Git Repository Configuration

## Current Status

### da.live Editor URL
**Editor Interface**: https://da.live/#/surendranr/demolycamobile

### Repository Configuration

Based on the AEM Code Sync registration and da.live editor URL:

| Item | Value | Status |
|------|-------|--------|
| **Organization** | `surendranr` | ✅ Configured |
| **Site Name** | `demolycamobile` | ✅ Configured |
| **GitHub Repository** | `surendranr/DemoLycaMobile` or `surendranr/demolycamobile` | ⚠️ Verify |
| **AEM Code Sync** | ✅ Registered | ✅ Active |
| **Content URL** | `https://content.da.live/surendranr/demolycamobile/` | ✅ Configured |

## Verification Checklist

### ✅ Confirmed Configuration

1. **AEM Code Sync Registered**
   - User: `surendran.astro@gmail.com`
   - Site: `demolycamobile`
   - Organization: `surendranr`
   - Status: ✅ Registered and ready

2. **da.live Editor Accessible**
   - URL: https://da.live/#/surendranr/demolycamobile
   - Editor interface is accessible

3. **Repository Structure**
   - ✅ All required files present
   - ✅ Blocks configured
   - ✅ Content files in place

### ⚠️ Items to Verify

1. **Repository Name Match**
   - da.live expects: `demolycamobile`
   - GitHub repo might be: `DemoLycaMobile` (case-sensitive)
   - **Action**: Verify repository name matches exactly

2. **Git Repository Connection**
   - Ensure repository is connected in da.live settings
   - Check if git sync is enabled
   - Verify branch name (should be `main`)

3. **Content Sync**
   - Changes in da.live editor should sync to GitHub
   - GitHub changes should appear in da.live
   - Verify bidirectional sync is working

## How to Verify Git Configuration in da.live

### Step 1: Check Repository Connection

1. Open da.live editor: https://da.live/#/surendranr/demolycamobile
2. Look for repository/settings icon
3. Check if GitHub repository is connected
4. Verify repository URL matches: `https://github.com/surendranr/DemoLycaMobile`

### Step 2: Verify Git Sync

1. Make a small change in da.live editor
2. Save the change
3. Check if it creates a commit in GitHub
4. Verify the commit appears in your repository

### Step 3: Test Bidirectional Sync

1. **From da.live to GitHub**:
   - Edit content in da.live
   - Save changes
   - Check GitHub repository for new commits

2. **From GitHub to da.live**:
   - Make a change in GitHub (edit a file)
   - Commit and push
   - Check if change appears in da.live editor

## Repository Name Considerations

### Possible Issues

If da.live shows `demolycamobile` but your GitHub repo is `DemoLycaMobile`:

1. **Case Sensitivity**: GitHub is case-sensitive
2. **Repository Mapping**: da.live might need exact match
3. **Solution**: Either:
   - Rename GitHub repo to match exactly: `demolycamobile`
   - Or verify da.live is configured to use `DemoLycaMobile`

### Recommended Action

1. Check your actual GitHub repository name
2. Verify it matches what da.live expects
3. If different, either:
   - Update da.live configuration to match GitHub repo name
   - Or rename GitHub repo to match da.live site name

## Configuration Files

### Required Files (All Present ✅)

- ✅ `fstab.yaml` - Google Drive configuration
- ✅ `package.json` - Project configuration
- ✅ `well-known/adobe/cloudmanager-challenge.txt` - AEM Cloud Manager verification
- ✅ Content files (`en/index.md`, `fragments/*`)
- ✅ Block components (`blocks/*`)

### Optional but Recommended

- `helix.config.js` - Advanced Helix/EDS configuration (not required for basic setup)

## Testing Git Integration

### Test 1: Edit in da.live

1. Open: https://da.live/#/surendranr/demolycamobile
2. Navigate to a page (e.g., `/en/`)
3. Make a small text change
4. Save
5. Check GitHub repository for new commit

### Test 2: Edit in GitHub

1. Edit `en/index.md` in GitHub
2. Commit and push
3. Wait 1-2 minutes
4. Refresh da.live editor
5. Verify change appears

### Test 3: Check Sync Status

1. In da.live editor, look for sync status indicator
2. Check for any error messages
3. Verify last sync timestamp

## Troubleshooting

### Issue: Changes Not Syncing

**Solutions**:
1. Verify AEM Code Sync GitHub App is installed
2. Check repository is public
3. Verify repository name matches exactly
4. Check branch name is `main` (not `master`)
5. Wait a few minutes for sync to complete

### Issue: da.live Can't Find Repository

**Solutions**:
1. Verify repository name in GitHub matches site name
2. Check organization name is correct
3. Ensure repository is public
4. Verify AEM Code Sync has access

### Issue: Editor Shows Error

**Solutions**:
1. Check browser console for errors
2. Verify you're logged in with correct Adobe account
3. Check repository permissions
4. Verify site is properly configured

## Next Steps

1. **Open da.live Editor**: https://da.live/#/surendranr/demolycamobile
2. **Check Settings**: Look for repository/git configuration
3. **Test Sync**: Make a small change and verify it syncs to GitHub
4. **Verify Repository**: Confirm GitHub repo name matches expectations

## Summary

✅ **AEM Code Sync**: Registered and active  
✅ **da.live Editor**: Accessible at https://da.live/#/surendranr/demolycamobile  
⚠️ **Git Integration**: Verify repository name matches and sync is working  
✅ **Repository Structure**: All required files present  

The da.live editor should be able to sync with your GitHub repository automatically through AEM Code Sync. If you encounter any issues, check the repository name match and verify AEM Code Sync has proper access.

