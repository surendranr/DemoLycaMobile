import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-wrapper';
  
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
    }
    // Handle headings
    else if (row.tagName === 'H1' || row.tagName === 'H2') {
      const heading = document.createElement('h1');
      heading.className = 'hero-heading';
      heading.innerHTML = row.innerHTML;
      heroContent.append(heading);
    }
    // Handle paragraphs/description
    else if (row.tagName === 'P') {
      const paragraph = document.createElement('p');
      paragraph.className = 'hero-description';
      paragraph.innerHTML = row.innerHTML;
      heroContent.append(paragraph);
    }
    // Handle buttons/CTAs
    else if (row.querySelector('a.button') || row.classList.contains('button-container')) {
      const cta = document.createElement('div');
      cta.className = 'hero-cta';
      cta.innerHTML = row.innerHTML;
      heroContent.append(cta);
    }
    // Handle other content
    else {
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

