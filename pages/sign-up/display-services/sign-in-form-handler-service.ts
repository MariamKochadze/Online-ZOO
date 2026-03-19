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
            const emailErrors = this.validateEmail(email);
            const passwordErrors = this.validatePassword(password);

            if (emailErrors.length || passwordErrors.length) {
                [...emailErrors, ...passwordErrors].forEach((e) => {
                    if (!this.showErrorDiv) {
                        return;
                    }
                    this.showErrorDiv.innerText += ' ' + e;
                });
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

    private validateEmail(email: string | undefined): string[] {
        const errors: string[] = [];

        if (email === undefined) {
            errors.push('login: is required!');
        }

        if (email && email.length < 3) {
            errors.push('login: should be at least 3 characters!');
        }

        if (email && !/^[a-zA-Z]+$/.test(email[0])) {
            errors.push('login: should start with letter!');
        }

        if (email && !/^[a-zA-Z]+$/.test(email)) {
            errors.push('login: only English alphabet letters are allowed!');
        }

        return errors;
    }

    private validatePassword(password: string | undefined): string[] {
        const errors = [];
        if (password === undefined) {
            errors.push('password: is required!');
        }

        if (password && password.length < 6) {
            errors.push('password: length should be at least 6 character!');
        }

        if (password && /^[a-zA-Z]+$/.test(password)) {
            errors.push('password: should contain at least one special character!');
        }

        return errors;
    }
}
