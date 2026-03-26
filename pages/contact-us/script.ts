import { AuthenticationService } from './../../shared/services/authentication-service';
import { UserInfoDisplayService } from '../../shared/services/display-servcies/user-info-display-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { AuthenticationStateService } from '../../shared/services/authentication-state-service';
import { LocalStorageService } from '../../shared/services/local-storage-service';
import { DarkLightMode } from '../../shared/services/display-servcies/dark-light-mode';
import { Translator } from '../../shared/services/display-servcies/translator';
import { TranslationStateService } from '../../shared/services/translation-state-service';

class ContactUsPage extends PageLifeCycle {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
        private readonly darklightMode: DarkLightMode,
        private readonly trabslator: Translator,
    ) {
        super();
    }

    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize();
        this.userInfoDisplayService.initialize();
        this.darklightMode.init();
        void this.trabslator.init();

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
const translationStateService = new TranslationStateService();

const darkLightMode = new DarkLightMode();
const trabslator = new Translator(localStorageService, translationStateService);

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

new ContactUsPage(authenticationService, userInfoDisplayService, darkLightMode, trabslator);
