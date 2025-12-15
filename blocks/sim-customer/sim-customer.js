export default function decorate(block) {
  const card = document.createElement('div');
  card.classList.add('sim-customer-card');

  const rows = [...block.children];
  if (rows.length === 0) return;

  // Row 0: Heading
  const headingRow = rows[0];
  if (headingRow) {
    const heading = document.createElement('h2');
    heading.classList.add('sim-customer-card-heading');
    heading.textContent = headingRow.textContent.trim();
    card.append(heading);
  }

  // Last Row: Arrow Link (assuming it contains the arrow image/link)
  const arrowRow = rows[rows.length - 1];
  let arrowLinkWrapper = null;

  // Check if last row is indeed the arrow (has img or link)
  if (arrowRow && (arrowRow.querySelector('img') || arrowRow.querySelector('a'))) {
    arrowLinkWrapper = document.createElement('div');
    arrowLinkWrapper.classList.add('sim-customer-card-arrow-link-wrapper');

    const linkElement = arrowRow.querySelector('a');
    const imageElement = arrowRow.querySelector('img');
    // Look for picture tag in case it's wrapped
    const pictureElement = arrowRow.querySelector('picture');

    const imageToUse = pictureElement || imageElement;

    if (linkElement) {
      linkElement.classList.add('sim-customer-card-arrow-link');
      if (imageToUse) {
        // Ensure image is inside link
        if (!linkElement.contains(imageToUse)) {
          linkElement.innerHTML = '';
          linkElement.append(imageToUse);
        }
        imageToUse.classList.add('sim-customer-card-arrow-icon');
      }
      arrowLinkWrapper.append(linkElement);
    } else if (imageToUse) {
      // Fallback if just image
      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.classList.add('sim-customer-card-arrow-link');
      imageToUse.classList.add('sim-customer-card-arrow-icon');
      anchor.append(imageToUse);
      arrowLinkWrapper.append(anchor);
    }
  }

  // Middle Rows: Options
  // Iterate from index 1 to length - (arrowRow ? 1 : 0)
  const optionsList = document.createElement('ul');
  optionsList.classList.add('sim-customer-card-options');

  const endIndex = arrowLinkWrapper ? rows.length - 1 : rows.length;

  for (let i = 1; i < endIndex; i++) {
    const row = rows[i];
    if (row.textContent.trim()) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.classList.add('icon-checkmark');
      li.append(span);

      const textNode = document.createTextNode(row.textContent.trim());
      li.append(textNode);
      optionsList.append(li);
    }
  }

  if (optionsList.children.length > 0) {
    card.append(optionsList);
  }

  if (arrowLinkWrapper) {
    card.append(arrowLinkWrapper);
  }

  block.innerHTML = '';
  block.append(card);
}
