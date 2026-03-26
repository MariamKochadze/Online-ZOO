import { ErrorDisplayService } from '../../../../../shared/services/display-servcies/error-display-service';
import { LoaderDisplayService } from '../../../../../shared/services/display-servcies/loader-display-service';
import { Feedback } from '../../../models/feedback-model';
import { FeedbackApiService } from '../../data-access/feedback-api-service';
import { FeedbackSliderBuilder } from './feedbacks-slider-service';
import feedbackKa from '../../../../../local/feedback-ka.json';
import { TranslationStateService } from '../../../../../shared/services/translation-state-service';

export class FeedBackDisplayService {
    private feedbacks: Feedback[] | undefined = [];

    readonly targetElement: HTMLElement | null = document.querySelector('.container__pets-feedback-desc');

    constructor(
        private readonly feedbackApiService: FeedbackApiService,
        private readonly loaderDisplayService: LoaderDisplayService,
        private readonly errorDisplayService: ErrorDisplayService,
        private readonly translationStateService: TranslationStateService,
    ) {}

    public async initialize(): Promise<void> {
        this.translationStateService.onLanguageChange(this.displayFeedbacks.bind(this));

        if (this.targetElement === null) {
            throw new Error('Target element must exist');
        }

        this.loaderDisplayService.show(this.targetElement);

        this.feedbacks = await this.feedbackApiService.fetchFeedbacks();

        this.loaderDisplayService.hide(this.targetElement);

        if (!this.feedbacks) {
            this.errorDisplayService.showError(this.targetElement);
        } else {
            this.displayFeedbacks(this.translationStateService.getCurrentlanguage());
        }
    }

    private displayFeedbacks(lang: string): void {
        if (!this.targetElement || !this.feedbacks) {
            return;
        }

        const sliderBuilder = new FeedbackSliderBuilder();
        let sliderTrack;

        if (lang === 'ka') {
            sliderTrack = sliderBuilder.build(feedbackKa.data);
        } else {
            sliderTrack = sliderBuilder.build(this.feedbacks);
        }

        this.targetElement.innerHTML = '';
        this.targetElement.append(sliderTrack);
    }
}