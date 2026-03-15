import { configuration } from '../../config/configuration';
import { ErrorDisplayService } from '../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../shared/services/display-servcies/loader-display-service';
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
    ) {
        super();
    }

    protected async onWindowLoad(e: Event): Promise<void> {
        await Promise.resolve('5');
        console.log(e);

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

const camerasApiService = new CamerasApiService(configuration);
const petDetailsApiService = new PetDetailsApiService(configuration);

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

new PandaPage(camerasDisplayService, petDetailsDisplayService);
