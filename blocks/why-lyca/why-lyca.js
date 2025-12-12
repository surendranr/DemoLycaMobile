export default function decorate(block) {
    // Add a class for the main container customization
    block.classList.add('why-lyca-container');

    const rows = [...block.children];
    let itemsRow = rows[0];

    // Check if we have a separate title row
    // Logic: If there are 2 rows, the first one is likely the title.
    // Or if the first row has only 1 column and it's text.
    if (rows.length > 1) {
        const titleRow = rows[0];
        itemsRow = rows[1]; // Assume the second row contains the 3 columns

        // Extract title
        const titleText = titleRow.innerText.trim();
        if (titleText) {
            const h2 = document.createElement('h2');
            h2.innerText = titleText;
            h2.classList.add('why-lyca-section-title');
            block.prepend(h2);
        }

        // Remove the title row from the block structure so it doesn't get processed as an item
        titleRow.remove();
    }

    // Process the items row (now just 'itemsRow', or if only 1 row existed, that one)
    // We need to ensure we are working with the row that is currently in the block (if we didn't remove it)
    // If we removed titleRow, rows[1] is still in block but block.children might have changed indices?
    // Easier to just work with what's remaining in block.children if we assume it's just one row of items now.

    // Re-fetch children to be safe or just use the logic below
    const contentRows = [...block.children].filter(r => r.tagName === 'DIV' && !r.classList.contains('why-lyca-section-title')); // Exclude our new H2 if we appended it inside (we helper prepend it to block, but block.children includes it? no, block is div, h2 is child)

    // Actually, we prepended H2 to block. So block.children includes H2.
    // But our loop below iterates over block.children.
    // We should make sure we only iterate over the content/item rows.

    contentRows.forEach((row) => {
        if (row.tagName !== 'DIV') return; // skip h2 if it ended up here
        if (row.querySelector('h2.why-lyca-section-title')) return; // skip if it's the wrapper for title (shouldn't happen if we removed the original row)

        row.classList.add('why-lyca-row');

        // iterate over columns (should be 3 usually, or 1 if stacked in authoring)
        [...row.children].forEach((col) => {
            col.classList.add('why-lyca-item');

            // Attempt to identify content inside
            const pic = col.querySelector('picture');
            const h3 = col.querySelector('h3, h4, strong');
            const paragraphs = col.querySelectorAll('p');
            const a = col.querySelector('a');

            // Icon Handling
            if (pic) {
                const iconWrapper = document.createElement('div');
                iconWrapper.classList.add('why-lyca-icon');
                iconWrapper.append(pic);
                // If the picture was wrapped in a P, unwrap it or just move it
                col.prepend(iconWrapper);
            }

            // Title Handling
            if (h3) {
                if (h3.tagName === 'STRONG') {
                    const newH3 = document.createElement('h3');
                    newH3.innerHTML = h3.innerHTML;
                    h3.replaceWith(newH3);
                    newH3.classList.add('why-lyca-title');
                } else {
                    h3.classList.add('why-lyca-title');
                }
            }

            // Text Handling (exclude icon and link)
            const textWrapper = document.createElement('div');
            textWrapper.classList.add('why-lyca-text');
            paragraphs.forEach((para) => {
                if (!para.querySelector('picture') && !para.querySelector('a') && !para.querySelector('strong')) {
                    textWrapper.append(para);
                } else if (para.querySelector('strong') && !para.querySelector('picture') && !para.querySelector('a')) {
                    if (para.innerText.trim().length > 0) {
                        textWrapper.append(para);
                    }
                }
            });

            const titleEl = col.querySelector('.why-lyca-title');
            if (titleEl) {
                titleEl.after(textWrapper);
            } else {
                const iconEl = col.querySelector('.why-lyca-icon');
                if (iconEl) iconEl.after(textWrapper);
            }

            // Link Handling
            if (a) {
                if (a.tagName === 'A') {
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                }

                const linkWrapper = document.createElement('div');
                linkWrapper.classList.add('why-lyca-link');
                linkWrapper.append(a);
                col.append(linkWrapper);
            }
        });
    });
}
