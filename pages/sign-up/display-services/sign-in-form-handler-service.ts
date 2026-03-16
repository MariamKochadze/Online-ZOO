import { FailureData, SignInRequestBody, SuccessData } from '../models/sign-in-model';
import { SignInApiService } from './../data-access/sign-in-api-service';

export class SignInDisplayService {
    private signInFormButton: HTMLButtonElement | null = null;
    private emailInput: HTMLInputElement | null = null;
    private passwordInput: HTMLInputElement | null = null;
    private showErrorDiv: HTMLElement | null = null;

    constructor(private readonly signInApiService: SignInApiService) {}

    public async initialzie(): Promise<void> {
        this.signInFormButton = document.querySelector('#signinBtn');
        this.emailInput = document.querySelector('#emailInput');
        this.passwordInput = document.querySelector('#passwordInput');
        this.showErrorDiv = document.querySelector('#show-error');

        await Promise.resolve();
        this.addEventListerSignInForm();
    }

    private addEventListerSignInForm() {
        if (!this.signInFormButton || !this.emailInput || !this.passwordInput) {
            return;
        }

        this.signInFormButton.addEventListener('click', () => {
            if (this.showErrorDiv) {
                this.showErrorDiv.innerHTML = '';
            }

            const email = this.emailInput?.value;
            const password = this.passwordInput?.value;
            const isEmailValid = this.validateEmail(email);
            const isPasswordValid = this.validatePassword(password);

            if (!isEmailValid || !isPasswordValid) {
                return;
            }

            if (typeof email !== 'string' || typeof password !== 'string') {
                return;
            }

            void this.sendsignInForm({ login: email, password });
        });
    }

    private async sendsignInForm({ login, password }: SignInRequestBody) {
        const response: SuccessData | FailureData = await this.signInApiService.signIn({
            login,
            password,
        });
        if ('error' in response) {
            if (!this.showErrorDiv) {
                return;
            }
            this.showErrorDiv.innerHTML = response.error;
            return;
        }

        localStorage.setItem('accessToken', JSON.stringify(response.access_token));
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.href = './landing.html';
    }

    private validateEmail(email: string | undefined): boolean {
        if (email === undefined) {
            // make inut field red maybe email is required

            return false;
        }

        if (email === '') {
            // make inut field red maybe email is required

            return false;
        }

        return true;
    }

    private validatePassword(password: string | undefined): boolean {
        if (password === undefined) {
            // make inut field red maybe email is required

            return false;
        }

        if (password === '') {
            // make inut field red maybe email is required

            return false;
        }

        return true;
    }
}
