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

class LandingPage extends PageLifeCycle {
    constructor(
        private readonly petsDisplayService: PetsDisplayService,
        private readonly feedBackDisplayService: FeedBackDisplayService,
        private readonly authenticationService: AuthenticationService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
    ) {
        super();
    }

    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize(); // ამოწმებს ლოკალ სთორიჯს / სთეით სერვისს ააფდეითებს
        this.userInfoDisplayService.initialize(); // ხატავს სახელს ნავიგაციაში

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

const authenticationStateService = new AuthenticationStateService();
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);

// Landing Page Specific services
const petsApiService = new PetsApiService(configuration);
const feedbackApiService = new FeedbackApiService(configuration);

const petsDisplayService = new PetsDisplayService(petsApiService, loaderDisplayService, errorDisplayService);
const feedBackDisplayService = new FeedBackDisplayService(
    feedbackApiService,
    loaderDisplayService,
    errorDisplayService,
);

new LandingPage(petsDisplayService, feedBackDisplayService, authenticationService, userInfoDisplayService);
