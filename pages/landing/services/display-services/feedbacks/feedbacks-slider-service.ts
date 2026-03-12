import { Feedback } from '../../../models/feedback-model';

export class FeedbackSliderBuilder {
    private track: HTMLUListElement | null = null;
    private currentIndex = 1; 
    private isTransitioning = false;

    public build(feedbacks: Feedback[]): HTMLUListElement {
        this.track = document.createElement('ul');
        this.track.classList.add('feedback-slider-track'); 


        const itemsToRender = [feedbacks[feedbacks.length - 1], ...feedbacks, feedbacks[0]];

        this.track.innerHTML = itemsToRender.map(item => `
            <li class="slider__slide">
                <div class="container__pets-feedback-desc-1">
                    <div class="container__pets-feedback-desc-2">“</div>
                    <p>${item.city}, ${item.month} ${item.year}</p>
                    <span>${item.text}</span>
                    <p class="container__pets-feedback-desc-1-p"><strong>${item.name}</strong></p>
                </div>
            </li>
        `).join('');

        this.setupButtons();
        

        requestAnimationFrame(() => this.updatePosition(false));

        return this.track;
    }

    private setupButtons(): void {

        const btnContainer = document.querySelector('.container__pets-btn-scroll');
        if (!btnContainer) return;

        const btns = btnContainer.querySelectorAll('button');
        const prevBtn = btns[0];
        const nextBtn = btns[1];

        prevBtn?.addEventListener('click', () => this.move(-1));
        nextBtn?.addEventListener('click', () => this.move(1));

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