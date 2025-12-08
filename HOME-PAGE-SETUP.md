# Lycamobile Home Page - EDS Implementation

This document describes the home page implementation for the Lycamobile UK website, cloned from https://www.lycamobile.co.uk/en/

## Created Files

### 1. Home Page
- **File**: `index.html`
- **Location**: `DemoLycaMobile/index.html`
- **Description**: Main home page with proper EDS structure including hero, promotional banner, plans showcase, features, and content sections

### 2. Block Components

#### Plans Block
- **Files**: 
  - `blocks/plans/plans.js`
  - `blocks/plans/plans.css`
- **Description**: Displays mobile plan cards with pricing, features, and call-to-action buttons. Supports featured plans with special styling.

#### Features Block
- **Files**:
  - `blocks/features/features.js`
  - `blocks/features/features.css`
- **Description**: Shows key features/benefits in a grid layout with icons and descriptions.

#### Promotional Banner Block
- **Files**:
  - `blocks/promo-banner/promo-banner.js`
  - `blocks/promo-banner/promo-banner.css`
- **Description**: Eye-catching promotional banner with gradient background, supporting images and call-to-action buttons.

#### Updated Hero Block
- **Files**:
  - `blocks/hero/hero.js` (updated)
  - `blocks/hero/hero.css` (updated)
- **Description**: Enhanced hero section with background image support, heading, description, and CTA buttons.

## Page Structure

The home page (`index.html`) includes the following sections:

1. **Hero Section** - Main banner with headline and CTA
2. **Promotional Banner** - Special offers and promotions
3. **Plans Showcase** - Three plan cards (Pay As You Go, Monthly, Premium)
4. **Features Section** - Four key features (No Contract, Great Coverage, Easy Top-Up, 24/7 Support)
5. **Additional Content** - Cards section for additional information

## Block Usage

### Plans Block
To use the plans block, create a structure like this:

```html
<div>
  <div>
    <div class="plans">
      <div>
        <h3>Plan Name</h3>
        <p><strong>£X.XX</strong> per month</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
        </ul>
        <p><a href="/link" class="button">Choose Plan</a></p>
      </div>
      <div class="featured"> <!-- Add 'featured' class for highlighted plan -->
        <!-- Plan content -->
      </div>
    </div>
  </div>
</div>
```

### Features Block
To use the features block:

```html
<div>
  <div>
    <div class="features">
      <div>
        <h3>Feature Title</h3>
        <p>Feature description</p>
      </div>
      <!-- Add more feature items -->
    </div>
  </div>
</div>
```

### Promo Banner Block
To use the promotional banner:

```html
<div>
  <div>
    <div class="promo-banner">
      <div>
        <h2>Promotional Heading</h2>
        <p>Promotional text</p>
        <p><a href="/link" class="button">CTA Button</a></p>
      </div>
    </div>
  </div>
</div>
```

## Styling

All blocks are fully responsive and follow the EDS design system:
- Mobile-first approach
- Responsive grid layouts
- Consistent spacing and typography
- Hover effects and transitions
- Accessible color contrasts

## Customization

### Colors
Colors can be customized via CSS variables in `styles/styles.css`:
- `--background-color`: White
- `--link-color`: Primary brand color (#3b63fb)
- `--text-color`: Text color (#131313)
- `--dark-color`: Secondary text (#505050)

### Typography
Font sizes are controlled via CSS variables:
- Heading sizes: `--heading-font-size-xxl` through `--heading-font-size-xs`
- Body sizes: `--body-font-size-m`, `--body-font-size-s`, `--body-font-size-xs`

## Next Steps

1. **Add Images**: Replace placeholder content with actual images for:
   - Hero background image
   - Plan images
   - Feature icons
   - Promotional banner images

2. **Create Fragments**: Set up header and footer fragments:
   - `/fragments/header/` - Navigation and logo
   - `/fragments/footer/` - Footer links and legal information

3. **Content Updates**: Update the sample content in `index.html` with actual Lycamobile content

4. **Testing**: Test the page in:
   - Preview environment: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.page/`
   - Live environment: `https://main--cm-p165370-s18850-demolycamobile--adobe-cm.aem.live/`

## Notes

- All blocks follow EDS conventions and will be automatically loaded based on their class names
- The page structure follows the EDS pattern: `div > div > div.block-name`
- Blocks are lazy-loaded for optimal performance
- All components are accessible and SEO-friendly

