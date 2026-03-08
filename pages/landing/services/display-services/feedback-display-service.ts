import { ErrorDisplayService } from './error-display-service';
import { FeedbackApiService } from './../data-access/feedback-api-service';
import { LoaderDisplayService } from './loader-display-service';
import { Feedback } from '../../models/feedback-model';

export class FeedBackDisplayService {
    private feedbacks: Feedback[] | undefined = [];
    readonly targetElement: HTMLElement | null = document.querySelector('.container__pets-feedback-desc');

    constructor(
        private readonly feedbackApiService: FeedbackApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
    ) {
        if (this.targetElement) {
            this.loaderDisplayService.show(this.targetElement);
        }
    }

    public async initialize() {
        if (this.targetElement === null) {
            throw new Error('Target element must exist');
        }

        this.loaderDisplayService.show(this.targetElement);

        this.feedbacks = await this.feedbackApiService.fetchFeedbacks();

        this.loaderDisplayService.hide(this.targetElement);

        if (!this.feedbacks) {
            this.errorDisplayService.showError(this.targetElement);
        } else {
            this.displayFeedbacks();
        }
    }

    private displayFeedbacks() {
        if (!this.targetElement || !this.feedbacks) {
            return;
        }

        const fragment = document.createDocumentFragment();

        this.feedbacks.forEach((feedback) => {
            const feedbackCard: HTMLDivElement = document.createElement('div');
            feedbackCard.classList.add('container__pets-feedback-desc-1');

            feedbackCard.innerHTML = `
                            <div class="container__pets-feedback-desc-2">“</div>
                            <p>${feedback.city}, ${feedback.month} ${feedback.year}</p>
                            <span>
                            ${feedback.text}
                            </span>
                            <p class="container__pets-feedback-desc-1-p"><strong>${feedback.name}</strong></p>
            `;

            fragment.append(feedbackCard);
        });
        this.loaderDisplayService.hide(this.targetElement);
        this.targetElement?.append(fragment);
    }
}
