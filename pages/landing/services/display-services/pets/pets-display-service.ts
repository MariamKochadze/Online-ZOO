import { ErrorDisplayService } from '../../../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../../../shared/services/display-servcies/loader-display-service';
import { Pet } from '../../../models/pet-model';
import { PetsApiService } from '../../data-access/pets-api-service';
import { PetsSliderBuilder } from './pets-slider-service';

export class PetsDisplayService {
    private pets: Pet[] | undefined = [];
    private targetElement: HTMLDivElement | null = document.querySelector('.slider-section');

    constructor(
        private readonly petsApiService: PetsApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
    ) {}

    public async initialize(): Promise<void> {
        if (this.targetElement === null) {
            throw new Error('Target element must exist');
        }

        this.loaderDisplayService.show(this.targetElement);

        this.pets = await this.petsApiService.fetchPets();
        this.loaderDisplayService.hide(this.targetElement);
        if (!this.pets) {
            this.errorDisplayService.showError(this.targetElement);
        } else {
            this.displayPets();
        }
    }

    private displayPets(): void {
        if (!this.targetElement || !this.pets) {
            return;
        }

        const petsSliderBuilder = new PetsSliderBuilder();
        const petsSldier = petsSliderBuilder.build(this.pets);

        this.targetElement.append(petsSldier);
    }
}
