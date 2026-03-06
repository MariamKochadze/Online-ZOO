import { configuration } from '../../config/configuration';
import { Pet } from './models/pet-model';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';
import { PetsApiService } from './services/pets-api-service';

class LandingPage extends PageLifeCycle {
    private pets: Pet[] = [];

    constructor(private readonly petsApiService: PetsApiService) {
        super();
    }

    protected async onWindowLoad(event: Event): Promise<void> {
        console.log(event);

        this.pets = await this.petsApiService.fetchPets();
        console.log(this.pets);
    }

    protected async onWindowUnLoad(event: Event): Promise<void> {
        await Promise.resolve();
        console.log(event);
    }
}

// dependencies for the page
const petsApiService = new PetsApiService(configuration);

new LandingPage(petsApiService);
