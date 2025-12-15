
export default function decorate(block) {
    // Separate Title and Slides
    const rows = [...block.children];

    // We expect the first row to be the title and the rest to be slides
    // Use a heuristic: if we have more than 1 row, row 0 is title.
    // Or just always assume row 0 is title.
    let titleRow = null;
    let slideRows = [];

    if (rows.length > 0) {
        titleRow = rows[0];
        slideRows = rows.slice(1);
    }

    // Clear the block to rebuild
    block.textContent = '';

    // 1. Build Title
    if (titleRow) {
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('flag-carousel-title');
        // If the row has columns, just take the first column's content or the whole row
        // EDS rows are divs with divs inside.
        // We'll just move the children of the first cell of the title row.
        const titleContent = titleRow.firstElementChild;
        if (titleContent) {
            titleDiv.innerHTML = titleContent.innerHTML;
        }
        block.append(titleDiv);
    }

    // 2. Build Carousel
    if (slideRows.length > 0) {
        // Container for all carousel elements (wrapper + controls)
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('flag-carousel-container');

        const slidesWrapper = document.createElement('div');
        slidesWrapper.classList.add('flag-carousel-wrapper');

        slideRows.forEach((row) => {
            const slide = document.createElement('div');
            slide.classList.add('flag-carousel-slide');

            // Move content from row to slide
            // Usually we want to keep the structure inside the row (columns)
            // But for a simple image slide, we can just dump content.
            // Let's optimize: check for picture and ensure it's wrapped nicely
            const pic = row.querySelector('picture');
            if (pic) {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('flag-carousel-image-container');
                imgContainer.append(pic);
                slide.append(imgContainer);

                // Remove pic from row to see if anything else remains (text?)
                // If there is text, append it too
                // row might have multiple columns.
                // Let's just append everything else.
                [...row.children].forEach(child => {
                    if (child.querySelector('picture')) return; // already moved
                    // If it's a text col
                    const textDiv = document.createElement('div');
                    textDiv.classList.add('flag-carousel-text');
                    textDiv.innerHTML = child.innerHTML;
                    slide.append(textDiv);
                });
            } else {
                // No picture found, just append row children content
                slide.innerHTML = row.innerHTML;
            }

            slidesWrapper.append(slide);
        });

        carouselContainer.append(slidesWrapper);
        block.append(carouselContainer);

        // --- Logic (Infinite Loop) ---

        const cloneCount = 5; // Max visible items to ensure coverage
        const slides = [...slidesWrapper.children];
        const numRealSlides = slides.length;

        // Clone slides
        // We need clones at both ends for bi-directional infinite
        // Prepend copies of the last few, append copies of the first few
        // However, standard infinite usually needs just logic to jump.
        // Let's stick to a simpler approach: Clone START to END and END to START.

        if (numRealSlides > 0) {
            // Clone last `cloneCount` slides to the beginning
            for (let i = 0; i < cloneCount; i++) {
                const originalIndex = numRealSlides - 1 - (i % numRealSlides);
                const clone = slides[originalIndex].cloneNode(true);
                clone.classList.add('clone');
                clone.ariaHidden = true;
                slidesWrapper.prepend(clone);
            }

            // Clone first `cloneCount` slides to the end
            for (let i = 0; i < cloneCount; i++) {
                const originalIndex = i % numRealSlides;
                const clone = slides[originalIndex].cloneNode(true);
                clone.classList.add('clone');
                clone.ariaHidden = true;
                slidesWrapper.append(clone);
            }
        }

        const allSlides = slidesWrapper.children;
        const totalSlides = allSlides.length;

        // Start index offset by cloneCount to show first real slide
        let currentIndex = cloneCount;
        let intervalId;
        let isTransitioning = false;

        const getVisibleItems = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 3;
            return 5;
        };

        const updateCarousel = (withTransition = true) => {
            const visibleItems = getVisibleItems();
            const step = 100 / visibleItems;
            const translateX = -(currentIndex * step);

            if (withTransition) {
                slidesWrapper.style.transition = 'transform 0.5s ease-out';
            } else {
                slidesWrapper.style.transition = 'none';
            }

            slidesWrapper.style.transform = `translateX(${translateX}%)`;
        };

        // Jump handler for infinite loop
        slidesWrapper.addEventListener('transitionend', () => {
            isTransitioning = false;

            // If we are in the "end clones" zone
            if (currentIndex >= cloneCount + numRealSlides) {
                // Jump back to the start (real first slide)
                // The position relative to the start of Real Slides
                const relativeIndex = currentIndex - (cloneCount + numRealSlides);
                currentIndex = cloneCount + relativeIndex;
                updateCarousel(false);
            }
            // If we are in the "start clones" zone
            else if (currentIndex < cloneCount) {
                // Jump forward to the end (real last slide)
                const relativeIndex = cloneCount - currentIndex;
                currentIndex = (cloneCount + numRealSlides) - relativeIndex;
                updateCarousel(false);
            }
        });

        const nextSlide = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateCarousel(true);
        };

        const prevSlide = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            updateCarousel(true);
        };

        // Arrows
        const prevButton = document.createElement('button');
        prevButton.classList.add('flag-carousel-arrow', 'prev');
        prevButton.ariaLabel = 'Previous Slide';

        const nextButton = document.createElement('button');
        nextButton.classList.add('flag-carousel-arrow', 'next');
        nextButton.ariaLabel = 'Next Slide';

        carouselContainer.append(prevButton);
        carouselContainer.append(nextButton);

        // Listeners
        prevButton.addEventListener('click', () => {
            prevSlide();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
        });

        // Swipe (Mobile)
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
        };

        // Resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Determine valid index range or reset?
                // Infinite loop handles arbitrary index well, but update visual step
                updateCarousel(false);
            }, 100);
        });

        // Initial Set
        // Important: Wait for layout or force it?
        // requestAnimationFrame(() => updateCarousel(false));
        updateCarousel(false);
    }
}
