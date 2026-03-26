import { ErrorDisplayService } from '../../../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../../../shared/services/display-servcies/loader-display-service';
import { Pet } from '../../../models/pet-model';
import { PetsApiService } from '../../data-access/pets-api-service';
import { PetsSliderBuilder } from './pets-slider-service';
import petsKa from '../../../../../local/pets-details-ka.json';
import { TranslationStateService } from '../../../../../shared/services/translation-state-service';

export class PetsDisplayService {
    private pets: Pet[] | undefined = [];
    private targetElement: HTMLDivElement | null = document.querySelector('.slider-section');

    constructor(
        private readonly petsApiService: PetsApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
        private readonly translationStateService: TranslationStateService,
    ) {}

    public async initialize(): Promise<void> {
        this.translationStateService.onLanguageChange(this.displayPets.bind(this));

        if (this.targetElement === null) {
            throw new Error('Target element must exist');
        }

        this.loaderDisplayService.show(this.targetElement);

        this.pets = await this.petsApiService.fetchPets();
        this.loaderDisplayService.hide(this.targetElement);
        if (!this.pets) {
            this.errorDisplayService.showError(this.targetElement);
        } else {
            this.displayPets(this.translationStateService.getCurrentlanguage());
        }
    }

    private displayPets(lang: string): void {
        if (!this.targetElement || !this.pets) {
            return;
        }

        const petsSliderBuilder = new PetsSliderBuilder();
        let petsSldier;

        if (lang === 'ka') {
            petsSldier = petsSliderBuilder.build(petsKa);
        } else {
            petsSldier = petsSliderBuilder.build(this.pets);
        }

        this.targetElement.innerHTML = '';
        this.targetElement.append(petsSldier);
    }
}
