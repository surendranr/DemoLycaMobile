import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Preserves Universal Editor instrumentation attributes from source to target element.
 * @param {Element} source - Source element with potential data-aue-* attributes
 * @param {Element} target - Target element to copy attributes to
 */
function preserveAueAttributes(source, target) {
  if (!source || !target) return;
  Array.from(source.attributes)
    .filter((attr) => attr.name.startsWith('data-aue-'))
    .forEach((attr) => target.setAttribute(attr.name, attr.value));
}

export default function decorate(block) {
  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-wrapper';

  // Preserve Universal Editor attributes from block to wrapper
  preserveAueAttributes(block, heroWrapper);

  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  let hasImage = false;
  let imageElement = null;

  [...block.children].forEach((row) => {
    // Check for image/picture first
    if (row.querySelector('picture') || row.querySelector('img')) {
      hasImage = true;
      const img = row.querySelector('img');
      if (img) {
        imageElement = createOptimizedPicture(img.src, img.alt || 'Hero image', false, [{ width: '2000' }]);
        imageElement.classList.add('hero-background');
      }
    } else if (row.tagName === 'H1' || row.tagName === 'H2') {
      // Handle headings
      const heading = document.createElement('h1');
      heading.className = 'hero-heading';
      heading.innerHTML = row.innerHTML;
      heroContent.append(heading);
    } else if (row.tagName === 'P') {
      // Handle paragraphs/description
      const paragraph = document.createElement('p');
      paragraph.className = 'hero-description';
      paragraph.innerHTML = row.innerHTML;
      heroContent.append(paragraph);
    } else if (row.querySelector('a.button') || row.classList.contains('button-container')) {
      // Handle buttons/CTAs
      const cta = document.createElement('div');
      cta.className = 'hero-cta';
      cta.innerHTML = row.innerHTML;
      heroContent.append(cta);
    } else {
      // Handle other content
      const content = document.createElement('div');
      content.className = 'hero-text';
      content.innerHTML = row.innerHTML;
      heroContent.append(content);
    }
  });

  // Add background image if present
  if (hasImage && imageElement) {
    heroWrapper.append(imageElement);
  }

  heroWrapper.append(heroContent);
  block.textContent = '';
  block.append(heroWrapper);
}
