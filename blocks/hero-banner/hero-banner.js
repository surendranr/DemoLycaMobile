export default function decorate(block) {
  const properties = {};

  // Row 1: background image
  const backgroundImageRow = block.children[0];
  if (backgroundImageRow) {
    properties.backgroundImage = backgroundImageRow.querySelector('picture');
  }

  // Row 2: title text
  const titleRow = block.children[1];
  if (titleRow) {
    properties.title = titleRow.textContent.trim();
  }

  // Row 3: optional body/description text
  const bodyRow = block.children[2];
  if (bodyRow) {
    // Get innerHTML to preserve links and other formatting
    properties.body = bodyRow.innerHTML.trim();
  }

  // Row 4: optional CTA label (col 1) and CTA URL (col 2)
  const ctaRow = block.children[3];
  if (ctaRow && ctaRow.children.length > 1) {
    properties.ctaLabel = ctaRow.children[0].textContent.trim();
    properties.ctaUrl = ctaRow.children[1].querySelector('a')?.href || ctaRow.children[1].textContent.trim();
  } else if (ctaRow) {
    // If only one column for CTA, assume it's a simple link/text
    const link = ctaRow.querySelector('a');
    if (link) {
      properties.ctaLabel = link.textContent.trim();
      properties.ctaUrl = link.href;
    } else {
      properties.ctaLabel = ctaRow.textContent.trim();
    }
  }

  // Row 5: optional badge text (col 1)
  const badgeRow = block.children[4];
  if (badgeRow) {
    properties.badgeText = badgeRow.textContent.trim();
  }

  // Row 6 (optional): variant string
  const variantRow = block.children[5];
  if (variantRow) {
    properties.variant = variantRow.textContent.trim();
  }

  // Clear the existing block content
  block.innerHTML = '';

  // Create the root section element
  const section = document.createElement('section');
  section.classList.add('hero-banner');

  // Add variant classes
  if (properties.variant) {
    properties.variant.split(' ').forEach((variantClass) => {
      section.classList.add(`hero-banner--${variantClass}`);
    });
  }

  // Background Image
  if (properties.backgroundImage) {
    const background = document.createElement('div');
    background.classList.add('hero-banner__background');
    background.append(properties.backgroundImage);
    section.append(background);
  }

  // Content Wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-banner__content');

  // Title
  if (properties.title) {
    const title = document.createElement('h1');
    title.classList.add('hero-banner__title');
    title.textContent = properties.title;
    contentWrapper.append(title);
  }

  // Body/Description
  if (properties.body) {
    const body = document.createElement('p');
    body.classList.add('hero-banner__body');
    body.innerHTML = properties.body; // Use innerHTML to preserve links
    contentWrapper.append(body);
  }

  // CTA Button
  if (properties.ctaLabel && properties.ctaUrl) {
    const ctaButton = document.createElement('a');
    ctaButton.classList.add('button', 'primary', 'hero-banner__cta');
    ctaButton.href = properties.ctaUrl;
    ctaButton.textContent = properties.ctaLabel;
    contentWrapper.append(ctaButton);
    section.classList.add('hero-banner--has-cta');
  }

  // Badge
  if (properties.badgeText) {
    const badge = document.createElement('div');
    badge.classList.add('hero-banner__badge');
    badge.textContent = properties.badgeText;
    contentWrapper.append(badge);
    section.classList.add('hero-banner--has-badge');
  }

  section.append(contentWrapper);
  block.append(section);
}
