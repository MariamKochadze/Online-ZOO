export class DarkLightMode {
    private themeSwitch: HTMLElement | null = null;

    public init(): void {
        this.themeSwitch = document.querySelector('#theme-switch');

        const initialMode = localStorage.getItem('darkmode');
        if (initialMode === 'active') {
            document.body.classList.add('darkmode');
        }

        if (!this.themeSwitch) return;


        const enableDarkMode = () => {
            document.body.classList.add('darkmode');
            localStorage.setItem('darkmode', 'active');
        };

        const disableDarkMode = () => {
            document.body.classList.remove('darkmode');

            localStorage.setItem('darkmode', 'inactive');
        };


        this.themeSwitch.addEventListener('click', () => {

            const isCurrentlyDark = document.body.classList.contains('darkmode');

            if (isCurrentlyDark) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
}
