# Block CSS/JS Loading Verification

## How Block Loading Works in EDS

### Step-by-Step Process:

1. **Markdown Conversion:**
   - `# Hero` in markdown → HTML structure with section and divs

2. **Block Decoration (`decorateBlocks`):**
   - Selects: `div.section > div > div`
   - Looks for first class name on that div
   - Adds class `block` and `data-block-name` attribute

3. **Block Loading (`loadSection` → `loadBlock`):**
   - Finds all `div.block` elements
   - Loads CSS: `/blocks/{blockName}/{blockName}.css`
   - Loads JS: `/blocks/{blockName}/{blockName}.js`
   - Executes JS `decorate()` function

---

## 🔍 Verification Script

Open browser console (F12) and run this diagnostic script:

```javascript
// Block Loading Diagnostic Script
console.log('=== BLOCK LOADING DIAGNOSTIC ===\n');

// 1. Check all sections
const sections = document.querySelectorAll('.section');
console.log('Total sections:', sections.length);
sections.forEach((section, idx) => {
  console.log(`Section ${idx + 1}:`, {
    classes: section.className,
    status: section.dataset.sectionStatus,
    display: getComputedStyle(section).display
  });
});

// 2. Check all blocks
const blocks = document.querySelectorAll('.block');
console.log('\nTotal blocks found:', blocks.length);
blocks.forEach((block, idx) => {
  const blockName = block.dataset.blockName;
  const status = block.dataset.blockStatus;
  const classes = block.className;
  
  console.log(`Block ${idx + 1}:`, {
    name: blockName,
    status: status,
    classes: classes,
    firstClass: block.classList[0]
  });
  
  // Check if CSS is loaded
  const cssLoaded = Array.from(document.styleSheets).some(sheet => {
    try {
      return sheet.href && sheet.href.includes(`/blocks/${blockName}/${blockName}.css`);
    } catch (e) {
      return false;
    }
  });
  
  console.log(`  → CSS loaded: ${cssLoaded ? '✅ YES' : '❌ NO'}`);
});

// 3. Check all divs that should be blocks
const potentialBlocks = document.querySelectorAll('div.section > div > div');
console.log('\nPotential blocks (div.section > div > div):', potentialBlocks.length);
potentialBlocks.forEach((div, idx) => {
  if (!div.classList.contains('block')) {
    console.log(`Potential block ${idx + 1} (NOT decorated):`, {
      classes: div.className,
      firstClass: div.classList[0],
      hasBlockClass: div.classList.contains('block'),
      innerHTML: div.innerHTML.substring(0, 100) + '...'
    });
  }
});

// 4. Check CSS files in Network
console.log('\n=== CHECK NETWORK TAB ===');
console.log('Open Network tab → Filter by "CSS" → Look for:');
console.log('/blocks/hero/hero.css');
console.log('/blocks/plans/plans.css');
console.log('/blocks/features/features.css');
console.log('/blocks/cards/cards.css');
console.log('/blocks/promo-banner/promo-banner.css');
console.log('/blocks/columns/columns.css');

// 5. Verify block name matching
console.log('\n=== BLOCK NAME VERIFICATION ===');
const expectedBlocks = ['hero', 'promo-banner', 'plans', 'features', 'cards', 'columns'];
expectedBlocks.forEach(blockName => {
  const found = Array.from(blocks).some(b => b.dataset.blockName === blockName);
  const fileExists = document.querySelector(`link[href*="/blocks/${blockName}/${blockName}.css"]`);
  console.log(`${blockName}:`, {
    found: found ? '✅' : '❌',
    cssInDOM: fileExists ? '✅' : '❌'
  });
});
```

---

## 📋 Expected Results

### ✅ Good Results:
- Sections have `data-section-status="loaded"`
- Blocks have `data-block-status="loaded"`
- Block names match: `hero`, `plans`, `features`, etc.
- CSS files appear in Network tab (200 status)
- CSS link tags exist in `<head>`

### ❌ Problem Indicators:

