import { ApplicationConfiguration } from "../../../../config/configuration";
import { Feedback, FeedbackResponseBody } from "../../models/feedback-model";

export class FeedbackApiService {
    configuration: ApplicationConfiguration;

    constructor(config: ApplicationConfiguration) {
        this.configuration = config;
    }

    public async fetchFeedbacks(): Promise<Feedback[] | undefined> {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/feedback`);
            const result = (await response.json()) as FeedbackResponseBody;
            return result.data;
        } catch (error) {
            console.error(error);
            return undefined
        }
    }
}
