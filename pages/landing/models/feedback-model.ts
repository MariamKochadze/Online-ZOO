export interface FeedbackResponseBody {
    readonly data: Feedback[];
}

export interface Feedback {
    readonly id: number;
    readonly city: string;
    readonly month: string;
    readonly year: string;
    readonly text: string;
    readonly name: string;
}
