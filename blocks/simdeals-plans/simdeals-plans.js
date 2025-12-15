export default function decorate(block) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('simdeals-plans-container');

  const rows = [...block.children];
  if (rows.length === 0) return;

  // Determine number of columns (cards) based on the first row
  const numCards = rows[0].children.length;
  const cardsData = Array.from({ length: numCards }, () => ({}));

  // Define the property mapping based on the row index (Positional Parsing)
  const propertyMap = [
    'dealtag',        // Row 0
    'planname',       // Row 1
    'icons',          // Row 2
    'oldprice',       // Row 3
    'newprice',       // Row 4
    'priceunit',      // Row 5
    'dataamount',     // Row 6 (Contains Amount + Label usually)
    'features',       // Row 7
    'viewmorelink',   // Row 8
    'buynowbutton',   // Row 9
    'addtobasketbutton', // Row 10
    'offerfooter'     // Row 11
  ];

  // Iterate through rows and assign content to the corresponding card index
  rows.forEach((row, rowIndex) => {
    if (rowIndex >= propertyMap.length) return; // Ignore extra rows
    const propertyName = propertyMap[rowIndex];

    [...row.children].forEach((col, colIndex) => {
      if (colIndex < numCards) {
        cardsData[colIndex][propertyName] = col;
      }
    });
  });

  // Render Cards
  cardsData.forEach((properties) => {
    const card = document.createElement('div');
    card.classList.add('simdeals-plans-card');

    // --- Deal Tag ---
    if (properties.dealtag && properties.dealtag.textContent.trim()) {
      const dealTag = document.createElement('div');
      dealTag.classList.add('simdeals-plans-dealtag');
      dealTag.textContent = properties.dealtag.textContent.trim();
      card.append(dealTag);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('simdeals-plans-content-wrapper');

    const header = document.createElement('div');
    header.classList.add('simdeals-plans-header');

    const planDetails = document.createElement('div');
    planDetails.classList.add('simdeals-plans-details');

    if (properties.planname) {
      const planName = document.createElement('h3');
      planName.classList.add('simdeals-plans-plan-name');
      planName.textContent = properties.planname.textContent.trim();
      planDetails.append(planName);
    }

    if (properties.dataamount) {
      // Split Data Amount and Label if possible, or just render as is
      // Assuming layout: "5GB" \n "Data"
      const dataContainer = document.createElement('div');

      // Attempt to extract amount (bold?) and label
      // For now, simple rendering. We might need to look for bold tags.
      const amount = properties.dataamount.querySelector('strong') || properties.dataamount;
      const text = properties.dataamount.textContent.trim();

      // Heuristic: First line is amount, rest is label
      const lines = properties.dataamount.innerHTML.split(/<br\s*\/?>/i);

      const dataAmntDiv = document.createElement('div');
      dataAmntDiv.classList.add('simdeals-plans-data-amount');
      // If HTML has structure, use it, else split text
      if (lines.length > 1) {
        dataAmntDiv.innerHTML = lines[0];
        planDetails.append(dataAmntDiv);

        const dataLblDiv = document.createElement('div');
        dataLblDiv.classList.add('simdeals-plans-data-label');
        dataLblDiv.innerHTML = lines.slice(1).join('<br>');
        planDetails.append(dataLblDiv);
      } else {
        // Fallback just dump content
        dataAmntDiv.innerHTML = properties.dataamount.innerHTML;
        planDetails.append(dataAmntDiv);
      }
    }
    header.append(planDetails);

    const priceInfo = document.createElement('div');
    priceInfo.classList.add('simdeals-plans-price-info');

    if (properties.icons) {
      const icons = document.createElement('div');
      icons.classList.add('simdeals-plans-icons');
      // Look for picture tags deeply, as they might be wrapped in p tags
      const pictures = properties.icons.querySelectorAll('picture');
      pictures.forEach((pic) => {
        icons.append(pic);
      });
      priceInfo.append(icons);
    }

    if (properties.oldprice) {
      const oldPrice = document.createElement('div');
      oldPrice.classList.add('simdeals-plans-old-price');
      oldPrice.textContent = properties.oldprice.textContent.trim();
      priceInfo.append(oldPrice);
    }

    if (properties.newprice) {
      const newPrice = document.createElement('div');
      newPrice.classList.add('simdeals-plans-new-price');
      newPrice.textContent = properties.newprice.textContent.trim();
      priceInfo.append(newPrice);
    }

    if (properties.priceunit) {
      const priceUnit = document.createElement('div');
      priceUnit.classList.add('simdeals-plans-price-unit');
      priceUnit.textContent = properties.priceunit.textContent.trim();
      priceInfo.append(priceUnit);
    }
    header.append(priceInfo);
    contentWrapper.append(header);

    // --- Features ---
    if (properties.features) {
      const featuresList = document.createElement('ul');
      featuresList.classList.add('simdeals-plans-features');

      // Parse paragraphs or list items
      const items = properties.features.querySelectorAll('p, li');
      if (items.length > 0) {
        items.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="icon-checkmark"></span>${item.textContent.trim()}`;
          featuresList.append(li);
        });
      } else {
        // Fallback split by newline
        properties.features.textContent.split('\n').forEach(text => {
          if (text.trim()) {
            const li = document.createElement('li');
            li.innerHTML = `<span class="icon-checkmark"></span>${text.trim()}`;
            featuresList.append(li);
          }
        });
      }
      contentWrapper.append(featuresList);
    }

    // --- View More Link ---
    if (properties.viewmorelink) {
      const viewMore = document.createElement('div');
      viewMore.classList.add('simdeals-plans-viewmore');
      const linkElement = properties.viewmorelink.querySelector('a');
      if (linkElement) {
        viewMore.append(linkElement);
      } else if (properties.viewmorelink.textContent.trim()) {
        // Fallback: Create a link if text exists but no anchor tag
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = properties.viewmorelink.textContent.trim();
        viewMore.append(link);
      }
      contentWrapper.append(viewMore);
    }

    // --- Buttons ---
    const buttons = document.createElement('div');
    buttons.classList.add('simdeals-plans-buttons');

    if (properties.buynowbutton) {
      const buyNow = document.createElement('a');
      buyNow.classList.add('button', 'primary');
      const linkEl = properties.buynowbutton.querySelector('a');
      if (linkEl) {
        buyNow.href = linkEl.href;
        buyNow.textContent = linkEl.textContent.trim();
      } else {
        buyNow.href = '#';
        buyNow.textContent = properties.buynowbutton.textContent.trim();
      }
      buttons.append(buyNow);
    }

    if (properties.addtobasketbutton) {
      const addToBasket = document.createElement('a');
      addToBasket.classList.add('button', 'secondary');
      const linkEl = properties.addtobasketbutton.querySelector('a');
      if (linkEl) {
        addToBasket.href = linkEl.href;
        addToBasket.textContent = linkEl.textContent.trim();
      } else {
        addToBasket.href = '#';
        addToBasket.textContent = properties.addtobasketbutton.textContent.trim();
      }
      buttons.append(addToBasket);
    }
    contentWrapper.append(buttons);

    // --- Offer Footer ---
    if (properties.offerfooter) {
      const offerFooter = document.createElement('div');
      offerFooter.classList.add('simdeals-plans-offer-footer');
      offerFooter.textContent = properties.offerfooter.textContent.trim();
      contentWrapper.append(offerFooter);
    }

    card.append(contentWrapper);
    cardsContainer.append(card);
  });

  block.innerHTML = '';
  block.append(cardsContainer);
}
