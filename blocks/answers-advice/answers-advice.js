export default function decorate(block) {
    const container = document.createElement('div');
    container.classList.add('answers-advice-container');

    const rows = [...block.children];
    const grid = document.createElement('div');
    grid.classList.add('answers-advice-grid');

    rows.forEach((row) => {
        // Check if it's a section heading (single column row)
        if (row.children.length === 1) {
            const headingDiv = document.createElement('div');
            headingDiv.classList.add('answers-advice-main-heading');
            const headingContent = row.children[0].querySelector('h1, h2, h3, h4, h5, h6');
            if (headingContent) {
                headingDiv.append(headingContent);
            } else {
                const h2 = document.createElement('h2');
                h2.textContent = row.children[0].textContent.trim();
                headingDiv.append(h2);
            }
            container.append(headingDiv);
        } else {
            // It's a row of cards (multi-column)
            [...row.children].forEach((col) => {
                if (col.textContent.trim() === '') return;

                const card = document.createElement('div');
                card.classList.add('answers-advice-card');

                // --- 1. Header ---
                let titleText = '';
                const firstEl = col.firstElementChild;
                if (firstEl) {
                    titleText = firstEl.textContent.trim();
                    firstEl.remove(); // Remove from DOM
                }

                const cardHeader = document.createElement('div');
                cardHeader.classList.add('answers-advice-card-header');
                const title = document.createElement('h3');
                title.textContent = titleText;
                cardHeader.append(title);
                card.append(cardHeader);

                // --- 2. Body ---
                const cardBody = document.createElement('div');
                cardBody.classList.add('answers-advice-card-body');

                // Identify "View all" link (Search by text content)
                const allLinks = [...col.querySelectorAll('a')];
                let viewAllLink = null;
                let viewAllAnchor = null; // Store original DOM element

                // Find the link that says "View all" (case insensitive)
                const viewAllIndex = allLinks.findIndex(a => a.textContent.trim().toLowerCase() === 'view all');

                if (viewAllIndex !== -1) {
                    viewAllAnchor = allLinks[viewAllIndex]; // Keep reference
                    viewAllLink = viewAllAnchor.cloneNode(true);
                    // Remove from DOM calculation references later, we will exclude it based on text/href matching
                    viewAllLink.classList.remove('button', 'primary', 'secondary');
                } else if (allLinks.length > 0) {
                    // Fallback: If no "View all" text found, SHOULD we take the last link? 
                    // The user said "view all need to be the last hyper link".
                    // If the content doesn't literally say "View all", maybe we shouldn't force a footer link?
                    // But for robustness, let's stick to explicitly finding "View all" for now to avoid the "How to Activate" bug.
                }

                // Create List
                const ul = document.createElement('ul');
                ul.classList.add('answers-advice-list');

                // Process remaining children
                const children = [...col.children];
                children.forEach((child, index) => {
                    // Skip if this child is the View All anchor or contains it
                    if (viewAllAnchor && (child === viewAllAnchor || child.contains(viewAllAnchor))) {
                        // If the container has the link, we might want to check if it has OTHER content too?
                        // But for now, if it's a P with "View All", we skip it.
                        // If it's a huge LIST ITEM with View All, we might skip other links?
                        // Let's refine: Only skip if the *entire* text is basically "View All".
                        // Actually, strict DOM removal is better. 
                        // If we are splitting chunks, we can filter out the chunk that is View All.

                        // If it's the anchor itself (direct child), skip.
                        if (child === viewAllAnchor) return;

                        // If it contains it, we proceed but will filter during processing (unless it's a dedicated wrapper?)
                        // Let's proceed to process 'child' but be careful.
                    }

                    const processContent = (itemContent) => {
                        // Check for <br> (soft returns)
                        if (itemContent.innerHTML.includes('<br>')) {
                            const parts = itemContent.innerHTML.split(/<br\s*\/?>/i);
                            parts.forEach(part => {
                                if (part.trim() === '') return;
                                // Check if this part is just the view all link
                                // This is a string check, approximation.
                                // Better: Create temp div, check text.
                                const temp = document.createElement('div');
                                temp.innerHTML = part;
                                if (viewAllLink && temp.textContent.trim() === viewAllLink.textContent.trim()) return;

                                const newLi = document.createElement('li');
                                newLi.innerHTML = part;
                                newLi.querySelectorAll('a').forEach(a => a.classList.remove('button', 'primary', 'secondary'));
                                if (newLi.textContent.trim()) {
                                    ul.append(newLi);
                                }
                            });
                        } else {
                            // No breaks, single item
                            if (viewAllLink && itemContent.textContent.trim() === viewAllLink.textContent.trim()) return;

                            const newLi = document.createElement('li');
                            newLi.innerHTML = itemContent.innerHTML;
                            newLi.querySelectorAll('a').forEach(a => a.classList.remove('button', 'primary', 'secondary'));
                            if (newLi.textContent.trim()) {
                                ul.append(newLi);
                            }
                        }
                    };

                    if (child.tagName === 'UL') {
                        [...child.children].forEach(item => processContent(item));
                    } else {
                        // Paragraph or other
                        processContent(child);
                    }
                });

                if (ul.children.length > 0) {
                    cardBody.append(ul);
                }

                card.append(cardBody); // Append body now

                // --- 3. Footer Link (Separate Section) ---
                if (viewAllLink) {
                    const footer = document.createElement('div');
                    footer.classList.add('answers-advice-card-footer');
                    footer.append(viewAllLink);
                    card.append(footer);
                }

                grid.append(card);
            });
        }
    });

    if (grid.children.length > 0) {
        container.append(grid);
    }

    block.innerHTML = '';
    block.append(container);
}
