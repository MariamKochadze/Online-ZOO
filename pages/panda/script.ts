import { configuration } from '../../config/configuration';
import { ErrorDisplayService } from '../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../shared/services/display-servcies/loader-display-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { CamerasApiService } from './data-access/cameras-api-service';
import { CamerasDisplayService } from './display-services/cameras-display-service';

class PandaPage extends PageLifeCycle {
    constructor(private readonly cameraDisplayService: CamerasDisplayService) {
        super();
    }

    protected async onWindowLoad(e: Event): Promise<void> {
        await Promise.resolve('5');
        console.log(e);

        try {
            await this.cameraDisplayService.initialize();
        } catch (error) {
            console.error(error);
        }
    }
}

const animalApiService = new CamerasApiService(configuration);
const loaderDisplayService = new LoaderDisplayService();
const errorDsplayService = new ErrorDisplayService();

const camerasDisplayService = new CamerasDisplayService(animalApiService, loaderDisplayService, errorDsplayService);

new PandaPage(camerasDisplayService);
