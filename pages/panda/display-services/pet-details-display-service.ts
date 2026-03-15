import { ErrorDisplayService } from '../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../shared/services/display-servcies/loader-display-service';
import { LocationService } from '../../../shared/services/location-service';
import { PetDetailsApiService } from './../data-access/pet-details-api-service';

export class PetDetailsDisplayService {
    private target: HTMLElement | null = null;

    constructor(
        private readonly petDetailsApiService: PetDetailsApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
        private readonly locationService: LocationService,
    ) {}

    public async initialize(): Promise<void> {
        await Promise.resolve();
        this.target = document.querySelector('.zoo-did-you-know');

        if (!this.target) {
            throw new Error('Target element must exists. We can not show pet details');
        }

        const petIdOnLoad = this.locationService.getCurrentParamValue('petId');
        if (petIdOnLoad) {
            void this.displayPetDetails(petIdOnLoad, this.target);
        }

        this.locationService.onLocationChange((key: string, petId: string) => {
            if (key === 'petId' && this.target) {
                void this.displayPetDetails(petId, this.target);
            }
        });
    }

    private async displayPetDetails(petId: string, target: HTMLElement) {
        this.loaderDisplayService.show(target);

        const id = Number(petId);
        if (Number.isNaN(id)) {
            return this.errorDisplayService.showError(target);
        }

        const petDetails = await this.petDetailsApiService.fetchPetDetails(id);
        this.loaderDisplayService.hide(target);

        if (!petDetails) {
            this.errorDisplayService.showError(target);
        } else {
            target.innerHTML = `<div class="zoo-did-you-know-info">
                    <h3>did you know?</h3>
                    <p>
                       ${petDetails.description}
                    </p>
                </div>
                <div class="zoo-animal-info">
                    <div class="zoo-desc">
                        <dl>
                            <dt>Common name:</dt>
                            <dd>${petDetails.commonName}</dd>

                            <dt>Scientific name:</dt>
                            <dd>${petDetails.scientificName}</dd>

                            <dt>Type:</dt>
                            <dd>${petDetails.type}</dd>

                            <dt>Size:</dt>
                            <dd>${petDetails.size}</dd>

                            <dt>Diet:</dt>
                            <dd>${petDetails.diet}</dd>

                            <dt>Habitat:</dt>
                            <dd>${petDetails.habitat}</dd>

                            <dt>Range:</dt>
                            <dd class="range-row">
                                <span>${petDetails.range}</span>
                                <a href="../map/index.html" class="container__btn-card zoos-btn-1">
                                    VIEW map
                                    <img src="../../assets/icons/Union-1.svg" alt="union icon" />
                                </a>
                            </dd>
                        </dl>
                    </div>
                    <div class="zoo-panda-img">
                        <img src="${petDetails.img}" alt="${petDetails.commonName}" />
                    </div>
                </div>
                <div class="zoo-animal-desription">
                    <p>
                        ${petDetails.detailedDescription}
                    </p>
                </div>`;
        }
    }
}
