import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const featuresContainer = document.createElement('div');
  featuresContainer.className = 'features-container';

  const featuresList = document.createElement('div');
  featuresList.className = 'features-list';

  [...block.children].forEach((row) => {
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';

    while (row.firstElementChild) {
      const child = row.firstElementChild;

      // Handle icons/images
      if (child.querySelector('picture') || child.querySelector('img')) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'feature-icon';
        const img = child.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '80' }]);
          iconWrapper.append(picture);
        } else {
          iconWrapper.innerHTML = child.innerHTML;
        }
        featureItem.append(iconWrapper);
      }
      // Handle headings
      else if (child.tagName === 'H2' || child.tagName === 'H3' || child.tagName === 'H4') {
        const title = document.createElement('h3');
        title.className = 'feature-title';
        title.textContent = child.textContent;
        featureItem.append(title);
      }
      // Handle description/paragraphs
      else {
        const content = document.createElement('div');
        content.className = 'feature-content';
        content.innerHTML = child.innerHTML;
        featureItem.append(content);
      }
    }

    featuresList.append(featureItem);
  });

  featuresContainer.append(featuresList);
  block.textContent = '';
  block.append(featuresContainer);
}
