document.addEventListener('DOMContentLoaded', () => {
    const quickDonateBtn = document.querySelector('.btn-outline');
    const donateNowBtn = document.querySelector('.zoo-page-btn button');
    const volunteerBtns = document.querySelectorAll('.container__pets-btn-2-feedback');

    const togetherWeCarePopup = document.querySelector('.donation__popup');
    const allFormSteps = document.querySelectorAll('.make__your-donation');

    const step1Form = allFormSteps[0];
    const step2Form = allFormSteps[1];
    const step3Form = allFormSteps[2];

    const closeBtns = document.querySelectorAll('.close-popup');

    const hideAll = () => {
        if (togetherWeCarePopup) togetherWeCarePopup.style.display = 'none';
        allFormSteps.forEach((s) => (s.style.display = 'none'));
        document.body.style.overflow = 'auto';
    };

    const openStep = (stepElement) => {
        if (!stepElement) return;
        hideAll();
        stepElement.style.marginBottom = '0';
        stepElement.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        m;
    };

    // --- BUTTON  ---

    [quickDonateBtn, donateNowBtn].forEach((btn) => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openStep(step1Form);
            });
        }
    });

    volunteerBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openStep(togetherWeCarePopup);
        });
    });

    // --- NAVIGATION LOGIC ---

    step1Form?.querySelector('.container__btn button')?.addEventListener('click', (e) => {
        e.preventDefault();
        openStep(step2Form);
    });

    step2Form?.querySelector('.container__btn button')?.addEventListener('click', (e) => {
        e.preventDefault();
        openStep(step3Form);
    });

    // --- BACK BUTTONS ---
    step2Form?.querySelector('.next-container-back-btn a')?.addEventListener('click', (e) => {
        e.preventDefault();
        openStep(step1Form);
    });

    step3Form?.querySelector('.next-container-back-btn a')?.addEventListener('click', (e) => {
        e.preventDefault();
        openStep(step2Form);
    });

    // --- CLOSE LOGIC ---
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', hideAll);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('donation__popup') || e.target.classList.contains('make__your-donation')) {
            hideAll();
        }
    });
});
