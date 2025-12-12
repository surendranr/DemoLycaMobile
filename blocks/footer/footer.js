import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
    const footerMeta = getMetadata('footer');
    block.textContent = '';

    // load footer fragment
    const footerPath = footerMeta ? new URL(footerMeta).pathname : '/footer';
    const fragment = await loadFragment(footerPath);

    if (fragment) {
        const footer = document.createElement('div');
        while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

        // Identify all discrete blocks/tables in the fragment
        const structuralElements = footer.querySelectorAll('.block, table, .section');
        // If we found specific structure, use it. Otherwise fallback to just children?
        // Let's filter to avoid "section" if it contains the block.
        // Actually, loadFragment puts things in sections.
        // If we have sections, use sections?
        // Let's rely on the fact that the documented authoring is "Table 1" then "Table 2".
        // These might be raw tables or wrapper blocks.

        let contentSources = [];

        // Strategy: Find top-level meaningful containers
        // If we find .block, use those.
        const blocks = footer.querySelectorAll('.block');
        if (blocks.length > 0) {
            contentSources = Array.from(blocks);
        } else {
            const tables = footer.querySelectorAll('table');
            if (tables.length > 0) {
                contentSources = Array.from(tables);
            } else {
                // Sections?
                const sections = footer.querySelectorAll('.section');
                if (sections.length > 0) contentSources = Array.from(sections);
            }
        }

        // Process Main Footer (First Source)
        if (contentSources.length > 0) {
            const linksContainer = document.createElement('div');
            linksContainer.classList.add('footer-links-container');
            processLinksSection(contentSources[0], linksContainer);
            decorateIcons(linksContainer);
            block.append(linksContainer);
        }

        // Process Secondary Footer (Second Source)
        if (contentSources.length > 1) {
            const bottomContainer = document.createElement('div');
            bottomContainer.classList.add('footer-bottom-container');
            processBottomSection(contentSources[1], bottomContainer);
            decorateIcons(bottomContainer);
            block.append(bottomContainer);
        } else if (contentSources.length === 0 && footer.children.length > 0) {
            // Fallback: Just dump everything to links
            const linksContainer = document.createElement('div');
            linksContainer.classList.add('footer-links-container');
            const colDiv = document.createElement('div');
            while (footer.firstChild) colDiv.append(footer.firstChild);
            cleanupButtons(colDiv);
            linksContainer.append(colDiv);
            block.append(linksContainer);
        }
    }
}

