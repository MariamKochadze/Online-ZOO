import { FailureData, SignInRequestBody, SignInSuccessResponseBody, SuccessData } from '../models/sign-in-model';
import { ApplicationConfiguration } from './../../../config/configuration';

export class SignInApiService {
    constructor(private readonly applicationConfiguration: ApplicationConfiguration) {}

    public async signIn(signIn: SignInRequestBody): Promise<SuccessData | FailureData> {
        try {
            const response = await fetch(`${this.applicationConfiguration.apiUrl}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(signIn),
            });

            if (!response.ok) {
                const failure = (await response.json()) as FailureData;
                return failure;
            }

            const success = (await response.json()) as SignInSuccessResponseBody;
            return success.data;
        } catch (error) {
            console.error(error);
            return { error: 'Internal server error' };
        }
    }
}
