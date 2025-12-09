/**
 * Topic Cards Block
 * Creates a grid of topic category cards for help sections
 */

export default function decorate(block) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'topic-cards-container';

    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'topic-cards-grid';

    [...block.children].forEach((row) => {
        const card = document.createElement('div');
        card.className = 'topic-card';

        // Extract content from row
        const title = row.querySelector('h2, h3, h4');
        const description = row.querySelector('p');
        const link = row.querySelector('a');

        if (title) {
            const cardTitle = document.createElement('h3');
            cardTitle.className = 'topic-card-title';
            cardTitle.textContent = title.textContent;
            card.append(cardTitle);
        }

        if (description) {
            const cardDescription = document.createElement('p');
            cardDescription.className = 'topic-card-description';
            cardDescription.textContent = description.textContent;
            card.append(cardDescription);
        }

        if (link) {
            const cardLink = document.createElement('a');
            cardLink.className = 'topic-card-link';
            cardLink.href = link.href;
            cardLink.textContent = link.textContent || 'Learn More';
            cardLink.setAttribute('aria-label', `Learn more about ${title?.textContent || 'this topic'}`);
            card.append(cardLink);

            // Make entire card clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target !== cardLink) {
                    cardLink.click();
                }
            });

            // Add keyboard support
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    cardLink.click();
                }
            });
        }

        cardsGrid.append(card);
    });

    cardsContainer.append(cardsGrid);
    block.textContent = '';
    block.append(cardsContainer);
}
