import { configuration } from '../../config/configuration';
import { AuthenticationService } from '../../shared/services/authentication-service';
import { AuthenticationStateService } from '../../shared/services/authentication-state-service';
import { DarkLightMode } from '../../shared/services/display-servcies/dark-light-mode';
import { ErrorDisplayService } from '../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../shared/services/display-servcies/loader-display-service';
import { Translator } from '../../shared/services/display-servcies/translator';
import { UserInfoDisplayService } from '../../shared/services/display-servcies/user-info-display-service';
import { LocalStorageService } from '../../shared/services/local-storage-service';
import { LocationService } from '../../shared/services/location-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { CamerasApiService } from './data-access/cameras-api-service';
import { PetDetailsApiService } from './data-access/pet-details-api-service';
import { CamerasDisplayService } from './display-services/cameras-display-service';
import { PetDetailsDisplayService } from './display-services/pet-details-display-service';

class PandaPage extends PageLifeCycle {
    constructor(
        private readonly camerasDisplayService: CamerasDisplayService,
        private readonly petDetailsDisplayService: PetDetailsDisplayService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
        private readonly authenticationService: AuthenticationService,
        private readonly darkLighthemeMode: DarkLightMode,
        private readonly translator: Translator,
    ) {
        super();
    }

    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize();
        this.userInfoDisplayService.initialize();
        this.darkLighthemeMode.init();
        void this.translator.init();

        try {
            await this.camerasDisplayService.initialize();
            await this.petDetailsDisplayService.initialize();
        } catch (error) {
            console.error(error);
        }
    }
}

const loaderDisplayService = new LoaderDisplayService();
const errorDsplayService = new ErrorDisplayService();
const locationService = new LocationService();
const darkLighthemeMode = new DarkLightMode();

const camerasApiService = new CamerasApiService(configuration);
const petDetailsApiService = new PetDetailsApiService(configuration);

const localStorageService = new LocalStorageService();

const translator = new Translator(localStorageService);

const authenticationStateService = new AuthenticationStateService();
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);

const camerasDisplayService = new CamerasDisplayService(
    camerasApiService,
    loaderDisplayService,
    errorDsplayService,
    locationService,
);
const petDetailsDisplayService = new PetDetailsDisplayService(
    petDetailsApiService,
    loaderDisplayService,
    errorDsplayService,
    locationService,
);

new PandaPage(
    camerasDisplayService,
    petDetailsDisplayService,
    userInfoDisplayService,
    authenticationService,
    darkLighthemeMode,
    translator,
);
