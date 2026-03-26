import { AuthenticationService } from '../../shared/services/authentication-service';
import { AuthenticationStateService } from '../../shared/services/authentication-state-service';
import { DarkLightMode } from '../../shared/services/display-servcies/dark-light-mode';
import { Translator } from '../../shared/services/display-servcies/translator';
import { UserInfoDisplayService } from '../../shared/services/display-servcies/user-info-display-service';
import { LocalStorageService } from '../../shared/services/local-storage-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { TranslationStateService } from '../../shared/services/translation-state-service';

class MapPage extends PageLifeCycle {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
        private readonly darkLightThemeMode: DarkLightMode,
        private readonly translator: Translator,
    ) {
        super();
    }
    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize();
        this.userInfoDisplayService.initialize();
        this.darkLightThemeMode.init();
        void this.translator.init();

        await Promise.resolve();
    }
}

const authenticationStateService = new AuthenticationStateService();
const localStorageService = new LocalStorageService();
const translationStateService = new TranslationStateService();

const darkLightThemeMode = new DarkLightMode();
const translator = new Translator(localStorageService, translationStateService);

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

new MapPage(authenticationService, userInfoDisplayService, darkLightThemeMode, translator);
