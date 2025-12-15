
export default function decorate(block) {
    // Extract content from block
    // Row 1: Title
    // Row 2: Subtitle
    // Rows 3-5: Tabs (Top up, Renew, Pay monthly)
    // Row 6: Footer
    const rows = [...block.children];
    const titleText = rows[0]?.textContent?.trim() || 'Already with Lyca?';
    const subtitleText = rows[1]?.textContent?.trim() || 'Add credit to your account or renew your plan.';

    // Tab Labels
    const tabLabels = [
        rows[2]?.textContent?.trim() || 'Top up',
        rows[3]?.textContent?.trim() || 'Renew plan',
        rows[4]?.textContent?.trim() || 'Switch to Pay monthly'
    ];

    // Footer
    const footerRow = rows[5];
    let footerHTML = '';
    if (footerRow) {
        const footerLink = footerRow.querySelector('a');
        const footerText = footerRow.textContent.trim().replace(footerLink?.textContent || '', '').trim();
        if (footerLink) {
            footerHTML = `
            <img src="https://www.lycamobile.co.uk/assets/images/mobile-app-icon.svg" class="app-icon" alt="App" onError="this.style.display='none'">
            ${footerText} <a href="${footerLink.href}">${footerLink.textContent} &rarr;</a>
        `;
        } else {
            footerHTML = footerRow.innerHTML;
        }
    }

    // Clear block
    block.textContent = '';
    block.classList.add('quick-actions-wrapper');

    // DOM Structure
    const container = document.createElement('div');
    container.classList.add('quick-actions-container');

    const content = `
    <h2>${titleText}</h2>
    <p class="subtitle">${subtitleText}</p>
    
    <div class="quick-actions-tabs" role="tablist">
      <button class="quick-actions-tab active" data-action="topup" role="tab" aria-selected="true">${tabLabels[0]}</button>
      <button class="quick-actions-tab" data-action="renew" role="tab" aria-selected="false">${tabLabels[1]}</button>
      <button class="quick-actions-tab" data-action="paymonthly" role="tab" aria-selected="false">${tabLabels[2]}</button>
    </div>

    <div class="quick-actions-form">
      <div class="input-container">
        <div class="input-group">
          <span class="input-group-addon">+44</span>
          <input type="tel" class="input-group-field" placeholder="Enter lyca number & get started" maxlength="10" inputmode="numeric">
          <button class="input-group-btn" aria-label="Submit">
            <img src="https://www.lycamobile.co.uk/_next/static/media/blueRightCircleArrow.f268c82d.svg" alt="Submit" />
          </button>
        </div>
        <div class="error-message">Please enter a valid UK mobile number</div>
      </div>
    </div>

    <div class="quick-actions-footer">
      ${footerHTML}
    </div>
  `;

    container.innerHTML = content;
    block.append(container);

    // Logic
    const tabs = container.querySelectorAll('.quick-actions-tab');
    const input = container.querySelector('.input-group-field');
    const submitBtn = container.querySelector('.input-group-btn');
    const errorMsg = container.querySelector('.error-message');

    let selectedAction = 'topup';

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update State
            selectedAction = tab.dataset.action;

            // Update UI
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Focus input for UX
            input.focus();
        });
    });

    // Validation
    const validateMsisdn = (number) => {
        // Validation Rules:
        // 1. Numbers only (handled by input filter).
        // 2. Length: 9 or 10 digits.
        // 3. Cannot start with 0 (since +44 is prefixed).
        return /^[1-9][0-9]{8,9}$/.test(number);
    };

    // Submit Handler
    const handleSubmit = () => {
        const value = input.value.trim();

        if (!validateMsisdn(value)) {
            errorMsg.style.display = 'block';
            input.parentElement.style.borderColor = '#d32f2f';
            return;
        }

        // Reset error
        errorMsg.style.display = 'none';
        input.parentElement.style.borderColor = '#e0e0e0';

        // Redirect Logic
        const baseUrl = window.location.origin; // Or specific Lyca domain if needed
        let redirectPath = '';

        switch (selectedAction) {
            case 'topup':
                redirectPath = '/en/topup';
                break;
            case 'renew':
                redirectPath = '/en/renew';
                break;
            case 'paymonthly':
                redirectPath = '/en/pay-monthly';
                break;
        }

        // Construct URL with query param
        // MSISDN format for backend: 44 + number
        const msisdn = '44' + value;
        const finalUrl = `${redirectPath}?msisdn=${msisdn}`;

        // Perform redirect
        window.location.href = finalUrl;
    };

    submitBtn.addEventListener('click', handleSubmit);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });

    // Input formatting (optional: prevent non-numeric)
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        errorMsg.style.display = 'none'; // Hide error on type
        input.parentElement.style.borderColor = '#e0e0e0';
    });
}
