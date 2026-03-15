import { ApplicationConfiguration } from '../../../config/configuration';
import { FailureData, RegisterRequestBody, SignUpSuccessResponseBody, SuccessData } from '../models/sign-up-model';

export class SignUpApiService {
    constructor(private readonly configuration: ApplicationConfiguration) {}

    public async signUp(registerRequestBody: RegisterRequestBody): Promise<SuccessData | FailureData> {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerRequestBody),
            });

            if (!response.ok) {
                const failure = (await response.json()) as FailureData;
                return { error: failure.error };
            }

            const success = (await response.json()) as SignUpSuccessResponseBody;
            return success.data;
        } catch (error) {
            console.log(error);
            return { error: 'Internal server error' };
        }
    }
}
