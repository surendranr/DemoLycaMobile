export default function decorate(block) {
  const contactUsContainer = document.createElement('div');
  contactUsContainer.classList.add('contact-us');

  // Row 0: Heading row
  const headingRow = block.children[0];
  if (headingRow && headingRow.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.classList.add('contact-us-heading');
    heading.textContent = headingRow.textContent.trim();
    contactUsContainer.append(heading);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('contact-us-cards-wrapper');

  // Cards start from row 1
  // For this block, we assume only one row of cards based on the screenshot
  const cardsRow = block.children[1];
  if (cardsRow) {
    [...cardsRow.children].forEach((column) => {
      let clickableElement = column.querySelector('a');
      const isLink = !!clickableElement;

      if (!isLink) {
        clickableElement = document.createElement('div');
        clickableElement.setAttribute('role', 'button');
      }

      clickableElement.classList.add('contact-us-item');

      const imageNodes = Array.from(column.querySelectorAll('picture'));
      let topicIcon = null;
      let arrowIcon = null;

      if (imageNodes[0]) {
        topicIcon = imageNodes[0].cloneNode(true);
      }
      if (imageNodes[1]) {
        arrowIcon = imageNodes[1].cloneNode(true);
      }

      let topicTextContent = '';
      const tempDiv = document.createElement('div');
      const clonedColumn = column.cloneNode(true);

      clonedColumn.querySelectorAll('picture, img, a').forEach(el => el.remove());
      tempDiv.innerHTML = clonedColumn.innerHTML;
      topicTextContent = tempDiv.textContent.trim();

      const topicTextSpan = document.createElement('span');
      topicTextSpan.classList.add('contact-us-text');
      topicTextSpan.textContent = topicTextContent;

      if (isLink) {
        clickableElement.innerHTML = '';
      } else {
        clickableElement.innerHTML = '';
      }

      if (topicIcon) {
        topicIcon.classList.add('contact-us-icon');
        clickableElement.append(topicIcon);
      }
      clickableElement.append(topicTextSpan);
      if (arrowIcon) {
        arrowIcon.classList.add('contact-us-arrow');
        clickableElement.append(arrowIcon);
      }

      cardsWrapper.append(clickableElement);
    });
  }

  contactUsContainer.append(cardsWrapper);
  block.innerHTML = '';
  block.append(contactUsContainer);
}
