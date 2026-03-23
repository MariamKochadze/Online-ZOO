import { LocalStorageService } from './../../shared/services/local-storage-service';
import { AuthenticationStateService } from './../../shared/services/authentication-state-service';
import { UserInfoDisplayService } from './../../shared/services/display-servcies/user-info-display-service';
import { configuration } from '../../config/configuration';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { PetsApiService } from './services/data-access/pets-api-service';
import { FeedbackApiService } from './services/data-access/feedback-api-service';
import { LoaderDisplayService } from '../../shared/services/display-servcies/loader-display-service';
import { ErrorDisplayService } from '../../shared/services/display-servcies/error-display-service';
import { PetsDisplayService } from './services/display-services/pets/pets-display-service';
import { FeedBackDisplayService } from './services/display-services/feedbacks/feedback-display-service';
import { AuthenticationService } from '../../shared/services/authentication-service';
import { DarkLightMode } from '../../shared/services/display-servcies/dark-light-mode';
import { Translator } from '../../shared/services/display-servcies/translator';

class LandingPage extends PageLifeCycle {
    constructor(
        private readonly petsDisplayService: PetsDisplayService,
        private readonly feedBackDisplayService: FeedBackDisplayService,
        private readonly authenticationService: AuthenticationService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
        private readonly darkLightMode: DarkLightMode,
        private readonly translator: Translator,
    ) {
        super();
    }

    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize(); // ამოწმებს ლოკალ სთორიჯს / სთეით სერვისს ააფდეითებს
        this.userInfoDisplayService.initialize(); // ხატავს სახელს ნავიგაციაში
        this.darkLightMode.init();
        void this.translator.init();

        try {
            await Promise.allSettled([this.petsDisplayService.initialize(), this.feedBackDisplayService.initialize()]);
        } catch (error) {
            console.log(error);
        }
    }
}

// Common/Shared Services
const loaderDisplayService = new LoaderDisplayService();
const errorDisplayService = new ErrorDisplayService();
const localStorageService = new LocalStorageService();
const darkLightMode = new DarkLightMode();

const authenticationStateService = new AuthenticationStateService();
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);

// Landing Page Specific services
const petsApiService = new PetsApiService(configuration);
const feedbackApiService = new FeedbackApiService(configuration);
const localstorageService = new LocalStorageService();
const translator = new Translator(localstorageService);

const petsDisplayService = new PetsDisplayService(petsApiService, loaderDisplayService, errorDisplayService);
const feedBackDisplayService = new FeedBackDisplayService(
    feedbackApiService,
    loaderDisplayService,
    errorDisplayService,
);

new LandingPage(
    petsDisplayService,
    feedBackDisplayService,
    authenticationService,
    userInfoDisplayService,
    darkLightMode,
    translator,
);
