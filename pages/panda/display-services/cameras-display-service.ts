import { LocationService } from './../../../shared/services/location-service';
import { ErrorDisplayService } from '../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../shared/services/display-servcies/loader-display-service';
import { CamerasApiService } from '../data-access/cameras-api-service';
import { Camera } from '../models/camera-model';

export class CamerasDisplayService {
    private cameras: Camera[] | undefined = [];

    private targetElement: HTMLElement | null = null;
    private scrollBtn: HTMLElement | null = null;
    private sidebar: HTMLElement | null = null;
    private sliderHeader: HTMLElement | null = null;

    private liveCamSection: HTMLElement | null = null;

    constructor(
        private readonly camerasApiService: CamerasApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
        private readonly locationService: LocationService,
    ) {}

    public async initialize(): Promise<void> {
        this.targetElement = document.querySelector('.animal-list');
        this.scrollBtn = document.querySelector('.animal-list-sec-btn');
        this.sidebar = document.querySelector('.sidebar');
        this.sliderHeader = document.querySelector('.sidebar-header');

        this.liveCamSection = document.querySelector('#live-cam-section');

        if (this.targetElement === null || this.liveCamSection === null) {
            throw new Error('Target elements must exist');
        }

        this.loaderDisplayService.show(this.targetElement);
        this.loaderDisplayService.show(this.liveCamSection);

        this.cameras = await this.camerasApiService.fetchCameras();

        this.loaderDisplayService.hide(this.targetElement);
        this.loaderDisplayService.hide(this.liveCamSection);

        if (!this.cameras) {
            this.errorDisplayService.showError(this.targetElement);
            this.errorDisplayService.showError(this.liveCamSection);
        } else {
            const petId = this.locationService.getCurrentParamValue('petId');
            if (petId) {
                this.displayCameras(petId);

                const selectedPetId = Number(petId);
                if (!Number.isNaN(selectedPetId)) {
                    const initialSelectedCam = this.cameras.find((c) => c.petId === selectedPetId);
                    if (initialSelectedCam) {
                        this.cameras = [initialSelectedCam, ...this.cameras.filter((c) => c !== initialSelectedCam)];
                    }
                }
            } else {
                this.locationService.updateSearchParams('petId', String(this.cameras[0].petId));
                this.displayCameras(String(this.cameras[0].petId));
            }

            this.locationService.onLocationChange((key: string, value: string) => {
                if (key === 'petId') {
                    this.displayCameras(value);
                }
            });

            this.displaySideBarItems(this.cameras);

            // add event listeners
            this.addEventListenerToSideBarToggle();
            this.addEventListenerToSideBarScroll();
            this.addEventListenerToSideBarItemsSelect();
        }
    }

    private displaySideBarItems(cameras: Camera[]): void {
        if (!this.targetElement) {
            return;
        }

        const fragment = document.createDocumentFragment();

        cameras.forEach((camera, i) => {
            const div = document.createElement('div');
            div.classList.add('animal-list-sec-panda');
            div.dataset.id = String(camera.id);

            const active = i === 0 ? 'active' : '';

            div.innerHTML = `<li class="animal-list-sec">
                                    <div class="animal-item ${active}" data-animal="panda">
                                        <img
                                            src="${camera.img}"
                                            alt="${camera.text}"
                                            class="icon"
                                        />
                                        <span class="text">${camera.text} </span>
                                    </div>
                                </li>`;

            fragment.appendChild(div);
        });

        this.targetElement.innerHTML = '';
        this.targetElement.appendChild(fragment);
    }

    private displayCameras(id: string) {
        const petId = Number(id);
        if (Number.isNaN(petId)) {
            return;
        }

        const camera: Camera | undefined = this.cameras?.find((c) => c.petId === petId);

        if (!camera && this.liveCamSection) {
            this.errorDisplayService.showError(this.liveCamSection);
        } else {
            if (this.liveCamSection && camera) {
                this.liveCamSection.innerHTML = `<div class="zoo-page-header xl-col-span-10 s-col-span-12">
                        <h2>${camera.text}</h2>
                    </div>
                    <div class="container__btn zoo-page-btn xl-col-span-2 s-col-span-12 s-order-3 xs-order-4">
                        <button>
                            donate now
                            <img src="../../assets/icons/Union.svg" alt="union icon" />
                        </button>
                    </div>
                    <div class="zoo-page-img xl-col-span-12 s-order-2">
                        <img src="${camera.liveCamImg}" alt="${camera.text}" />
                    </div>
                    <div class="zoo-page-more-live xl-col-span-12 s-order-4 xs-order-3">
                        <div>
                            <h2>more live views</h2>
                        </div>
                        <div class="zoo-page-images-slider-container">
                            <div class="zoo-page-images">
                                <img src="../../assets/images/panda-page/panda-icons/btn.png" alt="arrow icon" />
                                <img src="${camera.liveCamImages[0]}" alt="panda image" />
                                <img src="${camera.liveCamImages[1]}" alt="panda image" />
                                <img src="${camera.liveCamImages[2]}" alt="panda image" />
                                <img src="../../assets/images/panda-page/panda-icons/btn (1).png" alt="arrow icon" />
                            </div>
                        </div>
                    </div>`;
            }
        }
    }

    private addEventListenerToSideBarToggle(): void {
        this.sliderHeader?.addEventListener('click', () => {
            if (this.sidebar) {
                this.sidebar.classList.toggle('is-expanded');
            }
        });
    }

    private addEventListenerToSideBarScroll(): void {
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
    }

    private addEventListenerToSideBarItemsSelect(): void {
        this.targetElement?.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            const div: HTMLElement | null = target.closest('.animal-list-sec-panda');
            if (!div) {
                return;
            }

            const id: string | undefined = div.dataset.id;

            if (!this.cameras || !id) {
                return;
            }
            const selectedCamera: Camera | undefined = this.cameras.find((c) => c.id === Number(id));
            if (!selectedCamera) {
                return;
            }
            const newCameras = [selectedCamera, ...this.cameras.filter((c) => c !== selectedCamera)];
            this.displaySideBarItems(newCameras);

            this.locationService.updateSearchParams('petId', String(selectedCamera.petId));
        });
    }
}
