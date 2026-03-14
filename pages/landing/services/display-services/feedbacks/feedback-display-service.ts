import { ErrorDisplayService } from '../../../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../../../shared/services/display-servcies/loader-display-service';
import { Feedback } from '../../../models/feedback-model';
import { FeedbackApiService } from '../../data-access/feedback-api-service';
import { FeedbackSliderBuilder } from './feedbacks-slider-service';

export class FeedBackDisplayService {
    private feedbacks: Feedback[] | undefined = [];

    readonly targetElement: HTMLElement | null = document.querySelector('.container__pets-feedback-desc');
    private sliderBuilder = new FeedbackSliderBuilder();

    constructor(
        private readonly feedbackApiService: FeedbackApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
    ) {}

    public async initialize(): Promise<void> {
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

    private displayFeedbacks(): void {
        if (!this.targetElement || !this.feedbacks) {
            return;
        }

        this.targetElement.innerHTML = '';

        const sliderTrack = this.sliderBuilder.build(this.feedbacks);
        this.targetElement.append(sliderTrack);
    }
}