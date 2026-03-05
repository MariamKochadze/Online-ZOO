document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const thanksPopup = document.getElementById('thanksPopup');
    const closeThanks = document.querySelector('.close-thanks');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            thanksPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            contactForm.reset();
        });
    }

    if (closeThanks) {
        closeThanks.addEventListener('click', () => {
            thanksPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});
