# Home Page Content - Documentation

## Files Created

1. **`DemoLycaMobile/en/index.md`** - Enhanced home page with all custom blocks
2. **`DemoLycaMobile/docs/home-page-content.md`** - Markdown version of content
3. **`DemoLycaMobile/docs/home-page-content.docx.html`** - HTML version for Word conversion

## How to Create .docx File

### Method 1: Open HTML in Microsoft Word (Recommended)

1. Open Microsoft Word
2. Go to **File** → **Open**
3. Navigate to `DemoLycaMobile/docs/home-page-content.docx.html`
4. Word will convert the HTML to a formatted document
5. Go to **File** → **Save As**
6. Choose **Word Document (*.docx)** format
7. Save as `home-page-content.docx`

### Method 2: Copy from Markdown

1. Open `DemoLycaMobile/docs/home-page-content.md`
2. Copy the content
3. Paste into Microsoft Word or Google Docs
4. Format as needed
5. Save as .docx

### Method 3: Use Pandoc (Command Line)

If you have Pandoc installed:

```bash
pandoc DemoLycaMobile/docs/home-page-content.md -o home-page-content.docx
```

## Block Structure in the Home Page

The enhanced home page (`en/index.md`) uses the following EDS blocks:

### 1. Hero Block
- Main banner section
- Heading: "Affordable Mobile Plans for Everyone"
- Description and CTA button

### 2. Promo Banner Block (First Instance)
- Special launch offer
- 50% off first month promotion

### 3. Plans Block
- Three mobile plans:
  - Pay As You Go (£2.50/month)
  - Monthly Plan (£5.00/month)
  - Premium Plan (£10.00/month)

### 4. Features Block (First Instance)
- Four key features:
  - No Contract
  - Great Coverage
  - Easy Top-Up
  - 24/7 Support

### 5. Columns Block
- Three-column layout:
  - Why Choose Lyca Mobile?
  - Our Commitment
  - Join the Community

### 6. Cards Block
- Four benefit cards:
  - Value for Money
  - Flexible Plans
  - Award-Winning Service
  - Nationwide Coverage

### 7. Promo Banner Block (Second Instance)
- New customer bonus offer
- Free SIM card promotion

### 8. Features Block (Second Instance)
- Four additional features:
  - Fast 4G & 5G Speeds
  - International Roaming
  - Mobile App
  - Environmentally Conscious

## EDS Block Syntax

Each block in the markdown file uses this format:

```markdown
# BlockName

Content here...

[CTA Button Text](/path/to/page/)
```

Separate items within a block using `---`:

```markdown
# Plans

## Plan 1
Content...

---

## Plan 2
Content...
```

## Using the Content

### For da.live Editor:
1. Visit: `https://da.live/#/surendranr/demolycamobile`
2. Navigate to `/en/` page
3. The content from `en/index.md` will be loaded
4. Edit inline using da.live's visual editor

### For Google Docs:
1. Copy content from `docs/home-page-content.md`
2. Create a new Google Doc
3. Paste the content
4. Format as needed
5. Save in Google Drive folder: `pages/en/`
6. Name it `index`
7. Share with `helix@adobe.com`
8. Use AEM Sidekick to publish

### For Direct Editing:
1. Edit `DemoLycaMobile/en/index.md` directly
2. Commit and push to GitHub
3. Changes will sync automatically to EDS

## Content Guidelines

### Block Names:
- Must match exactly (case-sensitive)
- Use: `# Hero`, `# Plans`, `# Features`, etc.

### Separators:
- Use `---` to separate items within blocks
- Example: Different plan cards, feature items

### Links:
- Format: `[Button Text](/path/to/page/)`
- For buttons, use class `button`: `[Text](/link/)`

### Lists:
- Use standard markdown: `* Item` or `- Item`
- For plan features, use bullet points

### Images:
- Reference images using relative paths
- Images should be in `/images/` folder
- Use proper alt text

## Customization

You can customize the home page by:

1. **Editing Block Content:**
   - Modify text within each block
   - Update prices, features, descriptions

2. **Adding/Removing Blocks:**
   - Add new blocks using block syntax
   - Remove blocks by deleting the section

3. **Changing Order:**
   - Rearrange blocks by moving sections
   - Maintain block syntax (`# BlockName`)

4. **Updating Links:**
   - Modify CTA links to point to correct pages
   - Ensure paths are relative to site root

## Verification

After making changes:

1. **Preview:** Visit `https://main--demolycamobile--surendranr.aem.page/en/`
2. **Check Blocks:** Verify all blocks render correctly
3. **Test Links:** Ensure all CTA buttons work
4. **Mobile View:** Check responsive design
5. **Publish:** When ready, publish to live environment

## Support

For questions or issues:
- Check EDS documentation: https://www.aem.live/docs/
- Review block examples in `/blocks` directory
- Consult project README: `DemoLycaMobile/README.md`

