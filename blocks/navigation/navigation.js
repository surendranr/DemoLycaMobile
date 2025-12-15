export default function decorate(block) {
  const navList = document.createElement('ul');
  navList.classList.add('navbar-list');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('navbar-item');

    const link = row.querySelector('a');
    const icon = row.querySelector('img');
    // Adjusted to handle cases where link might be the first element, or absent
    let labelElement = row.children[0];
    if (link && row.children[1]) {
      labelElement = row.children[1];
    } else if (icon && row.children[1]) {
      labelElement = row.children[1];
    } else if (row.children[0]) {
      labelElement = row.children[0];
    }
    const label = labelElement?.textContent.trim();

    const anchor = document.createElement('a');
    anchor.href = link ? link.href : '#';
    anchor.classList.add('navbar-link');

    if (icon) {
      icon.classList.add('navbar-icon');
      anchor.append(icon);
    }

    if (label) {
      const span = document.createElement('span');
      span.classList.add('navbar-label');
      span.textContent = label;
      anchor.append(span);
    }

    li.append(anchor);
    navList.append(li);
  });

  block.innerHTML = '';
  block.append(navList);

  // Active state management
  // Default to first item active
  if (navList.firstElementChild) {
    navList.firstElementChild.classList.add('active');
  }

  // Add click listeners to toggle active state
  navList.querySelectorAll('.navbar-item').forEach((item) => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      navList.querySelectorAll('.navbar-item').forEach((navItem) => {
        navItem.classList.remove('active');
      });
      // Add active class to clicked item
      item.classList.add('active');
    });
  });
}