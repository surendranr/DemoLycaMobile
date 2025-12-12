export default function decorate(block) {
    // Container for slides
    const slidesWrapper = document.createElement('div');
    slidesWrapper.classList.add('banner-carousel-wrapper');

    // Move existing children (rows) into wrapper
    [...block.children].forEach((row) => {
        row.classList.add('banner-carousel-slide');

        // Ensure content is structured nicely
        // If just an image, ensure it fills
        const pic = row.querySelector('picture');
        if (pic) {
            pic.parentElement.classList.add('banner-carousel-image-container');
        }

        slidesWrapper.append(row);
    });

    block.append(slidesWrapper);
    block.classList.add('banner-carousel-container');

    // Navigation Dots
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('banner-carousel-dots');

    [...slidesWrapper.children].forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('banner-carousel-dot');
        dot.ariaLabel = `Go to slide ${index + 1}`;
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });

        dotsContainer.append(dot);
    });

    block.append(dotsContainer);

    // Arrows
    const prevButton = document.createElement('button');
    prevButton.classList.add('banner-carousel-arrow', 'prev');
    prevButton.ariaLabel = 'Previous Slide';

    const nextButton = document.createElement('button');
    nextButton.classList.add('banner-carousel-arrow', 'next');
    nextButton.ariaLabel = 'Next Slide';

    block.append(prevButton);
    block.append(nextButton);

    // State
    let currentIndex = 0;
    let intervalId;
    const slides = slidesWrapper.children;
    const numSlides = slides.length;

    // Update UI
    const updateCarousel = () => {
        // Use percentage calculation for responsiveness
        const translateX = -(currentIndex * 100);
        slidesWrapper.style.transform = `translateX(${translateX}%)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.banner-carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % numSlides;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + numSlides) % numSlides;
        updateCarousel();
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    // Event Listeners
    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    // Dots listeners
    const dots = dotsContainer.querySelectorAll('.banner-carousel-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Auto-slide logic
    const startAutoSlide = () => {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 5000); // 5 seconds
    };

    const stopAutoSlide = () => {
        clearInterval(intervalId);
    };

    // Touch Interaction (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    block.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    block.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    };

    // Mouse pause
    block.addEventListener('mouseenter', stopAutoSlide);
    block.addEventListener('mouseleave', startAutoSlide);

    // Initial start
    startAutoSlide();
}
