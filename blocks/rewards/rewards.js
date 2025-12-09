/**
 * Rewards Block
 * Displays reward information with emphasis
 */

export default function decorate(block) {
    const rewardsContainer = document.createElement('div');
    rewardsContainer.className = 'rewards-container';

    // Extract content
    const heading = block.querySelector('h2, h3, h4');
    const amount = block.querySelector('strong, b');
    const description = block.querySelector('p');
    const terms = block.querySelectorAll('p');

    if (heading) {
        const rewardsHeading = document.createElement('h2');
        rewardsHeading.className = 'rewards-heading';
        rewardsHeading.textContent = heading.textContent;
        rewardsContainer.append(rewardsHeading);
    }

    if (amount) {
        const rewardsAmount = document.createElement('div');
        rewardsAmount.className = 'rewards-amount';
        rewardsAmount.textContent = amount.textContent;
        rewardsContainer.append(rewardsAmount);
    }

    if (description) {
        const rewardsDescription = document.createElement('p');
        rewardsDescription.className = 'rewards-description';
        rewardsDescription.textContent = description.textContent;
        rewardsContainer.append(rewardsDescription);
    }

    // Add terms if multiple paragraphs exist
    if (terms.length > 1) {
        const rewardsTerms = document.createElement('div');
        rewardsTerms.className = 'rewards-terms';

        const termsTitle = document.createElement('p');
        termsTitle.className = 'rewards-terms-title';
        termsTitle.textContent = 'Terms & Conditions:';
        rewardsTerms.append(termsTitle);

        const termsList = document.createElement('ul');
        termsList.className = 'rewards-terms-list';

        terms.forEach((term, index) => {
            if (index > 0) { // Skip first paragraph (description)
                const li = document.createElement('li');
                li.textContent = term.textContent;
                termsList.append(li);
            }
        });

        rewardsTerms.append(termsList);
        rewardsContainer.append(rewardsTerms);
    }

    block.textContent = '';
    block.append(rewardsContainer);
}
