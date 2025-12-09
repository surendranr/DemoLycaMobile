# Verify Block CSS/JS Loading - Diagnostic Guide

## ✅ Verification Checklist

Run these checks to verify CSS and JS files are being called:

---

## 🔍 Step 1: Check Block Files Exist

Verify all block CSS and JS files exist in repository:

```
✅ blocks/hero/hero.css
✅ blocks/hero/hero.js
✅ blocks/plans/plans.css
✅ blocks/plans/plans.js
✅ blocks/features/features.css
✅ blocks/features/features.js
✅ blocks/cards/cards.css
✅ blocks/cards/cards.js
✅ blocks/promo-banner/promo-banner.css
✅ blocks/promo-banner/promo-banner.js
✅ blocks/columns/columns.css
✅ blocks/columns/columns.js
```

**Status:** All files confirmed to exist ✅

---

## 🔍 Step 2: Browser Console Diagnostic

Open your homepage and browser console (F12), then run:

```javascript
// Complete Block Loading Diagnostic
(function() {
  console.log('=== BLOCK CSS/JS LOADING VERIFICATION ===\n');
  
  // 1. Check all blocks
  const blocks = document.querySelectorAll('.block');
  console.log(`1. Total blocks found: ${blocks.length}`);
  
  blocks.forEach((block, idx) => {
    const blockName = block.dataset.blockName;
    const status = block.dataset.blockStatus;
    console.log(`\n   Block ${idx + 1}:`);
    console.log(`   - Name: ${blockName}`);
    console.log(`   - Status: ${status}`);
    console.log(`   - Classes: ${block.className}`);
    
    // Check if CSS is in DOM
    const cssLink = document.querySelector(`link[href*="/blocks/${blockName}/${blockName}.css"]`);
    console.log(`   - CSS in DOM: ${cssLink ? '✅ YES' : '❌ NO'}`);
    
    // Check if CSS is loaded
    const cssLoaded = Array.from(document.styleSheets).some(sheet => {
      try {
        return sheet.href && sheet.href.includes(`/blocks/${blockName}/${blockName}.css`);
      } catch (e) {
        return false;
      }
    });
    console.log(`   - CSS loaded: ${cssLoaded ? '✅ YES' : '❌ NO'}`);
    
    // Check computed styles
    if (cssLoaded && blockName === 'hero') {
      const styles = getComputedStyle(block);
      console.log(`   - Hero padding: ${styles.padding}`);
      console.log(`   - Hero display: ${styles.display}`);
    }
  });
  
  // 2. Check sections
  const sections = document.querySelectorAll('.section');
  console.log(`\n2. Total sections: ${sections.length}`);
  sections.forEach((section, idx) => {
    console.log(`   Section ${idx + 1}: Status = ${section.dataset.sectionStatus || 'none'}`);
  });
  
  // 3. Check for undecorated blocks
  const potentialBlocks = document.querySelectorAll('div.section > div > div');
  const undecorated = Array.from(potentialBlocks).filter(div => !div.classList.contains('block'));
  console.log(`\n3. Undecorated divs: ${undecorated.length}`);
  
  if (undecorated.length > 0) {
    console.log('   ⚠️ WARNING: Some divs are not decorated as blocks!');
    undecorated.forEach((div, idx) => {
      console.log(`   Div ${idx + 1}: First class = "${div.classList[0] || 'none'}"`);
    });
  }
  
  // 4. Network check instruction
  console.log('\n4. Network Tab Check:');
  console.log('   → Open Network tab → Filter by "CSS"');
  console.log('   → Reload page');
  console.log('   → Verify these files load with 200 status:');
  ['hero', 'plans', 'features', 'cards', 'promo-banner', 'columns'].forEach(name => {
    console.log(`      - /blocks/${name}/${name}.css`);
  });
  
  // 5. Summary
  const allLoaded = Array.from(blocks).every(b => b.dataset.blockStatus === 'loaded');
  const allHaveNames = Array.from(blocks).every(b => b.dataset.blockName);
  
  console.log('\n=== SUMMARY ===');
  console.log(`All blocks loaded: ${allLoaded ? '✅ YES' : '❌ NO'}`);
  console.log(`All blocks have names: ${allHaveNames ? '✅ YES' : '❌ NO'}`);
  
  if (!allLoaded) {
    console.log('\n⚠️ ISSUE: Some blocks are not loading properly');
    console.log('   Check console for JavaScript errors');
  }
  
  if (!allHaveNames) {
    console.log('\n⚠️ ISSUE: Some blocks missing block names');
    console.log('   Block decoration is not working correctly');
  }
  
  if (undecorated.length > 0) {
    console.log('\n⚠️ ISSUE: Some divs are not being decorated as blocks');
    console.log('   Check markdown format - block names must match folder names');
  }
})();
```

