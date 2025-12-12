
export default function decorate(block) {
    const [labelEl, durationEl, priceEl, dataEl, featuresEl, iconsEl, viewMoreEl, buyNowEl] = [...block.children].map((row) => row.firstElementChild);

    const planCard = document.createElement('div');
    planCard.classList.add('plan-card');

    // Label (e.g., Free OPPO Voucher)
    if (labelEl && labelEl.textContent.trim() !== '') {
        const label = document.createElement('div');
        label.classList.add('plan-label');
        label.textContent = labelEl.textContent;
        planCard.append(label);
    }

    const planDetails = document.createElement('div');
    planDetails.classList.add('plan-details');

    // Left Section: Duration & Price
    const leftSection = document.createElement('div');
    leftSection.classList.add('plan-left-section');

    if (durationEl) {
        const duration = document.createElement('div');
        duration.classList.add('plan-duration');
        duration.textContent = durationEl.textContent;
        leftSection.append(duration);
    }

    if (priceEl) {
        const priceText = priceEl.textContent.trim().split(' ');
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('plan-price');

        const priceValue = document.createElement('span');
        priceValue.classList.add('plan-price-value');
        priceValue.textContent = priceText[0]; // e.g. £15.50

        const priceMonthly = document.createElement('span');
        priceMonthly.classList.add('plan-price-monthly');
        priceMonthly.textContent = priceText.slice(1).join(' '); // e.g. monthly

        priceDiv.append(priceValue, priceMonthly);
        leftSection.append(priceDiv);
    }

    planDetails.append(leftSection);

    // Center Section: Data & Features
    const centerSection = document.createElement('div');
    centerSection.classList.add('plan-center-section');

    if (dataEl) {
        const dataHeader = document.createElement('div');
        dataHeader.classList.add('plan-data-header');

        const dataText = dataEl.textContent.trim().split(' ');
        const unlimitedText = document.createElement('div');
        unlimitedText.classList.add('data-unlimited');
        unlimitedText.textContent = dataText[0]; // e.g., Unlimited

        const dataSubText = document.createElement('div');
        dataSubText.classList.add('data-subtitle');
        dataSubText.textContent = dataText.slice(1).join(' '); // e.g., Data

        dataHeader.append(unlimitedText, dataSubText);
        centerSection.append(dataHeader);
    }

    if (featuresEl) {
        const featuresList = document.createElement('ul');
        featuresList.classList.add('plan-features');

        const listItems = featuresEl.querySelectorAll('li');
        if (listItems.length > 0) {
            listItems.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item.textContent;
                featuresList.append(li);
            });
        } else {
            // Fallback if no <ul> found, parse paragraphs
            [...featuresEl.children].forEach(child => {
                if (child.textContent.trim()) {
                    const li = document.createElement('li');
                    li.textContent = child.textContent;
                    featuresList.append(li);
                }
            });
        }
        centerSection.append(featuresList);
    }
    planDetails.append(centerSection);

    // Right Section: Icons & Buttons
    const rightSection = document.createElement('div');
    rightSection.classList.add('plan-right-section');

    if (iconsEl) {
        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('plan-icons');
        [...iconsEl.children].forEach((icon) => {
            // Keep existing HTML (pictures/icons)
            iconsDiv.append(icon);
        });
        rightSection.append(iconsDiv);
    }

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('plan-actions');

    if (viewMoreEl && viewMoreEl.querySelector('a')) {
        const viewMoreLink = viewMoreEl.querySelector('a').cloneNode(true);
        viewMoreLink.classList.add('plan-view-more');
        actionsDiv.append(viewMoreLink);
    } else if (viewMoreEl && viewMoreEl.textContent.trim()) {
        const viewMoreLink = document.createElement('a');
        viewMoreLink.href = '#';
        viewMoreLink.classList.add('plan-view-more');
        viewMoreLink.textContent = viewMoreEl.textContent;
        actionsDiv.append(viewMoreLink);
    }

    if (buyNowEl && buyNowEl.querySelector('a')) {
        const buyNowBtn = buyNowEl.querySelector('a').cloneNode(true);
        buyNowBtn.classList.add('plan-buy-now');
        actionsDiv.append(buyNowBtn);
    } else if (buyNowEl && buyNowEl.textContent.trim()) {
        const buyNowBtn = document.createElement('a');
        buyNowBtn.href = '#';
        buyNowBtn.classList.add('plan-buy-now');
        buyNowBtn.textContent = buyNowEl.textContent;
        actionsDiv.append(buyNowBtn);
    }

    rightSection.append(actionsDiv);
    planDetails.append(rightSection);

    planCard.append(planDetails);
    block.textContent = '';
    block.append(planCard);
}
