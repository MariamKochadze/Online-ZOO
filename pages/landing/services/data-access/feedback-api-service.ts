import { ApplicationConfiguration } from '../../../../config/configuration';
import { Feedback, FeedbackResponseBody } from '../../models/feedback-model';

export class FeedbackApiService {
    configuration: ApplicationConfiguration;

    constructor(config: ApplicationConfiguration) {
        this.configuration = config;
    }

    public async fetchFeedbacks(): Promise<Feedback[] | undefined> {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/feedback`);

            if (!response.ok) {
                // TODO: once backend implements better error handling we can update as well.(now we have only 500 status)
                throw new Error('Internal server error');
            }

            const result = (await response.json()) as FeedbackResponseBody;
            return result.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}
