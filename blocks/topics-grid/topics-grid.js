export default function decorate(block) {
  const topicsGridContainer = document.createElement('div');
  topicsGridContainer.classList.add('topics-grid');

  // Heading
  const headingRow = block.children[0];
  if (headingRow && headingRow.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.classList.add('topics-grid-heading');
    heading.textContent = headingRow.textContent.trim();
    topicsGridContainer.append(heading);
  }

  const gridItemsWrapper = document.createElement('div');
  gridItemsWrapper.classList.add('topics-grid-items-wrapper');

  // Grid rows start from index 1
  for (let i = 1; i < block.children.length; i += 1) {
    const gridRow = block.children[i];
    if (gridRow) {
      [...gridRow.children].forEach((column) => {
        // Check if the column has any meaningful content
        const hasContent = column.textContent.trim().length > 0 || column.querySelector('picture, img, a');
        if (!hasContent) {
          const emptyCellPlaceholder = document.createElement('div');
          emptyCellPlaceholder.classList.add('topic-item--empty');
          gridItemsWrapper.append(emptyCellPlaceholder);
          return;
        }

        // Use a (possibly) existing link as clickable element, else div
        let clickableElement = column.querySelector('a');
        let isLink = !!clickableElement;
        if (!isLink) {
          clickableElement = document.createElement('div');
          clickableElement.setAttribute('role', 'button');
        } else {
          // Important: Work with the actual <a>, not a clone. Empty it!
          clickableElement.innerHTML = '';
        }
        clickableElement.classList.add('topic-item');

        // 1. Find the icon and arrow from content
        let topicIcon = null;
        let arrowIcon = null;
        // Strict picture selector to avoid selecting inner imgs
        const imageNodes = Array.from(column.querySelectorAll('picture'));

        if (imageNodes[0]) {
          topicIcon = imageNodes[0].cloneNode(true);
        }
        if (imageNodes[1]) {
          arrowIcon = imageNodes[1].cloneNode(true);
        }

        // 2. Extract just the plain text
        // Remove images and links from a temp copy to get the text
        const tempColumn = column.cloneNode(true);
        tempColumn.querySelectorAll('picture, img, a').forEach(n => n.remove());
        const textContent = tempColumn.textContent.trim();
        const textSpan = document.createElement('span');
        textSpan.classList.add('topic-text');
        textSpan.textContent = textContent;

        // 3. Build structure: Icon (left), Text (center), Arrow (right)
        if (topicIcon) topicIcon.classList.add('topic-icon');
        if (arrowIcon) arrowIcon.classList.add('topic-arrow');

        // Append in order
        if (topicIcon) clickableElement.append(topicIcon);
        clickableElement.append(textSpan);
        if (arrowIcon) clickableElement.append(arrowIcon);

        // Add to grid
        gridItemsWrapper.append(clickableElement);
      });
    }
  }
  topicsGridContainer.append(gridItemsWrapper);
  block.innerHTML = '';
  block.append(topicsGridContainer);
}
