import { Pet } from '../../../models/pet-model';

export class PetsSliderBuilder {
    private track: HTMLUListElement | null = null;
    private currentIndex = 1;
    private isTransitioning = false;

    public build(pets: Pet[]): HTMLUListElement {
        this.track = document.createElement('ul');
        this.track.classList.add('slider-ul', 'slider__track');

        const itemsToRender = [pets[pets.length - 1], ...pets, pets[0]];

        this.track.innerHTML = itemsToRender
            .map(
                (pet) => `
            <li class="slider__slide slider-pets-section">
                <div class="container__pets-card ${pet.id}">
                    <div class="container__pets-cards-name"><p>${pet.name}</p></div>
                    <div class="container__pets-cards-img">
                        <img src="${pet.img}" alt="${pet.species}">
                    </div>
                    <div class="card-description">
                        <p>${pet.species}</p>
                        <span>${pet.description}</span>
                        <div class="container__btn-card">
                            <span>
                                view live cam
                                <img src="../../assets/icons/Union-1.svg" alt="union icon"/>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        `,
            )
            .join('');

        this.setupButtons();
        this.updatePosition(false);

        return this.track;
    }

    private setupButtons(): void {
        const prevBtn = document.querySelector('#pets-slider-prev-btn');
        const nextBtn = document.querySelector('#pets-slider-next-btn');

        if (!prevBtn || !nextBtn) {
            return;
        }

        prevBtn.addEventListener('click', () => this.move(-1));
        nextBtn.addEventListener('click', () => this.move(1));

        this.track?.addEventListener('transitionend', () => this.handleLoop());
    }

    private move(direction: number): void {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentIndex += direction;
        this.updatePosition(true);
    }

    private updatePosition(withAnimation: boolean): void {
        if (!this.track) return;
        this.track.style.transition = withAnimation ? 'transform 0.5s ease-in-out' : 'none';
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }

    private handleLoop(): void {
        this.isTransitioning = false;
        if (!this.track) return;

        const slidesCount = this.track.children.length;

        if (this.currentIndex === 0) {
            this.currentIndex = slidesCount - 2;
            this.updatePosition(false);
        } else if (this.currentIndex === slidesCount - 1) {
            this.currentIndex = 1;
            this.updatePosition(false);
        }
    }
}