**Issue 1: Blocks Not Decorated**
- `potentialBlocks` shows divs without `.block` class
- First class name doesn't match block folder name
- **Fix:** Check markdown format - block name must be first class

**Issue 2: Blocks Not Loading**
- Blocks show `status="initialized"` (not "loaded")
- **Fix:** Check console for JavaScript errors
- Verify block JS files exist

**Issue 3: CSS Not Loading**
- CSS files return 404 in Network tab
- **Fix:** Verify files exist in repository
- Check file paths match exactly

**Issue 4: Wrong Block Names**
- Block name doesn't match folder name
- Example: Block name is `Hero` but folder is `hero`
- **Fix:** EDS converts to lowercase - ensure folder names are lowercase

---

## 🔧 Manual Verification

### Check 1: Inspect HTML Structure

Right-click on page → Inspect → Look for:

```html
<div class="section hero-container">
  <div>
    <div class="block hero" data-block-name="hero" data-block-status="loaded">
      <!-- content -->
    </div>
  </div>
</div>
```

**If structure is different:**
- Block decoration isn't working
- Markdown conversion issue

### Check 2: Network Tab

1. Open DevTools → Network tab
2. Filter: "CSS"
3. Reload page
4. Look for these files:
   - `hero.css` ✅
   - `plans.css` ✅
   - `features.css` ✅
   - etc.

**Status should be 200, not 404**

### Check 3: Console Errors

Look for errors like:
- `failed to load module for hero`
- `failed to load block hero`
- `404 Not Found` for CSS/JS files

---

## 🎯 Block Name Requirements

Block names in markdown `# BlockName` are converted:
- To lowercase: `Hero` → `hero`
- Kebab-case for multi-word: `Promo Banner` → `promo-banner`

**Folder names must match:**
- ✅ `blocks/hero/hero.css`
- ✅ `blocks/promo-banner/promo-banner.css`
- ❌ `blocks/Hero/hero.css` (wrong case)
- ❌ `blocks/promo_banner/promo-banner.css` (wrong separator)

---

## 🚨 Common Issues

### Issue: Blocks Not Being Found

**Symptom:** `decorateBlocks` finds 0 blocks

**Cause:** HTML structure doesn't match selector `div.section > div > div`

**Fix:** Verify markdown is converted correctly. Each `# BlockName` should create:
```
<div class="section">
  <div>
    <div class="blockname">  <!-- This div needs the block name as class -->
      ...
    </div>
  </div>
</div>
```

### Issue: Wrong Block Name Extracted

**Symptom:** Block loads but with wrong name

**Cause:** First class on div doesn't match folder name

**Fix:** Ensure markdown block name matches folder name exactly (case-sensitive after conversion)

### Issue: CSS/JS Files Not Found

**Symptom:** 404 errors in Network tab

**Cause:** File paths don't match or files don't exist

**Fix:** 
1. Verify all files exist: `blocks/{name}/{name}.css` and `blocks/{name}/{name}.js`
2. Check file names match exactly (lowercase, kebab-case)
3. Verify repository is synced

---

## 📝 Quick Test

Run this in console to test a specific block:

```javascript
// Test hero block
const heroBlock = document.querySelector('[data-block-name="hero"]');
if (heroBlock) {
  console.log('Hero block found:', {
    status: heroBlock.dataset.blockStatus,
    classes: heroBlock.className
  });
  
  // Try to load CSS manually
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/blocks/hero/hero.css';
  document.head.appendChild(link);
  console.log('CSS link added - check if styles apply');
} else {
  console.log('Hero block NOT found - decoration issue');
}
```

---

## ✅ Verification Checklist

Run the diagnostic script and verify:

- [ ] All expected blocks are found (8 blocks)
- [ ] All blocks have `status="loaded"`
- [ ] Block names match folder names
- [ ] CSS files load successfully (Network tab)
- [ ] No console errors
- [ ] HTML structure matches expected format
- [ ] Block classes are applied correctly

---

**If all checks pass but styling still doesn't work:**
- CSS files might have syntax errors
- CSS specificity issues
- Browser cache needs clearing
- Check actual CSS content for correct selectors

