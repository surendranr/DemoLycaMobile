/**
 * Accordion Block
 * Creates expandable/collapsible FAQ sections
 */

export default function decorate(block) {
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  [...block.children].forEach((row, index) => {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';

    // First child is the question/title
    const question = row.children[0];
    if (question) {
      const accordionHeader = document.createElement('button');
      accordionHeader.className = 'accordion-header';
      accordionHeader.setAttribute('aria-expanded', 'false');
      accordionHeader.setAttribute('aria-controls', `accordion-content-${index}`);
      accordionHeader.id = `accordion-header-${index}`;

      const questionText = document.createElement('span');
      questionText.className = 'accordion-question';
      questionText.textContent = question.textContent;

      const icon = document.createElement('span');
      icon.className = 'accordion-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '+';

      accordionHeader.append(questionText, icon);
      accordionItem.append(accordionHeader);

      // Second child is the answer/content
      const answer = row.children[1];
      if (answer) {
        const accordionContent = document.createElement('div');
        accordionContent.className = 'accordion-content';
        accordionContent.id = `accordion-content-${index}`;
        accordionContent.setAttribute('aria-labelledby', `accordion-header-${index}`);
        accordionContent.setAttribute('role', 'region');
        accordionContent.setAttribute('hidden', '');

        const accordionBody = document.createElement('div');
        accordionBody.className = 'accordion-body';
        accordionBody.innerHTML = answer.innerHTML;

        accordionContent.append(accordionBody);
        accordionItem.append(accordionContent);

        // Add click event listener
        accordionHeader.addEventListener('click', () => {
          const isExpanded = accordionHeader.getAttribute('aria-expanded') === 'true';

          // Toggle current item
          accordionHeader.setAttribute('aria-expanded', !isExpanded);
          icon.textContent = isExpanded ? '+' : '−';

          if (isExpanded) {
            accordionContent.setAttribute('hidden', '');
            accordionContent.style.maxHeight = null;
          } else {
            accordionContent.removeAttribute('hidden');
            accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
          }
        });
      }
    }

    accordionContainer.append(accordionItem);
  });

  block.textContent = '';
  block.append(accordionContainer);
}
