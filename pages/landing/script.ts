import { configuration } from '../../config/configuration';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { PetsApiService } from './services/data-access/pets-api-service';
import { FeedbackApiService } from './services/data-access/feedback-api-service';
import { PetsDisplayService } from './services/display-services/pets-display-service';
import { FeedBackDisplayService } from './services/display-services/feedback-display-service';
import { LoaderDisplayService } from './services/display-services/loader-display-service';
import { ErrorDisplayService } from './services/display-services/error-display-service';

class LandingPage extends PageLifeCycle {
    constructor(
        private readonly petsDisplayService: PetsDisplayService,
        private readonly feedBackDisplayService: FeedBackDisplayService,
    ) {
        super();
    }

    protected async onWindowLoad(event: Event): Promise<void> {
        console.log(event);

        try {
            await this.petsDisplayService.initialize();
            await this.feedBackDisplayService.initialize();
        } catch (error) {
            console.error(error);
        }
    }
}

const loaderDisplayService = new LoaderDisplayService();
const errorDisplayService = new ErrorDisplayService();

// dependencies for the page
const petsApiService = new PetsApiService(configuration);
const feedbackApiService = new FeedbackApiService(configuration);

const petsDisplayService = new PetsDisplayService(petsApiService, loaderDisplayService, errorDisplayService);
const feedBackDisplayService = new FeedBackDisplayService(
    feedbackApiService,
    loaderDisplayService,
    errorDisplayService,
);

new LandingPage(petsDisplayService, feedBackDisplayService);
