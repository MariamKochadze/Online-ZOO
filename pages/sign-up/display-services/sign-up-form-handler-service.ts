import { LocationService } from './../../../shared/services/location-service';
import { LocalStorageService } from './../../../shared/services/local-storage-service';
import { FailureData, RegisterRequestBody, SuccessData } from '../models/sign-up-model';
import { SignUpApiService } from './../data-access/sing-up-api-service';
export class SignUpDisplayService {
    private signUpFormButton: HTMLButtonElement | null = null;
    private emailInput: HTMLInputElement | null = null;
    private passwordInput: HTMLInputElement | null = null;
    private loginInput: HTMLInputElement | null = null;
    private nameInput: HTMLInputElement | null = null;

    private showErrorDiv: HTMLElement | null = null;

    constructor(
        private readonly signUpApiService: SignUpApiService,
        private readonly localStorageService: LocalStorageService,
        private readonly locationService: LocationService,
    ) {}

    public async initialzie(): Promise<void> {
        this.signUpFormButton = document.querySelector('#signupBtn');
        this.emailInput = document.querySelector('#emailInput');
        this.passwordInput = document.querySelector('#passwordInput');
        this.loginInput = document.querySelector('#loginInput');
        this.nameInput = document.querySelector('#nameInput');

        this.showErrorDiv = document.querySelector('#show-error');

        await Promise.resolve();
        this.addEventListerSignUpForm();
    }

    private addEventListerSignUpForm() {
        if (!this.signUpFormButton || !this.emailInput || !this.passwordInput) {
            return;
        }

        this.signUpFormButton.addEventListener('click', () => {
            this.hideError();
            const email = this.emailInput?.value;
            const password = this.passwordInput?.value;
            const login = this.loginInput?.value;
            const name = this.nameInput?.value;
            const isEmailValid = this.validateEmail(email);
            const isPasswordValid = this.validatePassword(password);
            const isValidLogin = this.validateLogin(login);
            const isValidName = this.validateName(name);

            if (!isEmailValid || !isPasswordValid || !isValidLogin || !isValidName) {
                return;
            }

            void this.sendSignUpRequest({ email, password, login, name });
        });
    }

    private async sendSignUpRequest({ email, password, login, name }: RegisterRequestBody): Promise<void> {
        const response: SuccessData | FailureData = await this.signUpApiService.signUp({
            email,
            password,
            login,
            name,
        });

        if (this.isFailure(response)) {
            this.showFormError(response.error);
        } else {
            this.localStorageService.add('accessToken', response.access_token);
            this.localStorageService.add('user', response.user);
            this.locationService.navigateTo('./landing.html');
        }
    }

    private isFailure(response: SuccessData | FailureData): response is FailureData {
        return 'error' in response;
    }

    private showFormError(error: string): void {
        if (!this.showErrorDiv) {
            return;
        }

        this.showErrorDiv.innerHTML = error;
    }

    private hideError() {
        if (!this.showErrorDiv) {
            return;
        }

        this.showErrorDiv.innerHTML = '';
    }

    private validateEmail(email: string | undefined): email is string {
        if (typeof email !== 'string') {
            // make inut field red maybe email is required

            return false;
        }

        if (email === '') {
            // make inut field red maybe email is required

            return false;
        }

        return true;
    }

    private validatePassword(password: string | undefined): password is string {
        if (typeof password !== 'string') {
            // make inut field red maybe email is required

            return false;
        }

        if (password === '') {
            // make inut field red maybe email is required

            return false;
        }

        return true;
    }

    private validateLogin(login: string | undefined): login is string {
        if (typeof login !== 'string') {
            // make inut field red maybe email is required

            return false;
        }

        if (login === '') {
            // make inut field red maybe email is required

            return false;
        }

        return true;
    }

    private validateName(name: string | undefined): name is string {
        if (typeof name !== 'string') {
            // make inut field red maybe email is required

            return false;
        }

        if (name === '') {
            // make inut field red maybe email is required

            return false;
        }

        return true;
    }
}
