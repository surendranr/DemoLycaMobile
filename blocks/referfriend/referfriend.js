
export default function decorate(block) {
    const table = block.querySelector('table');
    let startIconHTML = '';
    let linkText = '';
    let linkURL = '';
    let endIconHTML = '';

    if (table) {
        [...table.querySelectorAll('tbody tr')].forEach((row) => {
            const cols = row.querySelectorAll('td');
            if (cols.length === 2) {
                const property = cols[0].textContent.trim();
                const content = cols[1].innerHTML.trim();
                if (property === 'Start Icon') {
                    startIconHTML = content;
                } else if (property === 'Link Text') {
                    linkText = content;
                } else if (property === 'Link URL') {
                    linkURL = cols[1].textContent.trim(); // Ensure URL is text only
                } else if (property === 'End Icon') {
                    endIconHTML = content;
                }
            }
        });
        table.remove(); // Remove the original table from the block
    }

    if (linkURL && linkText) {
        const referLink = document.createElement('a');
        referLink.href = linkURL;
        referLink.classList.add('refer-friend-link');

        const startIconDiv = document.createElement('div');
        startIconDiv.classList.add('refer-friend-icon', 'start');
        if (startIconHTML) {
            startIconDiv.innerHTML = startIconHTML;
        } else {
            // Fallback or default icon if none is provided in the document
            startIconDiv.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6H4C2.9 6 2.01 6.9 2.01 8L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V12H20V18ZM20 8H4V6H20V8ZM16 13C16 13.55 15.55 14 15 14H9C8.45 14 8 13.55 8 13C8 12.45 8.45 12 9 12H15C15.55 12 16 12.45 16 13Z" fill="currentColor"/></svg>'; // Example icon
        }

        const textSpan = document.createElement('span');
        textSpan.textContent = linkText;

        const endIconSpan = document.createElement('span');
        endIconSpan.classList.add('refer-friend-icon', 'end'); // Add 'end' class for styling
        if (endIconHTML) {
            endIconSpan.innerHTML = endIconHTML;
        } else {
            endIconSpan.innerHTML = '&rarr;'; // Default to arrow if not provided
        }

        referLink.append(startIconDiv, textSpan, endIconSpan);
        block.textContent = ''; // Clear existing content
        block.append(referLink);
    }
}
