export default function decorate(block) {
    block.classList.add('recent-blogs-container');

    const rows = [...block.children];

    // Handle Section Title if present (first row, single column text)
    // Or explicit logic if the authoring guide says Row 1 is always title.
    // Let's assume Row 1 is Title if it has 1 column, or if it says "View our recent blogs"
    // For robustness, let's look at the first row.
    if (rows.length > 0) {
        const firstRow = rows[0];
        // If it's a title row, it usually has text.
        // If it has an image (picture), it's likely a blog item.
        const hasImage = firstRow.querySelector('picture');
        if (!hasImage && firstRow.innerText.trim().length > 0) {
            const titleText = firstRow.innerText.trim();
            const h2 = document.createElement('h2');
            h2.classList.add('recent-blogs-heading');
            h2.innerText = titleText;
            block.prepend(h2);
            firstRow.remove();
        }
    }

    // Wrapper for grid
    const gridWrapper = document.createElement('div');
    gridWrapper.classList.add('recent-blogs-grid');
    block.append(gridWrapper);

    // Remaining rows are blog items
    [...block.children].forEach((row) => {
        if (row.classList.contains('recent-blogs-heading') || row.classList.contains('recent-blogs-grid')) return;

        row.classList.add('recent-blogs-card');

        // We expect 3 columns: Image, Title, Meta
        const cols = [...row.children];
        let picCol, titleCol, metaCol;

        if (cols.length >= 3) {
            [picCol, titleCol, metaCol] = cols;
        } else if (cols.length === 2) {
            // Maybe Image + Content (Title/Meta combined)?
            [picCol, titleCol] = cols;
        } else {
            // Fallback
            picCol = cols[0];
        }

        // specific classes
        if (picCol) picCol.classList.add('recent-blogs-image');
        if (titleCol) titleCol.classList.add('recent-blogs-title-wrapper');
        if (metaCol) metaCol.classList.add('recent-blogs-meta');

        // Structure the card
        // <div class="card">
        //   <div class="image">...</div>
        //   <div class="content">
        //      <h3 class="title">...</h3>
        //      <div class="meta">...</div>
        //   </div>
        // </div>

        // Move content into specific wrappers
        const contentInit = document.createElement('div');
        contentInit.classList.add('recent-blogs-card-content');

        if (titleCol) {
            // Extract H element or strong
            const heading = titleCol.querySelector('h3, h4, h5, h6, strong');
            if (heading) {
                const h3 = document.createElement('h3');
                h3.innerHTML = heading.innerHTML;
                h3.classList.add('recent-blogs-card-title');
                contentInit.append(h3);
            } else {
                // Just text?
                const h3 = document.createElement('h3');
                h3.innerHTML = titleCol.innerHTML;
                h3.classList.add('recent-blogs-card-title');
                contentInit.append(h3);
            }
        }

        if (metaCol) {
            // The meta might be "Date | by Author"
            const p = document.createElement('p');
            p.classList.add('recent-blogs-card-meta');
            p.innerHTML = metaCol.innerHTML;
            contentInit.append(p);
        } else if (cols.length === 2 && titleCol) {
            // Maybe meta is in titleCol? Check for paragraphs.
            const ps = titleCol.querySelectorAll('p');
            // If we grabbed heading from one p, usually others are text.
            // This is getting complex dynamically. Let's stick to the 3-col assumption for authoring guide.
        }

        // Clean up original columns
        row.innerHTML = '';
        if (picCol) row.append(picCol); // Image first
        row.append(contentInit); // Content second

        gridWrapper.append(row);
    });
}
