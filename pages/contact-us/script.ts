document.addEventListener('DOMContentLoaded', () => {
    const contactForm: HTMLFormElement | null = document.querySelector('#contactForm');
    const thanksPopup: HTMLElement | null = document.getElementById('thanksPopup');
    const closeThanks = document.querySelector('.close-thanks');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!thanksPopup) {
                return;
            }
            thanksPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            contactForm.reset();
        });
    }

    if (closeThanks) {
        closeThanks.addEventListener('click', () => {
            if (!thanksPopup) {
                return;
            }
            thanksPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});
