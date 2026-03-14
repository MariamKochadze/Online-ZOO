import { ErrorDisplayService } from '../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../shared/services/display-servcies/loader-display-service';
import { CamerasApiService } from '../data-access/cameras-api-service';
import { Camera } from '../models/animal-model';

export class CamerasDisplayService {
    private animals: Camera[] | undefined = [];
    private targetElement: HTMLElement | null = document.querySelector('.animal-list');
    private scrollBtn: HTMLElement | null = document.querySelector('.animal-list-sec-btn');

    constructor(
        private readonly animalApiService: CamerasApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
    ) {}

    public async initialize(): Promise<void> {
        if (this.targetElement === null) {
            throw new Error('Target element must exist');
        }

        this.loaderDisplayService.show(this.targetElement);

        this.animals = await this.animalApiService.fetchCameras();

        this.loaderDisplayService.hide(this.targetElement);

        if (!this.animals) {
            this.errorDisplayService.showError(this.targetElement);
            return;
        }

        const fragment = document.createDocumentFragment();

        this.animals.forEach((animal) => {
            const div = document.createElement('div');
            div.classList.add('animal-list-sec-panda');
            div.innerHTML = `<li class="animal-list-sec">
                                    <div class="animal-item active" data-animal="panda">
                                        <img
                                            src="../../assets/images/panda-page/panda-icons/Panda.svg"
                                            alt="panda icon"
                                            class="icon"
                                        />
                                        <span class="text">${animal.text} </span>
                                    </div>
                                </li>`;

            fragment.appendChild(div);
        });

        this.scrollBtn?.addEventListener('click', () => {
            if (this.targetElement) {
                const windowHeight = this.targetElement.clientHeight;

                const isAtBottom = this.targetElement.scrollTop + windowHeight >= this.targetElement.scrollHeight - 5;

                if (isAtBottom) {
                    this.targetElement.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    this.targetElement.scrollBy({ top: 100, behavior: 'smooth' });
                }
            }
        });

        this.targetElement?.appendChild(fragment);
    }
}
