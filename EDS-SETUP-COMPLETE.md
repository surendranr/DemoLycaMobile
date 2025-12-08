# EDS Google Docs Authoring Setup - Complete

## ✅ What Has Been Created

### 1. Markdown Home Page
- **File**: `en/index.md`
- **Purpose**: Google Docs-compatible markdown file for the home page
- **Location**: `DemoLycaMobile/en/index.md`
- **Features**:
  - Frontmatter with metadata (title, description, nav, footer)
  - All blocks properly structured for EDS
  - Ready for Google Docs authoring

### 2. Fragment Files
- **Header Fragment**: `fragments/header/index.md`
  - Navigation structure
  - Brand logo link
  - Menu sections
  - User tools
  
- **Footer Fragment**: `fragments/footer/index.md`
  - Quick links
  - Legal information
  - Support links
  - Social media links

### 3. Configuration File
- **fstab.yaml**: Google Drive mapping configuration
  - Main content mountpoint
  - Fragments mountpoint
  - **Action Required**: Update with your Google Drive folder IDs

### 4. Block Components
All blocks are created and ready:
- ✅ Hero block (`blocks/hero/`)
- ✅ Plans block (`blocks/plans/`)
- ✅ Features block (`blocks/features/`)
- ✅ Promo Banner block (`blocks/promo-banner/`)
- ✅ Cards block (`blocks/cards/`)
- ✅ Header block (`blocks/header/`)
- ✅ Footer block (`blocks/footer/`)

### 5. Documentation
- **GOOGLE-DOCS-AUTHORING.md**: Complete guide for content authors
- **HOME-PAGE-SETUP.md**: Technical setup documentation

## 📋 Next Steps

### Step 1: Set Up Google Drive

1. Create folder structure in Google Drive:
   ```
   Lycamobile-EDS-Content/
   ├── pages/
   │   └── en/
   │       └── index.md
   ├── fragments/
   │   ├── header/
   │   │   └── index.md
   │   └── footer/
   │       └── index.md
   ```

2. Share folder with Adobe:
   - Right-click `Lycamobile-EDS-Content` folder
   - Share → Add `helix@adobe.com`
   - Permission: **Editor**
   - Send

3. Get Google Drive Folder IDs:
   - Open each folder in Google Drive
   - Copy the ID from the URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`

### Step 2: Configure fstab.yaml

Update `DemoLycaMobile/fstab.yaml`:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_MAIN_FOLDER_ID
  /fragments: https://drive.google.com/drive/folders/YOUR_FRAGMENTS_FOLDER_ID
```

Replace `YOUR_MAIN_FOLDER_ID` and `YOUR_FRAGMENTS_FOLDER_ID` with actual IDs.

### Step 3: Create Google Docs

1. **Home Page**:
   - Create Google Doc: "Home Page"
   - Copy content from `en/index.md`
   - Place in: `Lycamobile-EDS-Content/pages/en/`
   - Share with `helix@adobe.com`

2. **Header Fragment**:
   - Create Google Doc: "Header"
   - Copy content from `fragments/header/index.md`
   - Place in: `Lycamobile-EDS-Content/fragments/header/`
   - Share with `helix@adobe.com`

3. **Footer Fragment**:
   - Create Google Doc: "Footer"
   - Copy content from `fragments/footer/index.md`
   - Place in: `Lycamobile-EDS-Content/fragments/footer/`
   - Share with `helix@adobe.com`

### Step 4: Publish Using AEM Sidekick

1. Install AEM Sidekick browser extension
2. Configure with repository details
3. Open preview URL: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.page/en/`
4. Use Sidekick to publish pages from Google Docs

## 📁 File Structure

```
DemoLycaMobile/
├── en/
│   └── index.md                    # Home page (Google Docs format)
├── fragments/
│   ├── header/
│   │   └── index.md                # Header fragment
│   └── footer/
│       └── index.md                # Footer fragment
├── blocks/
│   ├── hero/                       # Hero block component
│   ├── plans/                      # Plans block component
│   ├── features/                   # Features block component
│   ├── promo-banner/               # Promo banner block component
│   ├── cards/                      # Cards block component
│   ├── header/                     # Header block component
│   └── footer/                     # Footer block component
├── fstab.yaml                      # Google Drive configuration
├── index.html                      # HTML version (fallback)
├── GOOGLE-DOCS-AUTHORING.md        # Authoring guide
└── HOME-PAGE-SETUP.md              # Setup documentation
```

## 🎯 Key Features

### Google Docs Authoring
- ✅ Markdown format compatible with Google Docs
- ✅ Frontmatter for metadata
- ✅ Block-based structure
- ✅ Fragment support for reusable components

### EDS Integration
- ✅ Proper block structure
- ✅ Fragment loading
- ✅ Metadata support
- ✅ Responsive design

### Content Management
- ✅ Easy editing in Google Docs
- ✅ Version control via Google Docs
- ✅ Collaborative editing
- ✅ Publishing via AEM Sidekick

## 📚 Documentation

- **GOOGLE-DOCS-AUTHORING.md**: Complete guide for content authors
  - How to create pages
  - Block syntax
  - Publishing workflow
  - Best practices

- **HOME-PAGE-SETUP.md**: Technical documentation
  - Component structure
  - Customization options
  - Styling guidelines

## 🔗 Resources

- [EDS Documentation](https://www.aem.live/docs/)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Block Collection](https://www.aem.live/developer/block-collection)

## ✨ Summary

Your EDS website is now set up for Google Docs-based authoring! The structure follows EDS best practices and is ready for content authors to create and edit pages directly in Google Docs.

**Important**: Remember to:
1. Update `fstab.yaml` with your Google Drive folder IDs
2. Share all folders with `helix@adobe.com`
3. Create Google Docs from the markdown files
4. Configure AEM Sidekick for publishing

