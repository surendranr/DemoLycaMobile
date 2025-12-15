export default function decorate(block) {
    const items = [...block.children];
    block.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('faq-container');
    let buttonContainer = null;

    items.forEach((row, rowIndex) => {
        // Check if it's effectively a single column (either 1 child, or multiple where others are empty)
        const isSingleColumn = row.children.length === 1 || (row.children.length > 1 && !row.children[1].textContent.trim());

        if (rowIndex === 0 && isSingleColumn && !row.querySelector('a')) {
            // Heading: First row, single column, no link
            const titleDiv = row.children[0];
            const title = document.createElement('h2');
            title.className = 'faq-title';
            title.textContent = titleDiv.textContent;
            block.append(title);
        } else if (isSingleColumn && row.querySelector('a')) {
            // View More Button: Single column and contains a link
            const buttonDiv = row.children[0];
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'faq-button-container';

            const link = buttonDiv.querySelector('a');
            if (link) {
                link.className = 'button';
                if (link.parentElement.tagName === 'P') {
                    // Unwrap if wrapped in p
                    link.parentElement.replaceWith(link);
                }
                buttonContainer.append(link);
            } else {
                buttonContainer.innerHTML = buttonDiv.innerHTML;
            }
            // Do not append yet, wait until after container
        } else {
            // Standard FAQ Item
            const questionDiv = row.children[0];
            const answerDiv = row.children[1];

            if (questionDiv && answerDiv && questionDiv.textContent.trim()) {
                const item = document.createElement('div');
                item.classList.add('faq-item');

                const questionBtn = document.createElement('button');
                questionBtn.classList.add('faq-question');
                questionBtn.innerHTML = `${questionDiv.textContent} <span class="faq-icon"></span>`;

                const answer = document.createElement('div');
                answer.classList.add('faq-answer');
                answer.innerHTML = answerDiv.innerHTML;

                questionBtn.addEventListener('click', () => {
                    // Close all other items
                    container.querySelectorAll('.faq-item').forEach((i) => {
                        if (i !== item) i.classList.remove('open');
                    });

                    // Toggle current item
                    item.classList.toggle('open');
                });

                item.append(questionBtn, answer);
                container.append(item);
            }
        }
    });

    block.append(container);

    // Append button at the very end
    if (buttonContainer) {
        block.append(buttonContainer);
    }
}
