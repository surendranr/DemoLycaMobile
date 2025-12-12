
export default function decorate(block) {
    // 1. Identify rows
    const rows = [...block.children];
    const headerRow = rows[0];
    const itemsRow = rows[1];

    // 2. Class Names & Setup
    block.classList.add('sim-deals-wrapper');

    // 3. Process Header
    if (headerRow) {
        headerRow.classList.add('sim-deals-header');
        // Expecting H2 or H1 and p
        const headings = headerRow.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((h) => h.classList.add('sim-deals-title'));

        const p = headerRow.querySelectorAll('p');
        p.forEach((text) => text.classList.add('sim-deals-subtitle'));
    }

    // 4. Process Grid Items
    if (itemsRow) {
        itemsRow.classList.add('sim-deals-grid');
        const cols = [...itemsRow.children];

        cols.forEach((col) => {
            col.classList.add('sim-deals-item');

            // Identify Icon (Picture) and Text
            const pic = col.querySelector('picture');
            if (pic) {
                const iconWrapper = document.createElement('div');
                iconWrapper.classList.add('sim-deals-icon');
                pic.parentNode.insertBefore(iconWrapper, pic);
                iconWrapper.appendChild(pic);
            }

            // The remaining text is the label
            const text = col.querySelector('p, div:not(.sim-deals-icon)');
            // If text is directly in the div without a P wrapper, we might need to wrap it, 
            // but usually EDS wraps text in p. 
            if (text && !text.classList.contains('sim-deals-icon')) {
                text.classList.add('sim-deals-label');
            }
        });
    }
}
