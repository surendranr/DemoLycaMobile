# DemoLycaMobile - Edge Delivery Services Site

Lycamobile website built on Adobe Edge Delivery Services (EDS) with Google Docs-based authoring.

## Environments

### Content Delivery
- **Content URL**: https://content.da.live/surendranr/demolycamobile/

### Preview Environment
- **Base URL**: https://main--demolycamobile--surendranr.aem.page/
- **Home Page**: https://main--demolycamobile--surendranr.aem.page/en/

### Live Environment
- **Base URL**: https://main--demolycamobile--surendranr.aem.live/
- **Home Page**: https://main--demolycamobile--surendranr.aem.live/en/

**Note**: If the above URLs don't work, try: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.page/`

## Quick Links

- **da.live Editor**: https://da.live/#/surendranr/demolycamobile
- **Editor (da.live)**: https://main--demolycamobile--surendranr.aem.page/en/?da.live
- **Google Drive Folder**: https://drive.google.com/drive/folders/16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF
- **AEM Code Sync Status**: ✅ Registered (user: surendran.astro@gmail.com, org: surendranr)
- **Git Repository**: Verify connection in da.live editor settings

## Configuration

### Google Drive Connection

- **Folder ID**: `16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF`
- **Shared with**: `helix@adobe.com` (Editor permission)
- **Configuration**: See `fstab.yaml`

### Content Files

- **Home Page**: `en/index.md`
- **Header Fragment**: `fragments/header/index.md`
- **Footer Fragment**: `fragments/footer/index.md`

## Block Components

All custom blocks are located in `/blocks`:

- `hero/` - Hero banner section
- `plans/` - Mobile plan cards
- `features/` - Feature grid
- `promo-banner/` - Promotional banner
- `cards/` - Card layout
- `header/` - Navigation header
- `footer/` - Footer component

## Editing Content

### Method 1: da.live Editor (Recommended)

1. Open: https://main--demolycamobile--surendranr.aem.page/en/?da.live
2. Click on content to edit inline
3. Changes save automatically
4. Publish when ready

### Method 2: Google Docs

1. Open Google Drive: https://drive.google.com/drive/folders/16tpKjcaIRXcM-khIdLy_2BLqkoLkIpQF
2. Edit Google Docs in `pages/en/` or `fragments/` folders
3. Publish using AEM Sidekick

### Method 3: Markdown Files

1. Edit `.md` files in repository
2. Commit and push to GitHub
3. Changes sync automatically

## Setup Instructions

### Prerequisites

- GitHub repository (public)
- Google Drive folder shared with `helix@adobe.com`
- AEM Code Sync GitHub App installed
- AEM Sidekick browser extension (optional)

### Initial Setup

1. **Configure Google Drive**:
   - Update `fstab.yaml` with your Google Drive folder ID
   - Share folder with `helix@adobe.com` (Editor permission)

2. **Create Google Docs**:
   - Create Google Docs from markdown files in `en/` and `fragments/`
   - Place in corresponding Google Drive folders
   - Ensure all docs are shared with `helix@adobe.com`

3. **Install AEM Sidekick** (optional):
   - Chrome: https://chromewebstore.google.com/detail/aem-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo
   - Configure with repository details

## Development

### Local Development

```sh
npm i
npm run lint
aem up
```

### Project Structure

```
DemoLycaMobile/
├── blocks/          # Custom block components
├── en/              # Home page content
├── fragments/       # Reusable fragments (header, footer)
├── scripts/         # JavaScript files
├── styles/          # CSS files
├── fonts/           # Font files
├── icons/           # Icon files
├── fstab.yaml       # Google Drive configuration
└── index.html       # Main HTML file
```

## Documentation

For detailed documentation, see:
- [EDS Documentation](https://www.aem.live/docs/)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Block Collection](https://www.aem.live/developer/block-collection)

## License

See [LICENSE](LICENSE) file for details.
