import { ApplicationConfiguration } from '../../../config/configuration';

class SignInApiService {
    constructor(private readonly configuration: ApplicationConfiguration) {}

    public async signIn(email: string, password: string) {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const result = (await response.json()) as { error: string };
                return { error: result.error };
            }

            
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}
