
export default function decorate(block) {
    // 1. Identify rows
    const rows = [...block.children];
    const headerRow = rows[0];
    const contentRow = rows[1];

    // 2. Class Names & Setup
    block.classList.add('sim-plans-wrapper');

    // 3. Process Header
    if (headerRow) {
        headerRow.classList.add('sim-plans-header');

        // Apply classes to headings and paragraphs
        const headings = headerRow.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((h) => h.classList.add('sim-plans-title'));

        const p = headerRow.querySelectorAll('p');
        p.forEach((text) => text.classList.add('sim-plans-subtitle'));
    }

    // 4. Process Plan Items
    if (contentRow) {
        contentRow.classList.add('sim-plans-grid');
        const cols = [...contentRow.children];

        cols.forEach((col) => {
            col.classList.add('sim-plans-item');

            // Ensure image spans full width
            const pic = col.querySelector('picture');
            if (pic) {
                pic.classList.add('sim-plans-image');
            }
        });
    }
}
