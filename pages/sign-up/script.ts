import { AuthenticationStateService } from './../../shared/services/authentication-state-service';
import { AuthenticationService } from './../../shared/services/authentication-service';
import { LocationService } from './../../shared/services/location-service';
import { LocalStorageService } from './../../shared/services/local-storage-service';
import { SignUpApiService } from './data-access/sing-up-api-service';
import { SignInDisplayService } from './display-services/sign-in-form-handler-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { SignUpDisplayService } from './display-services/sign-up-form-handler-service';
import { configuration } from '../../config/configuration';

class AuthenticationPage extends PageLifeCycle {
    constructor(
        private readonly signUpDisplayService: SignUpDisplayService,
        private readonly signInDisplayService: SignInDisplayService,
        private readonly authenticationService: AuthenticationService,
        private readonly authenticationStateService: AuthenticationStateService,
        private readonly locationService: LocationService,
    ) {
        super();
    }

    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize();

        if (this.authenticationStateService.getAuthState() === true) {
            this.locationService.navigateTo('./landing.html');
        }

        await this.signUpDisplayService.initialzie();
        void this.signInDisplayService.initialzie();
    }
}

const localStorageService = new LocalStorageService();
const locationService = new LocationService();

const authenticationStateService = new AuthenticationStateService();
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

const signUpApiService = new SignUpApiService(configuration);

const signUpDisplayService = new SignUpDisplayService(signUpApiService, localStorageService, locationService);
const signInDisplayService = new SignInDisplayService();

new AuthenticationPage(
    signUpDisplayService,
    signInDisplayService,
    authenticationService,
    authenticationStateService,
    locationService,
);
