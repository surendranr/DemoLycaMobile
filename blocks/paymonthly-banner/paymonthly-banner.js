
export default function decorate(block) {
    const [breadcrumbEl, headingEl, descriptionEl, imageEl] = [...block.children].map((row) => row.firstElementChild);

    const container = document.createElement('div');
    container.classList.add('banner-container');

    // 1. Breadcrumb
    if (breadcrumbEl) {
        const breadcrumb = document.createElement('div');
        breadcrumb.classList.add('banner-breadcrumb');

        // Home Icon SVG
        const homeIcon = document.createElement('span');
        homeIcon.classList.add('icon-home');
        homeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#5f6368"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>`;

        const separator = document.createElement('span');
        separator.classList.add('breadcrumb-separator');
        separator.textContent = ' > ';

        const text = document.createElement('span');
        text.textContent = breadcrumbEl.textContent;

        breadcrumb.append(homeIcon, separator, text);
        container.append(breadcrumb);
    }

    // 2. Content (Heading & Description)
    const content = document.createElement('div');
    content.classList.add('banner-content');

    if (headingEl) {
        const h1 = document.createElement('h1');
        h1.textContent = headingEl.textContent;
        content.append(h1);
    }

    if (descriptionEl) {
        const p = document.createElement('p');
        p.textContent = descriptionEl.textContent;
        content.append(p);
    }

    container.append(content);

    // 3. Image
    if (imageEl) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('banner-image');
        // Move existing picture/img to this new container
        while (imageEl.firstChild) {
            imageContainer.append(imageEl.firstChild);
        }
        container.append(imageContainer);
    }

    block.textContent = '';
    block.append(container);
}
