export class SignInDisplayService {
    private signInFormButton: HTMLButtonElement | null = null;
    private emailInput: HTMLInputElement | null = null;
    private passwordInput: HTMLInputElement | null = null;

    public async initialzie(): Promise<void> {
        this.signInFormButton = document.querySelector('#signinBtn');
        this.emailInput = document.querySelector('#emailInput');
        this.passwordInput = document.querySelector('#passwordInput');

        await Promise.resolve();
        this.addEventListerSignInForm();
    }

    private addEventListerSignInForm() {
        if (!this.signInFormButton || !this.emailInput || !this.passwordInput) {
            return;
        }

        this.signInFormButton.addEventListener('click', () => {
            const email = this.emailInput?.value;
            const password = this.passwordInput?.value;
            const isEmailValid = this.validateEmail(email);
            const isPasswordValid = this.validatePassword(password);

            if (!isEmailValid || !isPasswordValid) {
                return;
            }

            
        });
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
