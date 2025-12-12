
export default function decorate(block) {
    // 1. Identify rows
    const rows = [...block.children];
    const headerRow = rows[0];
    const itemsRow = rows[1];

    // 2. Class Names & Setup
    block.classList.add('help-options-wrapper');

    // 3. Process Header
    if (headerRow) {
        headerRow.classList.add('help-options-header');

        const headings = headerRow.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((h) => h.classList.add('help-options-title'));
    }

    // 4. Process Grid Items
    if (itemsRow) {
        itemsRow.classList.add('help-options-grid');
        const cols = [...itemsRow.children];

        cols.forEach((col) => {
            col.classList.add('help-options-item');

            // Separate Icon from Text
            const pic = col.querySelector('picture');
            if (pic) {
                const iconWrapper = document.createElement('div');
                iconWrapper.classList.add('help-options-icon');
                pic.parentNode.insertBefore(iconWrapper, pic);
                iconWrapper.appendChild(pic);
            }

            // Remaining content is the text label
            const text = col.querySelector('p:not(:has(picture)), div:not(.help-options-icon)');
            if (text) {
                text.classList.add('help-options-label');
            }
        });
    }
}
