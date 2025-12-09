# Quick Styling Fix Guide

## If Content Shows But UI Doesn't Match Design

### 🔍 Step 1: Verify Blocks Are Loading

Open browser console (F12) and run:

```javascript
// Check block status
const blocks = document.querySelectorAll('.block');
console.log('Total blocks found:', blocks.length);
blocks.forEach(block => {
  console.log(
    'Block:', block.dataset.blockName, 
    'Status:', block.dataset.blockStatus,
    'Classes:', block.className
  );
});
```

**Expected Output:**
```
Total blocks found: 8
Block: hero Status: loaded Classes: block hero
Block: promo-banner Status: loaded Classes: block promo-banner
...
```

**If Status is NOT "loaded":**
- Blocks are not loading properly
- Check console for JavaScript errors
- Verify block files exist in repository

---

### 🔍 Step 2: Check CSS Files Are Loading

In Network tab (DevTools):
1. Filter by "CSS"
2. Reload page
3. Verify these files load with 200 status:
   - `/blocks/hero/hero.css`
   - `/blocks/plans/plans.css`
   - `/blocks/features/features.css`
   - `/blocks/cards/cards.css`
   - `/blocks/promo-banner/promo-banner.css`
   - `/blocks/columns/columns.css`

**If files return 404:**
- Files don't exist in repository
- Check repository structure
- Verify file paths are correct

---

### 🔍 Step 3: Verify Block Structure

Right-click on any block → Inspect Element

**Check for:**
1. Block has class `block` and block name (e.g., `hero`)
2. Block has `data-block-status="loaded"`
3. Parent section has class `section`
4. CSS classes from block CSS are applied

**Example Structure:**
```html
<div class="section hero-container">
  <div>
    <div class="block hero" data-block-name="hero" data-block-status="loaded">
      <div class="hero-wrapper">
        <!-- content -->
      </div>
    </div>
  </div>
</div>
```

---

### 🔍 Step 4: Check CSS Variables

Run in console:
```javascript
const root = getComputedStyle(document.documentElement);
console.log('Link color:', root.getPropertyValue('--link-color'));
console.log('Background:', root.getPropertyValue('--background-color'));
console.log('Text color:', root.getPropertyValue('--text-color'));
```

**Should return color values, not empty strings.**

---

## 🛠️ Common Fixes

### Fix 1: Clear Cache & Hard Reload
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`
- Or: DevTools → Application → Clear Storage

### Fix 2: Verify Block Names (Case-Sensitive)
```markdown
# Hero          ✅ Correct
# Plans         ✅ Correct
# Features      ✅ Correct

# hero          ❌ Wrong
# plans         ❌ Wrong
```

### Fix 3: Check Blank Lines in Markdown
```markdown
# Hero

Content here    ← Blank line required after # Hero
```

### Fix 4: Verify Repository Sync
- Push changes to GitHub
- Wait for EDS to sync (1-2 minutes)
- Hard refresh preview URL

---

## 📋 Quick Diagnostic Checklist

Run these checks in order:

- [ ] **Console Errors:** No red errors in console?
- [ ] **Block Status:** All blocks show "loaded" status?
- [ ] **CSS Loading:** All CSS files return 200 in Network tab?
- [ ] **Block Classes:** Blocks have correct class names?
- [ ] **CSS Variables:** CSS variables are defined?
- [ ] **Cache Cleared:** Browser cache cleared?
- [ ] **Repository Synced:** Latest code pushed to GitHub?

---

## 🎯 Expected Visual Appearance

### Hero Block Should Show:
- Large banner area (min-height: 400px)
- Centered content
- Gradient background (if no image)
- Large heading text
- Call-to-action button

### Plans Block Should Show:
- 3 plan cards in a grid (desktop)
- Each card with:
  - Border and rounded corners
  - Padding
  - Plan title, price, features list
  - CTA button
- Hover effects on cards
- Featured plan highlighted

### Features Block Should Show:
- Grid of feature items (4 columns on desktop)
- Each feature with:
  - Icon area (if icon provided)
  - Title
  - Description text
- Centered alignment

---

## 🚨 If Still Not Working

1. **Share Screenshot:**
   - What you see vs. what you expect
   - Browser console errors
   - Network tab showing CSS files

2. **Check Browser Compatibility:**
   - Try different browser (Chrome, Firefox, Edge)
   - Disable browser extensions
   - Try incognito/private mode

3. **Verify File Structure:**
   - Confirm all block files exist
   - Check file names match exactly
   - Verify CSS syntax is correct

---

## 📞 Next Steps

If you've tried all above and still have issues:

1. Check the detailed troubleshooting guide: `STYLING-TROUBLESHOOTING.md`
2. Verify EDS documentation: https://www.aem.live/docs/
3. Review block examples in repository

---

**Quick Test URL:** https://main--demolycamobile--surendranr.aem.page/en/

