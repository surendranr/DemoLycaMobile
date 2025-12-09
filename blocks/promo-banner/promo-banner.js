import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const promoContainer = document.createElement('div');
  promoContainer.className = 'promo-container';

  const promoContent = document.createElement('div');
  promoContent.className = 'promo-content';

  let hasImage = false;
  let imageElement = null;

  [...block.children].forEach((row) => {
    // Check for image first
    if (row.querySelector('picture') || row.querySelector('img')) {
      hasImage = true;
      const img = row.querySelector('img');
      if (img) {
        imageElement = createOptimizedPicture(img.src, img.alt || 'Promotional banner', false, [{ width: '1200' }]);
      }
    }
    // Handle headings
    else if (row.tagName === 'H1' || row.tagName === 'H2' || row.tagName === 'H3') {
      const heading = document.createElement('h2');
      heading.className = 'promo-heading';
      heading.textContent = row.textContent;
      promoContent.append(heading);
    }
    // Handle paragraphs/description
    else if (row.tagName === 'P') {
      const paragraph = document.createElement('p');
      paragraph.className = 'promo-description';
      paragraph.innerHTML = row.innerHTML;
      promoContent.append(paragraph);
    }
    // Handle buttons/CTAs
    else if (row.querySelector('a.button') || row.classList.contains('button-container')) {
      const cta = document.createElement('div');
      cta.className = 'promo-cta';
      cta.innerHTML = row.innerHTML;
      promoContent.append(cta);
    }
    // Handle other content
    else {
      const content = document.createElement('div');
      content.className = 'promo-text';
      content.innerHTML = row.innerHTML;
      promoContent.append(content);
    }
  });

  // If there's an image, create a layout with image and content
  if (hasImage && imageElement) {
    const promoImage = document.createElement('div');
    promoImage.className = 'promo-image';
    promoImage.append(imageElement);
    promoContainer.append(promoImage);
    promoContainer.classList.add('promo-with-image');
  }

  promoContainer.append(promoContent);
  block.textContent = '';
  block.append(promoContainer);
}
