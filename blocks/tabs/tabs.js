/**
 * Tabs Block
 * Creates tabbed navigation for content sections
 */

export default function decorate(block) {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';

    const tabList = document.createElement('div');
    tabList.className = 'tabs-list';
    tabList.setAttribute('role', 'tablist');

    const tabPanels = document.createElement('div');
    tabPanels.className = 'tabs-panels';

    [...block.children].forEach((row, index) => {
        // First child is the tab name
        const tabName = row.children[0];
        // Second child is the tab content
        const tabContent = row.children[1];

        if (tabName && tabContent) {
            // Create tab button
            const tabButton = document.createElement('button');
            tabButton.className = 'tab-button';
            tabButton.setAttribute('role', 'tab');
            tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            tabButton.setAttribute('aria-controls', `tab-panel-${index}`);
            tabButton.id = `tab-${index}`;
            tabButton.textContent = tabName.textContent;
            tabButton.tabIndex = index === 0 ? 0 : -1;

            // Create tab panel
            const tabPanel = document.createElement('div');
            tabPanel.className = 'tab-panel';
            tabPanel.setAttribute('role', 'tabpanel');
            tabPanel.setAttribute('aria-labelledby', `tab-${index}`);
            tabPanel.id = `tab-panel-${index}`;
            tabPanel.innerHTML = tabContent.innerHTML;

            if (index === 0) {
                tabButton.classList.add('active');
                tabPanel.classList.add('active');
            } else {
                tabPanel.setAttribute('hidden', '');
            }

            // Add click event listener
            tabButton.addEventListener('click', () => {
                // Deactivate all tabs
                tabList.querySelectorAll('.tab-button').forEach((btn) => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                    btn.tabIndex = -1;
                });

                // Hide all panels
                tabPanels.querySelectorAll('.tab-panel').forEach((panel) => {
                    panel.classList.remove('active');
                    panel.setAttribute('hidden', '');
                });

                // Activate clicked tab
                tabButton.classList.add('active');
                tabButton.setAttribute('aria-selected', 'true');
                tabButton.tabIndex = 0;
                tabPanel.classList.add('active');
                tabPanel.removeAttribute('hidden');
            });

            // Keyboard navigation
            tabButton.addEventListener('keydown', (e) => {
                const tabs = Array.from(tabList.querySelectorAll('.tab-button'));
                const currentIndex = tabs.indexOf(tabButton);

                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % tabs.length;
                    tabs[nextIndex].click();
                    tabs[nextIndex].focus();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                    tabs[prevIndex].click();
                    tabs[prevIndex].focus();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    tabs[0].click();
                    tabs[0].focus();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    tabs[tabs.length - 1].click();
                    tabs[tabs.length - 1].focus();
                }
            });

            tabList.append(tabButton);
            tabPanels.append(tabPanel);
        }
    });

    tabsContainer.append(tabList, tabPanels);
    block.textContent = '';
    block.append(tabsContainer);
}
