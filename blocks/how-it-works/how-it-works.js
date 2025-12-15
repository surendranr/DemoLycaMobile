export default function decorate(block) {
    // Container for slides
    const slidesWrapper = document.createElement('ul');
    slidesWrapper.classList.add('how-it-works-wrapper');

    // Move existing children (rows) into wrapper
    [...block.children].forEach((row, index) => {
        const li = document.createElement('li');
        li.classList.add('how-it-works-slide');

        // Step Number
        const stepNum = document.createElement('div');
        stepNum.classList.add('step-number');
        stepNum.textContent = index + 1;

        // Content processing
        // Assuming Row structure: [Image, Title, Description] or similar. 
        // We will wrap them for styling.
        const content = document.createElement('div');
        content.classList.add('step-content');

        // Extract Image
        const pic = row.querySelector('picture');
        if (pic) {
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('step-image');
            imgWrapper.append(pic);
            content.append(imgWrapper);
        }

        // Extract Text (Title, Desc) - everything else
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('step-text');

        [...row.children].forEach((col) => {
            if (!col.querySelector('picture')) {
                // If it's a heading
                const headings = col.querySelectorAll('h1, h2, h3, h4, h5, h6');
                headings.forEach(h => h.classList.add('step-title'));

                // If it's p
                const paras = col.querySelectorAll('p');
                paras.forEach(p => p.classList.add('step-description'));

                textWrapper.append(...col.childNodes);
            }
        });

        content.append(stepNum); // Number goes between image and text visually in design
        content.append(textWrapper);

        li.append(content);
        slidesWrapper.append(li);
    });

    block.textContent = '';
    block.append(slidesWrapper);

    // Carousel Logic for Mobile
    const controls = document.createElement('div');
    controls.classList.add('how-it-works-controls');

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('nav-arrow', 'next');
    nextBtn.ariaLabel = 'Next Step';
    controls.append(nextBtn);

    block.append(controls);

    let currentIndex = 0;
    const slides = slidesWrapper.children;

    const updateCarousel = () => {
        if (slides[currentIndex]) {
            slides[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });
}
