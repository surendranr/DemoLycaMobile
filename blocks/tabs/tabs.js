export default function decorate(block) {
  // Assuming block.children directly contain the tab labels (e.g., in a single column table or list)
  const tabLabels = [...block.children].map((row) => row.textContent.trim());

  block.innerHTML = ''; // Clear the existing content

  const tabsContainer = document.createElement('div');
  tabsContainer.classList.add('tabs-container');

  const tabList = document.createElement('div');
  tabList.classList.add('tab-list');

  tabLabels.forEach((label, index) => {
    const button = document.createElement('button');
    button.classList.add('tab-button');
    button.textContent = label;
    button.addEventListener('click', () => {
      // Deactivate all tabs and activate the clicked one
      tabList.querySelectorAll('.tab-button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    });
    tabList.append(button);
  });

  tabsContainer.append(tabList);

  // Activate the first tab by default
  if (tabList.firstElementChild) {
    tabList.firstElementChild.classList.add('active');
  }

  block.append(tabsContainer);
}