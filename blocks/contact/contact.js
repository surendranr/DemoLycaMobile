/**
 * Contact Block
 * Displays contact information with icons
 */

export default function decorate(block) {
    const contactContainer = document.createElement('div');
    contactContainer.className = 'contact-container';

    const contactList = document.createElement('div');
    contactList.className = 'contact-list';

    [...block.children].forEach((row) => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';

        // Extract content
        const content = row.textContent.trim();
        const link = row.querySelector('a');

        // Determine contact type
        let icon = '📞';
        let type = 'phone';
        let href = link?.href || '';

        if (content.includes('@') || href.includes('mailto:')) {
            icon = '✉️';
            type = 'email';
            if (!href) href = `mailto:${content}`;
        } else if (content.toLowerCase().includes('address') || content.toLowerCase().includes('location')) {
            icon = '📍';
            type = 'address';
        } else if (href.includes('tel:')) {
            icon = '📞';
            type = 'phone';
        }

        const contactIcon = document.createElement('span');
        contactIcon.className = 'contact-icon';
        contactIcon.textContent = icon;
        contactIcon.setAttribute('aria-hidden', 'true');

        const contactContent = document.createElement('div');
        contactContent.className = 'contact-content';

        if (link && (type === 'phone' || type === 'email')) {
            const contactLink = document.createElement('a');
            contactLink.className = 'contact-link';
            contactLink.href = href;
            contactLink.textContent = link.textContent || content;
            contactContent.append(contactLink);
        } else {
            contactContent.textContent = content;
        }

        contactItem.append(contactIcon, contactContent);
        contactList.append(contactItem);
    });

    contactContainer.append(contactList);
    block.textContent = '';
    block.append(contactContainer);
}
