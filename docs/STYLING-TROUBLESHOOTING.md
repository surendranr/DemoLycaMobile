# Styling Troubleshooting Guide

## Issue: Content Visible But Component UI Not Matching Design

If you can see the content but the blocks aren't styled correctly, follow these steps:

---

## ✅ Quick Checks

### 1. Verify Block Syntax in Markdown

Ensure blocks are properly formatted with `# BlockName` (case-sensitive):

```markdown
# Hero
[content]

# Plans
[content]
```

### 2. Check Browser Console

Open Developer Tools (F12) and check:
- **Console tab**: Look for JavaScript errors
- **Network tab**: Verify CSS files are loading
  - Should see: `/blocks/hero/hero.css`, `/blocks/plans/plans.css`, etc.

### 3. Inspect Elements

Right-click on a block and "Inspect Element":
- Verify the block has class: `block` and `hero` (or `plans`, etc.)
- Check if CSS classes are applied
- Verify `data-block-status="loaded"` attribute is present

---

## 🔧 Common Issues & Solutions

### Issue 1: Blocks Not Being Recognized

**Symptoms:**
- Content shows as plain text
- No block styling applied
- Missing block classes in HTML

**Solution:**
- Verify block names match exactly (case-sensitive):
  - ✅ `# Hero` (correct)
  - ❌ `# hero` (wrong)
  - ❌ `# HERO` (wrong)
- Ensure proper markdown structure with blank lines

### Issue 2: CSS Not Loading

**Symptoms:**
- Content visible but unstyled
- Missing colors, layouts, spacing

**Solution:**
1. Check Network tab in DevTools
2. Verify CSS files return 200 status
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check if files exist: `/blocks/[block-name]/[block-name].css`

### Issue 3: Section Wrappers Missing

**Symptoms:**
- Blocks not contained properly
- Layout issues
- Missing spacing

**Solution:**
- Verify sections are created automatically by EDS
- Check if `.section` class exists on parent elements
- Ensure proper block structure in markdown

### Issue 4: CSS Variables Not Defined

**Symptoms:**
- Colors not showing
- Font sizes incorrect
- Missing theme styles

**Solution:**
- Verify `/styles/styles.css` is loaded
- Check CSS variables in `:root` are defined
- Ensure fonts.css is loading

---

## 🎨 Expected Block Structure

When properly loaded, blocks should have this HTML structure:

```html
<div class="section">
  <div>
    <div class="block hero" data-block-name="hero" data-block-status="loaded">
      <div class="hero-wrapper">
        <div class="hero-content">
          <!-- content -->
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🔍 Debugging Steps

### Step 1: Verify Page Load
1. Visit: `https://main--demolycamobile--surendranr.aem.page/en/`
2. Open DevTools (F12)
3. Go to Console tab
4. Check for errors

### Step 2: Check Block Loading
In Console, run:
```javascript
// Check if blocks are loaded
document.querySelectorAll('.block').forEach(block => {
  console.log(block.dataset.blockName, block.dataset.blockStatus);
});
```

Expected output:
```
hero loaded
promo-banner loaded
plans loaded
...
```

### Step 3: Verify CSS Loading
In Console, run:
```javascript
// Check if CSS files are loaded
Array.from(document.styleSheets).forEach(sheet => {
  console.log(sheet.href || 'inline');
});
```

### Step 4: Inspect Block Structure
1. Right-click on a block
2. Select "Inspect"
3. Verify:
   - Block has correct classes
   - CSS is applied
   - Structure matches expected format

---

## 🛠️ Manual CSS Verification

### Check if CSS Variables Are Defined

In Console:
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--link-color');
// Should return: rgb(59, 99, 251) or similar
```

### Verify Block CSS is Applied

In Console:
```javascript
const hero = document.querySelector('.hero');
if (hero) {
  const styles = getComputedStyle(hero);
  console.log('Hero padding:', styles.padding);
  console.log('Hero display:', styles.display);
}
```

---

## 📝 Correct Markdown Format

Ensure your `en/index.md` follows this format:

```markdown
---
title: Page Title
---

# Hero

Heading Text

Description text

[Button Text](/link/)

# Plans

## Plan 1 Title

**Price**

* Feature 1
* Feature 2

[CTA](/link/)

---

## Plan 2 Title

...
```

---

## 🚀 Force Reload & Clear Cache

1. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Cache:**
   - DevTools → Application → Clear Storage → Clear site data

3. **Disable Cache:**
   - DevTools → Network tab → Check "Disable cache"
   - Keep DevTools open while testing

---

## 📞 Verify Block Files Exist

Check that these files exist in repository:
- ✅ `blocks/hero/hero.css`
- ✅ `blocks/hero/hero.js`
- ✅ `blocks/plans/plans.css`
- ✅ `blocks/plans/plans.js`
- ✅ `blocks/features/features.css`
- ✅ `blocks/features/features.js`
- ✅ `blocks/cards/cards.css`
- ✅ `blocks/cards/cards.js`
- ✅ `blocks/promo-banner/promo-banner.css`
- ✅ `blocks/promo-banner/promo-banner.js`
- ✅ `blocks/columns/columns.css`
- ✅ `blocks/columns/columns.js`

---

## 🎯 Expected Visual Results

### Hero Block:
- Large banner section
- Centered text
- Gradient background (if no image)
- Call-to-action button

### Plans Block:
- Grid of 3 plan cards (desktop)
- Each card with border, padding, hover effects
- Featured plan highlighted
- Checkmarks for features

### Features Block:
- Grid of feature items
- Icons (if provided)
- Centered text
- Responsive layout

### Cards Block:
- Grid of card items
- Images (if provided)
- Clean card layout

### Promo Banner Block:
- Gradient background
- Rounded corners
- Centered content
- Prominent CTA button

---

## ⚡ Quick Fixes

### Fix 1: Verify Block Name Case
```markdown
# Hero          ✅ Correct
# hero          ❌ Wrong
# HERO          ❌ Wrong
```

### Fix 2: Ensure Blank Lines
```markdown
# Hero

Content here
```
(Blank line required after `# Hero`)

### Fix 3: Check Section Separators
```markdown
# Plans

## Plan 1
...

---

## Plan 2
...
```
(Use `---` to separate items within blocks)

---

## 📋 Testing Checklist

- [ ] Block names are correct (case-sensitive)
- [ ] Blank lines after block headers
- [ ] CSS files exist in repository
- [ ] Browser console shows no errors
- [ ] Network tab shows CSS files loading (200 status)
- [ ] Blocks have `data-block-status="loaded"` attribute
- [ ] CSS classes are applied to elements
- [ ] Browser cache cleared
- [ ] Page refreshed with hard reload

---

## 🔗 Useful URLs

- **Preview:** https://main--demolycamobile--surendranr.aem.page/en/
- **Live:** https://main--demolycamobile--surendranr.aem.live/en/
- **da.live Editor:** https://da.live/#/surendranr/demolycamobile

---

## 💡 Still Not Working?

If blocks still don't style correctly:

1. **Check Repository Sync:**
   - Verify changes are pushed to GitHub
   - Confirm EDS has synced latest code

2. **Verify File Paths:**
   - Ensure CSS files are in correct locations
   - Check file names match exactly

3. **Contact Support:**
   - Review EDS documentation
   - Check Adobe Experience League

---

**Last Updated:** Based on current EDS structure