---

## 🔍 Step 3: Network Tab Verification

1. Open DevTools → **Network** tab
2. Filter by **"CSS"**
3. **Reload page** (Ctrl+R or Cmd+R)
4. Look for these files:

**Expected Files:**
- ✅ `/blocks/hero/hero.css` → Status: 200
- ✅ `/blocks/plans/plans.css` → Status: 200
- ✅ `/blocks/features/features.css` → Status: 200
- ✅ `/blocks/cards/cards.css` → Status: 200
- ✅ `/blocks/promo-banner/promo-banner.css` → Status: 200
- ✅ `/blocks/columns/columns.css` → Status: 200

**If files show 404:**
- Files don't exist in repository
- Wrong file paths
- Repository not synced

---

## 🔍 Step 4: Verify Block Decoration

The key issue is in `decorateBlock()` function:

```javascript
function decorateBlock(block) {
  const shortBlockName = block.classList[0];  // ← Gets FIRST class name
  if (shortBlockName) {
    block.classList.add('block');
    block.dataset.blockName = shortBlockName;
    // ...
  }
}
```

**Critical Requirement:**
- The div selected by `div.section > div > div` MUST have the block name as its FIRST class
- Example: `<div class="hero">` (not `<div class="some-other-class hero">`)

**Check in console:**
```javascript
// Check HTML structure
document.querySelectorAll('div.section > div > div').forEach(div => {
  console.log('Div classes:', div.className);
  console.log('First class:', div.classList[0]);
});
```

---

## 🔍 Step 5: Inspect Element

Right-click on any block → **Inspect Element**

**Look for:**
1. Block has class `block` and block name (e.g., `hero`)
2. Block has `data-block-name="hero"` attribute
3. Block has `data-block-status="loaded"` attribute
4. CSS classes from block CSS are applied

**Example Structure:**
```html
<div class="section hero-container">
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

## 🎯 Expected Results

### ✅ Everything Working:
- Console shows all blocks with `status="loaded"`
- Network tab shows all CSS files with 200 status
- Inspected elements show block classes and data attributes
- Styles are applied (colors, layouts, spacing)

### ❌ Problems to Fix:

**Problem 1: Blocks show `status="initialized"`**
- **Cause:** Blocks not loading CSS/JS
- **Fix:** Check console for JavaScript errors
- **Check:** Network tab for 404 errors on CSS/JS files

**Problem 2: Blocks don't have `data-block-name`**
- **Cause:** Block decoration failing
- **Fix:** Check HTML structure - div needs block name as first class
- **Check:** Markdown conversion is creating correct structure

**Problem 3: CSS files return 404**
- **Cause:** Files don't exist or wrong paths
- **Fix:** Verify files exist in repository
- **Check:** File names match exactly (lowercase, kebab-case)

**Problem 4: CSS loads but styles don't apply**
- **Cause:** CSS specificity or syntax errors
- **Fix:** Check CSS file content
- **Check:** Browser cache (clear and reload)

---

## 📋 Quick Verification Command

Copy and paste this entire block into browser console:

```javascript
// Quick verification
const blocks = document.querySelectorAll('.block');
console.log('Blocks:', blocks.length);
blocks.forEach(b => console.log(
  b.dataset.blockName, 
  b.dataset.blockStatus,
  document.querySelector(`link[href*="/blocks/${b.dataset.blockName}/${b.dataset.blockName}.css"]`) ? 'CSS✅' : 'CSS❌'
));
```

**Expected Output:**
```
hero loaded CSS✅
promo-banner loaded CSS✅
plans loaded CSS✅
features loaded CSS✅
cards loaded CSS✅
columns loaded CSS✅
```

---

## 🛠️ If CSS/JS Not Loading

### Fix 1: Check Block Names Match
- Markdown: `# Hero` → Folder: `blocks/hero/`
- Markdown: `# Promo Banner` → Folder: `blocks/promo-banner/`

### Fix 2: Verify File Names
- CSS: `hero.css` (not `Hero.css` or `hero.CSS`)
- JS: `hero.js` (not `Hero.js` or `hero.JS`)

### Fix 3: Check Repository Sync
- Push all changes to GitHub
- Wait for EDS to sync (1-2 minutes)
- Hard refresh page (Ctrl+Shift+R)

### Fix 4: Clear Cache
- DevTools → Application → Clear Storage
- Or: Hard reload (Ctrl+Shift+R / Cmd+Shift+R)

---

## 📞 Next Steps

1. Run the diagnostic script above
2. Check Network tab for CSS files
3. Inspect elements to verify structure
4. Share results if issues persist

---

**All block files exist in repository ✅**
**Loading mechanism is in place ✅**
**Issue likely: Block decoration or file path matching**

