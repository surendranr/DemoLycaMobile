# Homepage URLs and File Paths Guide

## 🏠 Homepage URLs

### Preview Environment (Testing)
**URL:** https://main--demolycamobile--surendranr.aem.page/en/

This is where you can:
- Preview changes before going live
- Test content and blocks
- Verify formatting and functionality

### Live Environment (Production)
**URL:** https://main--demolycamobile--surendranr.aem.live/en/

This is the live website that visitors will see.

### Alternative URL (if above don't work)
**URL:** https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.page/

---

## 📄 Where to Load the .docx File

### Important Note:
The `.docx` file (`home-page-content.docx.html`) is primarily a **documentation/reference file**. 

For **actual content authoring**, you have two options:

---

## Option 1: Use Google Docs (Recommended for Content Authors)

### Step-by-Step Instructions:

1. **Open Google Drive:**
   - Go to: https://drive.google.com/drive/folders/16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF

2. **Navigate to the Home Page Folder:**
   - Create this folder structure if it doesn't exist:
   ```
   Google Drive Root/
   └── pages/
       └── en/
           └── [Create Google Doc here for homepage]
   ```

3. **Convert .docx to Google Docs:**
   - **Method A:** Upload the .docx file to Google Drive
     - Right-click the uploaded .docx file
     - Select "Open with" → "Google Docs"
     - This converts it to Google Docs format
   
   - **Method B:** Create new Google Doc and copy content
     - Click "New" → "Google Docs" → "Blank document"
     - Open the `.docx` file in Microsoft Word
     - Copy all content
     - Paste into the Google Doc

4. **Name the Google Doc:**
   - **File name:** `index` (very important - EDS looks for files named `index`)

5. **Share with Adobe:**
   - Right-click the Google Doc
   - Click "Share"
   - Add: `helix@adobe.com`
   - Set permission: **Editor** (not Viewer)
   - Click "Send"

6. **Publish using AEM Sidekick:**
   - Install AEM Sidekick browser extension (if not already)
   - Visit the preview URL: https://main--demolycamobile--surendranr.aem.page/en/
   - Click AEM Sidekick icon
   - Use it to publish from Google Docs

### Full Google Drive Path:
```
Google Drive: pages/en/index
```

---

## Option 2: Use the Markdown File (For Developers)

If you prefer to work with the repository directly:

1. **File Location in Repository:**
   ```
   DemoLycaMobile/en/index.md
   ```

2. **Edit the file directly:**
   - Make changes to `DemoLycaMobile/en/index.md`
   - Commit and push to GitHub
   - Changes sync automatically to EDS

---

## 📂 Complete File Path Reference

### Repository Paths:
```
DemoLycaMobile/
├── en/
│   └── index.md                    ← Home page content (Markdown)
├── docs/
│   ├── home-page-content.md        ← Markdown documentation
│   ├── home-page-content.docx.html ← HTML for Word conversion
│   └── HOME-PAGE-INSTRUCTIONS.md   ← Instructions guide
└── fstab.yaml                      ← Google Drive configuration
```

### Google Drive Paths:
```
Google Drive Root (ID: 16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF)/
└── pages/
    └── en/
        └── index                   ← Google Doc for homepage (name it "index")
```

---

## 🔄 Workflow Summary

### For Content Authors (Google Docs):
1. ✅ Convert `.docx` to Google Docs (or create new and copy content)
2. ✅ Place in Google Drive: `pages/en/index`
3. ✅ Share with `helix@adobe.com` (Editor permission)
4. ✅ Use AEM Sidekick to publish
5. ✅ Preview at: https://main--demolycamobile--surendranr.aem.page/en/

### For Developers (Markdown):
1. ✅ Edit `DemoLycaMobile/en/index.md`
2. ✅ Commit and push to GitHub
3. ✅ Changes sync automatically
4. ✅ Preview at: https://main--demolycamobile--surendranr.aem.page/en/

---

## 🎯 Quick Access Links

- **Preview Homepage:** https://main--demolycamobile--surendranr.aem.page/en/
- **Live Homepage:** https://main--demolycamobile--surendranr.aem.live/en/
- **Google Drive Folder:** https://drive.google.com/drive/folders/16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF
- **da.live Editor:** https://da.live/#/surendranr/demolycamobile
- **Repository:** https://github.com/surendranr/DemoLycaMobile

---

## ⚠️ Important Notes

1. **File Naming:** 
   - Google Doc must be named `index` (not `index.docx` or `home-page-index`)
   - EDS specifically looks for files named `index`

2. **Sharing Permissions:**
   - Must share with `helix@adobe.com`
   - Permission must be **Editor** (not Viewer or Commenter)

3. **File Format:**
   - ✅ Use **Google Docs** format (not .docx) for authoring
   - ✅ The .docx file is for documentation/reference only
   - ✅ Convert .docx to Google Docs before using for content

4. **Folder Structure:**
   - Must match: `pages/en/` in Google Drive
   - This corresponds to `/en/` URL path on the website

---

## 📝 Step-by-Step: Converting .docx to Google Docs

1. Open Google Drive: https://drive.google.com/drive/folders/16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF
2. Navigate to `pages/en/` folder (create if needed)
3. Click "New" → "File upload"
4. Upload: `DemoLycaMobile/docs/home-page-content.docx.html` (or convert HTML to .docx first)
5. Right-click uploaded file → "Open with" → "Google Docs"
6. Rename the Google Doc to: `index`
7. Share with `helix@adobe.com` (Editor permission)
8. Done! Now you can edit and publish via AEM Sidekick

---

**Last Updated:** Based on current repository configuration  
**Status:** ✅ Ready to use

