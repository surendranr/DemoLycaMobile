/**
 * Share Block
 * Creates social sharing buttons and copy link functionality
 */

export default function decorate(block) {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-container';

    // Extract referral link from block content
    const linkElement = block.querySelector('a');
    const referralLink = linkElement?.href || window.location.href;
    const shareText = block.querySelector('p')?.textContent || 'Check out this amazing offer!';

    // Create share input group
    const shareGroup = document.createElement('div');
    shareGroup.className = 'share-group';

    const shareInput = document.createElement('input');
    shareInput.type = 'text';
    shareInput.className = 'share-input';
    shareInput.value = referralLink;
    shareInput.readOnly = true;
    shareInput.setAttribute('aria-label', 'Referral link');

    const copyButton = document.createElement('button');
    copyButton.className = 'share-copy-button';
    copyButton.textContent = 'Copy Link';
    copyButton.setAttribute('aria-label', 'Copy referral link to clipboard');

    // Copy to clipboard functionality
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            copyButton.textContent = 'Copied!';
            copyButton.classList.add('copied');

            setTimeout(() => {
                copyButton.textContent = 'Copy Link';
                copyButton.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            shareInput.select();
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
            copyButton.classList.add('copied');

            setTimeout(() => {
                copyButton.textContent = 'Copy Link';
                copyButton.classList.remove('copied');
            }, 2000);
        }
    });

    shareGroup.append(shareInput, copyButton);

    // Create social share buttons
    const socialButtons = document.createElement('div');
    socialButtons.className = 'share-social-buttons';

    const shareOptions = [
        {
            name: 'Facebook',
            icon: '📘',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
            color: '#1877f2',
        },
        {
            name: 'Twitter',
            icon: '🐦',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`,
            color: '#1da1f2',
        },
        {
            name: 'WhatsApp',
            icon: '💬',
            url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + referralLink)}`,
            color: '#25d366',
        },
        {
            name: 'Email',
            icon: '✉️',
            url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(referralLink)}`,
            color: '#666',
        },
    ];

    shareOptions.forEach((option) => {
        const button = document.createElement('a');
        button.className = 'share-social-button';
        button.href = option.url;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.setAttribute('aria-label', `Share on ${option.name}`);
        button.title = `Share on ${option.name}`;
        button.style.setProperty('--button-color', option.color);

        const icon = document.createElement('span');
        icon.className = 'share-icon';
        icon.textContent = option.icon;

        const label = document.createElement('span');
        label.className = 'share-label';
        label.textContent = option.name;

        button.append(icon, label);
        socialButtons.append(button);
    });

    shareContainer.append(shareGroup, socialButtons);
    block.textContent = '';
    block.append(shareContainer);
}
