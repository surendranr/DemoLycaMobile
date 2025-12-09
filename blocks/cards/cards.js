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
  /* change to ul, li */
  const ul = document.createElement('ul');

  // Preserve Universal Editor attributes on the list container
  preserveAueAttributes(block, ul);

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Preserve Universal Editor attributes from row to list item
    preserveAueAttributes(row, li);

    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
