import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const authorContainer = document.createElement('div');
  authorContainer.className = 'author-container';

  const authorContent = document.createElement('div');
  authorContent.className = 'author-content';

  let authorImage = null;
  let authorName = null;
  let authorRole = null;
  let authorBio = null;
  const authorLinks = [];
  const authorDetails = [];

  [...block.children].forEach((row) => {
    // Check for image/picture
    if (row.querySelector('picture') || row.querySelector('img')) {
      const img = row.querySelector('img');
      if (img) {
        authorImage = createOptimizedPicture(
          img.src,
          img.alt || 'Author image',
          false,
          [{ width: '400' }],
        );
        authorImage.classList.add('author-image');
      }
    }
    // Check for heading (author name)
    else if (row.tagName === 'H1' || row.tagName === 'H2') {
      if (!authorName) {
        authorName = document.createElement('h1');
        authorName.className = 'author-name';
        authorName.textContent = row.textContent;
      } else if (!authorRole) {
        authorRole = document.createElement('p');
        authorRole.className = 'author-role';
        authorRole.textContent = row.textContent;
      }
    }
    // Check for paragraphs (bio, description)
    else if (row.tagName === 'P') {
      const text = row.textContent.trim();
      // Check if it's a link
      const link = row.querySelector('a');
      if (link) {
        authorLinks.push({
          text: link.textContent,
          url: link.href,
          element: row.cloneNode(true),
        });
      } else if (text && !authorBio) {
        authorBio = document.createElement('div');
        authorBio.className = 'author-bio';
        authorBio.innerHTML = row.innerHTML;
      } else if (text) {
        authorDetails.push(row.cloneNode(true));
      }
    }
    // Check for lists
    else if (row.tagName === 'UL' || row.tagName === 'OL') {
      const list = document.createElement('div');
      list.className = 'author-details';
      list.appendChild(row.cloneNode(true));
      authorDetails.push(list);
    }
    // Handle other content
    else {
      const content = document.createElement('div');
      content.className = 'author-other';
      content.innerHTML = row.innerHTML;
      authorDetails.push(content);
    }
  });

  // Build author card structure
  const authorCard = document.createElement('div');
  authorCard.className = 'author-card';

  // Author header (image + name + role)
  const authorHeader = document.createElement('div');
  authorHeader.className = 'author-header';

  if (authorImage) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'author-image-wrapper';
    imageWrapper.appendChild(authorImage);
    authorHeader.appendChild(imageWrapper);
  }

  const authorInfo = document.createElement('div');
  authorInfo.className = 'author-info';

  if (authorName) {
    authorInfo.appendChild(authorName);
  }

  if (authorRole) {
    authorInfo.appendChild(authorRole);
  }

  if (authorInfo.children.length > 0) {
    authorHeader.appendChild(authorInfo);
  }

  authorCard.appendChild(authorHeader);

  // Author bio
  if (authorBio) {
    authorCard.appendChild(authorBio);
  }

  // Author details (lists, additional content)
  if (authorDetails.length > 0) {
    const detailsWrapper = document.createElement('div');
    detailsWrapper.className = 'author-details-wrapper';
    authorDetails.forEach((detail) => detailsWrapper.appendChild(detail));
    authorCard.appendChild(detailsWrapper);
  }

  // Author links (social media, contact)
  if (authorLinks.length > 0) {
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'author-links';
    authorLinks.forEach((link) => {
      const linkElement = document.createElement('div');
      linkElement.className = 'author-link-item';
      linkElement.appendChild(link.element);
      linksWrapper.appendChild(linkElement);
    });
    authorCard.appendChild(linksWrapper);
  }

  authorContent.appendChild(authorCard);
  authorContainer.appendChild(authorContent);

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(authorContainer);
}
