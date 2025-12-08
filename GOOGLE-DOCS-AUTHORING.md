# Google Docs Authoring Guide for Lycamobile EDS

This guide explains how to author content for the Lycamobile website using Google Docs, which is then automatically converted to EDS pages.

## Overview

Adobe Edge Delivery Services (EDS) supports **Document-Based Authoring** using Google Docs. Content authors can create and edit pages directly in Google Docs, and the content is automatically published to the website.

## Setup Instructions

### 1. Google Drive Structure

Create the following folder structure in Google Drive:

```
Lycamobile-EDS-Content/
├── pages/
│   └── en/
│       └── index.md (Home Page)
├── fragments/
│   ├── header/
│   │   └── index.md
│   └── footer/
│       └── index.md
└── components/
    └── (reusable components)
```

### 2. Share with Adobe

1. Create a main folder: `Lycamobile-EDS-Content`
2. Right-click the folder → **Share**
3. Add email: `helix@adobe.com`
4. Permission: **Editor** (not Viewer)
5. Check **"Notify people"**
6. Click **Send**

### 3. Configure fstab.yaml

1. Get your Google Drive folder ID from the URL:
   - URL format: `https://drive.google.com/drive/folders/[FOLDER_ID]`
   - Copy the ID after `/folders/`
2. Update `fstab.yaml` in the repository:
   ```yaml
   mountpoints:
     /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
     /fragments: https://drive.google.com/drive/folders/YOUR_FRAGMENTS_FOLDER_ID
   ```
3. Commit and push the changes

## Authoring Content in Google Docs

### Page Structure

Each page should follow this structure:

```markdown
---
title: Page Title
description: Page description
nav: /fragments/header
footer: /fragments/footer
---

# Block Name

Content for the block goes here.

# Another Block

More content...
```

### Frontmatter (Metadata)

The frontmatter section (between `---`) contains page metadata:

- **title**: Page title (appears in browser tab and SEO)
- **description**: Page description (for SEO)
- **nav**: Path to navigation fragment (default: `/fragments/header`)
- **footer**: Path to footer fragment (default: `/fragments/footer`)

### Block Syntax

Blocks are defined using headings (H1, H2, etc.) followed by content:

#### Hero Block
```markdown
# Hero

Main Headline

Supporting text description

[Button Text](/link-url/)
```

#### Plans Block
```markdown
# Plans

## Plan Name

**£X.XX** per month

* Feature 1
* Feature 2
* Feature 3

[Choose Plan](/link-url/)

---

## Another Plan

**£Y.YY** per month

* Feature 1
* Feature 2

[Choose Plan](/link-url/)
```

**Note**: Use `---` (horizontal rule) to separate plan cards. Add `class="featured"` to a plan div in the HTML if you want to highlight it.

#### Features Block
```markdown
# Features

## Feature Title

Feature description text.

---

## Another Feature

Another feature description.
```

#### Promo Banner Block
```markdown
# Promo Banner

## Promotional Heading

Promotional text description

[Call to Action](/link-url/)
```

#### Cards Block
```markdown
# Cards

## Card Title

Card description and content.

---

## Another Card

More card content.
```

### Formatting Guidelines

1. **Headings**: Use H1 for main blocks, H2 for sub-sections
2. **Links**: Format as `[Link Text](/url/)`
3. **Buttons**: Links automatically become buttons if they're in a paragraph by themselves
4. **Lists**: Use bullet points (`*`) for unordered lists
5. **Bold**: Use `**text**` for bold text
6. **Images**: Add images via Google Docs Insert → Image, or use image URLs

### Block Names

Available block names (use as H1 headings):

- `Hero` - Hero banner section
- `Promo Banner` - Promotional banner
- `Plans` - Mobile plan cards
- `Features` - Feature grid
- `Cards` - Card layout
- `Columns` - Multi-column layout

## Creating the Home Page

### Step-by-Step

1. **Create Google Doc**: "Home Page"
2. **Add Frontmatter**:
   ```markdown
   ---
   title: Low Cost, High Value plans from £2.50 p/m | Lyca Mobile UK
   description: Affordable mobile plans and SIM only deals
   nav: /fragments/header
   footer: /fragments/footer
   ---
   ```

3. **Add Content Blocks**:
   - Hero section
   - Promotional banner
   - Plans showcase
   - Features section
   - Additional content

4. **Save and Share**:
   - Save the document
   - Ensure it's in the correct folder structure
   - Verify it's shared with `helix@adobe.com`

5. **Publish**:
   - Use AEM Sidekick browser extension
   - Navigate to preview URL
   - Click "Publish" in Sidekick bar

## Publishing Workflow

### Using AEM Sidekick

1. **Install Sidekick**:
   - Chrome: [AEM Sidekick Extension](https://chromewebstore.google.com/detail/aem-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo)
   - Safari: Available in Safari extensions store

2. **Configure Sidekick**:
   - Open Sidekick settings
   - Enter repository details:
     - Repository: `YOUR_USERNAME/demolycamobile`
     - Owner: Your GitHub username
     - Project: `demolycamobile`

3. **Publish Content**:
   - Open preview URL: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.page/en/`
   - Sidekick bar appears at the bottom
   - Click **"Publish"** to publish from Google Docs
   - Click **"Edit"** to open the Google Doc
   - Click **"Delete"** to remove a page

### Environments

- **Preview**: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.page/`
- **Live**: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.live/`

## Fragment Authoring

### Header Fragment

Location: `fragments/header/index.md`

```markdown
---
title: Header Navigation
---

# Navigation

## Brand

[Lycamobile](/)

## Sections

* [Plans](/en/bundles/pay-as-you-go-sim-deals/)
  * [Pay As You Go](/en/bundles/pay-as-you-go-sim-deals/)
  * [Monthly Plans](/paymonthly/en/bundles/sim-only-deals/)
* [Help & Support](/en/help-support/)
* [Quick Top Up](/en/quick-top-up/)

## Tools

* [My Account](#)
* [Top Up](/en/quick-top-up/)
```

### Footer Fragment

Location: `fragments/footer/index.md`

```markdown
---
title: Footer
---

# Footer

## Quick Links

* [About Us](#)
* [Contact Us](#)
* [Help & Support](/en/help-support/)

## Legal

* [Terms & Conditions](#)
* [Privacy Policy](#)

---

© 2024 Lycamobile. All rights reserved.
```

## Best Practices

1. **Consistent Structure**: Follow the same block structure across pages
2. **Clear Headings**: Use descriptive headings for blocks
3. **Link Formatting**: Always use relative paths for internal links
4. **Image Optimization**: Use appropriate image sizes and formats
5. **Content Review**: Review content before publishing
6. **Version Control**: Google Docs automatically tracks versions

## Troubleshooting

### Content Not Appearing

1. Check that the document is shared with `helix@adobe.com`
2. Verify the folder structure matches the URL structure
3. Check `fstab.yaml` configuration
4. Ensure document is in the correct Google Drive folder

### Blocks Not Rendering

1. Verify block name matches available blocks (case-sensitive)
2. Check that block JavaScript/CSS files exist in `/blocks/`
3. Review browser console for errors

### Publishing Issues

1. Verify Sidekick is configured correctly
2. Check repository connection
3. Ensure you have publish permissions
4. Review Sidekick error messages

## Resources

- [EDS Documentation](https://www.aem.live/docs/)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Block Collection](https://www.aem.live/developer/block-collection)
- [Markup, Sections, Blocks](https://www.aem.live/developer/markup-sections-blocks)

## Support

For issues or questions:
- Check EDS documentation
- Review repository issues
- Contact Adobe Support for EDS-specific issues