function processLinksSection(source, container) {
    let rawRows = [];

    if (source.tagName === 'TABLE') {
        rawRows = Array.from(source.querySelectorAll('tr'));
    } else if (source.classList.contains('block') || source.classList.contains('section')) {
        // If it's a section, it might contain a block or a table inside?
        // If we selected sections, we need to inspect inside.
        // Assuming simple case: The source IS the grid container (rows -> cols)
        // If it's a block (divs), children are rows.
        // If it's a section, it might be just a wrapper.
        if (source.querySelector('table')) {
            rawRows = Array.from(source.querySelector('table').querySelectorAll('tr'));
        } else if (source.querySelector('.block')) {
            rawRows = Array.from(source.querySelector('.block').children);
        } else {
            // Direct children are rows?
            rawRows = Array.from(source.children);
        }
    }

    let colsToProcess = [];

    if (rawRows.length > 0) {
        const numCols = rawRows[0].children.length;
        // If it's a section with just P tags, numCols might be 0/undefined if distinct children.
        // Check if rows[0] has children.
        if (numCols > 0) {
            for (let i = 0; i < numCols; i++) {
                const colDiv = document.createElement('div');
                rawRows.forEach(row => {
                    if (row.children[i]) arrayToCol(row.children[i], colDiv);
                });
                colsToProcess.push(colDiv);
            }
        } else {
            // Fallback single blob
            const colDiv = document.createElement('div');
            colDiv.append(...Array.from(source.children).map(n => n.cloneNode(true)));
            colsToProcess.push(colDiv);
        }
    } else {
        // Fallback
        const colDiv = document.createElement('div');
        arrayToCol(source, colDiv);
        colsToProcess.push(colDiv);
    }

    // Cleanup buttons
    colsToProcess.forEach(col => cleanupButtons(col));

    // Append to Container
    colsToProcess.forEach((col, index) => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('footer-column');
        const contentSource = col;

        const isAppColumn = (index === colsToProcess.length - 1) && (colsToProcess.length > 1);

        if (isAppColumn) {
            colDiv.classList.add('app-column');
            const appButtons = document.createElement('div');
            appButtons.classList.add('app-buttons');

            const pictures = contentSource.querySelectorAll('picture, a:has(img), a:has(picture)');
            const nodesToMove = [];

            pictures.forEach(p => {
                if (p.textContent.trim().toLowerCase().includes('store locator') && !p.querySelector('.icon-location')) {
                    p.classList.add('store-locator-btn');
                    const icon = document.createElement('span');
                    icon.classList.add('icon-location');
                    p.prepend(icon);
                } else if (!p.classList.contains('store-locator-btn')) {
                    p.classList.add('app-btn');
                }
                nodesToMove.push(p);
            });

            contentSource.querySelectorAll('a').forEach(a => {
                if (a.textContent.toLowerCase().includes('store locator') && !nodesToMove.includes(a) && !a.closest('.app-btn')) {
                    a.classList.add('store-locator-btn');
                    if (!a.querySelector('.icon-location')) {
                        const icon = document.createElement('span');
                        icon.classList.add('icon-location');
                        a.prepend(icon);
                    }
                    nodesToMove.push(a);
                }
            });

            nodesToMove.forEach(n => appButtons.append(n));

            Array.from(contentSource.childNodes).forEach(node => {
                if (!appButtons.contains(node) && !nodesToMove.includes(node)) {
                    if (node.nodeType === 3 && !node.textContent.trim()) return;
                    if (node.nodeType === 1 && !node.textContent.trim() && node.children.length === 0) return;
                    if (node.parentNode === contentSource) {
                        colDiv.append(node);
                    }
                }
            });

            colDiv.append(appButtons);
        } else {
            while (contentSource.firstChild) {
                colDiv.append(contentSource.firstChild);
            }
        }
        container.append(colDiv);
    });
}

function processBottomSection(source, container) {
    // Expecting 3 columns: Logo, Text, Socials
    // Extract columns similar to pivot logic, or simply assume it's a 1-row table?
    // User Instructions: "Second Table, 1 Row, 3 Columns"

    let rawCols = [];

    if (source.tagName === 'TABLE') {
        const rows = source.querySelectorAll('tr');
        if (rows.length > 0) rawCols = Array.from(rows[0].children);
    } else if (source.classList.contains('block') || source.classList.contains('section')) {
        // If generic block, children are Rows.
        // We expect 1 Row.
        let rows = [];
        if (source.querySelector('table')) {
            rows = Array.from(source.querySelector('table').querySelectorAll('tr'));
        } else if (source.querySelector('.block')) {
            rows = Array.from(source.querySelector('.block').children);
        } else {
            rows = Array.from(source.children);
        }

        if (rows.length > 0) {
            rawCols = Array.from(rows[0].children);
        }
    }

    if (rawCols.length === 0) return; // distinct fail

    // Logo (Col 1)
    if (rawCols[0]) {
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('footer-logo');
        arrayToCol(rawCols[0], logoDiv);
        container.append(logoDiv);
    }

    // Copyright (Col 2)
    if (rawCols[1]) {
        const copyrightDiv = document.createElement('div');
        copyrightDiv.classList.add('footer-copyright');
        arrayToCol(rawCols[1], copyrightDiv);
        container.append(copyrightDiv);
    }

    // Socials (Col 3)
    if (rawCols[2]) {
        const socialsDiv = document.createElement('div');
        socialsDiv.classList.add('footer-socials');
        arrayToCol(rawCols[2], socialsDiv);
        container.append(socialsDiv);
    }
}

function cleanupButtons(element) {
    const buttons = element.querySelectorAll('a.button');
    buttons.forEach(btn => {
        btn.classList.remove('button', 'primary', 'secondary');
        if (btn.parentElement.classList.contains('button-container')) {
            btn.parentElement.classList.remove('button-container');
        }
    });
}

function arrayToCol(source, target) {
    Array.from(source.childNodes).forEach(node => target.append(node.cloneNode(true)));
}
