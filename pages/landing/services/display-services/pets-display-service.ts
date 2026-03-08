import { PetsApiService } from './../data-access/pets-api-service';
import { LoaderDisplayService } from './loader-display-service';
import { Pet } from '../../models/pet-model';
import { ErrorDisplayService } from './error-display-service';

export class PetsDisplayService {
    private pets: Pet[] | undefined = [];
    private targetElement: HTMLDivElement | null = document.querySelector('.slider-section');
    private petsCardsContainer: HTMLUListElement = document.createElement('ul');

    constructor(
        private readonly petsApiService: PetsApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
    ) {
        this.petsCardsContainer.classList.add('slider-ul');
    }

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

        this.pets.forEach((pet) => {
            const petCard: HTMLLIElement = document.createElement('li');
            petCard.classList.add('slider-pets-section');

            petCard.innerHTML = `
           <div class="container__pets-card sam">
           <a href="#">
           <div class="container__pets-cards-name">
           <p>${pet.name}</p>
           </div>
           <div class="container__pets-cards-img">
           <img src=${pet.img}/>
           </div>
           <div class="card-description">
           <p>${pet.species} </p>
           <span>${pet.description}</span>
             <div class="container__btn-card">
                                            <span
                                                >view live cam
                                                <img src="../../assets/icons/Union-1.svg" alt="union icon"
                                            /></span>
                                        </div>
           </div>
           </a>
           </div>
            `;

            this.petsCardsContainer.append(petCard);
        });

        this.loaderDisplayService.hide(this.targetElement);
        this.targetElement.append(this.petsCardsContainer);
    }
}
