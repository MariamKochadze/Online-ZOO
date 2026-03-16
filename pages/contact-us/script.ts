import { AuthenticationService } from './../../shared/services/authentication-service';
import { UserInfoDisplayService } from '../../shared/services/display-servcies/user-info-display-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { AuthenticationStateService } from '../../shared/services/authentication-state-service';
import { LocalStorageService } from '../../shared/services/local-storage-service';

class ContactUsPage extends PageLifeCycle {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
    ) {
        super();
    }

    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize();
        this.userInfoDisplayService.initialize();

        await Promise.resolve();
    }
}

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

const authenticationStateService = new AuthenticationStateService();
const localStorageService = new LocalStorageService();

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

new ContactUsPage(authenticationService, userInfoDisplayService);
