/**
 * Steps Block
 * Creates a visual process steps display (How it works)
 */

export default function decorate(block) {
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'steps-container';

    const stepsList = document.createElement('div');
    stepsList.className = 'steps-list';

    [...block.children].forEach((row, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';

        // Create step number
        const stepNumber = document.createElement('div');
        stepNumber.className = 'step-number';
        stepNumber.textContent = index + 1;
        stepNumber.setAttribute('aria-label', `Step ${index + 1}`);

        // Create step content
        const stepContent = document.createElement('div');
        stepContent.className = 'step-content';

        // Extract title and description
        const title = row.querySelector('h2, h3, h4');
        const description = row.querySelector('p');

        if (title) {
            const stepTitle = document.createElement('h3');
            stepTitle.className = 'step-title';
            stepTitle.textContent = title.textContent;
            stepContent.append(stepTitle);
        }

        if (description) {
            const stepDescription = document.createElement('p');
            stepDescription.className = 'step-description';
            stepDescription.textContent = description.textContent;
            stepContent.append(stepDescription);
        }

        stepItem.append(stepNumber, stepContent);
        stepsList.append(stepItem);
    });

    stepsContainer.append(stepsList);
    block.textContent = '';
    block.append(stepsContainer);
}
