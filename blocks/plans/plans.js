import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const plansContainer = document.createElement('div');
  plansContainer.className = 'plans-container';
  
  const plansList = document.createElement('div');
  plansList.className = 'plans-list';
  
  [...block.children].forEach((row, index) => {
    const planCard = document.createElement('div');
    planCard.className = 'plan-card';
    
    // Check if this is a featured plan
    if (row.classList.contains('featured')) {
      planCard.classList.add('plan-featured');
    }
    
    while (row.firstElementChild) {
      const child = row.firstElementChild;
      
      // Handle images
      if (child.querySelector('picture')) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'plan-image';
        const picture = child.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            picture.replaceWith(createOptimizedPicture(img.src, img.alt || `Plan ${index + 1}`, false, [{ width: '400' }]));
            imageWrapper.append(picture);
          }
        }
        planCard.append(imageWrapper);
      }
      // Handle headings (plan name)
      else if (child.tagName === 'H2' || child.tagName === 'H3') {
        const title = document.createElement('h3');
        title.className = 'plan-title';
        title.textContent = child.textContent;
        planCard.append(title);
      }
      // Handle price
      else if (child.textContent.includes('£') || child.textContent.includes('per month')) {
        const price = document.createElement('div');
        price.className = 'plan-price';
        price.innerHTML = child.innerHTML;
        planCard.append(price);
      }
      // Handle features list
      else if (child.tagName === 'UL' || child.querySelector('ul')) {
        const features = document.createElement('ul');
        features.className = 'plan-features';
        const listItems = child.querySelectorAll('li') || child.children;
        listItems.forEach((li) => {
          const feature = document.createElement('li');
          feature.innerHTML = li.innerHTML || li.textContent;
          features.append(feature);
        });
        planCard.append(features);
      }
      // Handle buttons/CTAs
      else if (child.querySelector('a.button') || child.classList.contains('button-container')) {
        const cta = document.createElement('div');
        cta.className = 'plan-cta';
        cta.innerHTML = child.innerHTML;
        planCard.append(cta);
      }
      // Handle other content
      else {
        const content = document.createElement('div');
        content.className = 'plan-content';
        content.innerHTML = child.innerHTML;
        planCard.append(content);
      }
    }
    
    plansList.append(planCard);
  });
  
  plansContainer.append(plansList);
  block.textContent = '';
  block.append(plansContainer);
}

