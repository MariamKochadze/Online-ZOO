import { AuthenticationStateService } from './../authentication-state-service';

export class UserInfoDisplayService {
    private userInfo: HTMLElement | null = null;

    constructor(private readonly authenticationStateService: AuthenticationStateService) {}

    public initialize() {
        this.userInfo = document.querySelector('#user-info');

        if (!this.userInfo) {
            return;
        }

        if (this.authenticationStateService.getAuthState()) {
            const userNameAncor: HTMLAnchorElement = document.createElement('a');
            const logOutButton: HTMLButtonElement = document.createElement('button');

            logOutButton.addEventListener('click', () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.reload();
            });

            userNameAncor.innerText = this.authenticationStateService.getCurrentUser()?.name ?? '';
            logOutButton.innerText = 'LogOut';

            const fragment = document.createDocumentFragment();

            fragment.appendChild(userNameAncor);
            fragment.appendChild(logOutButton);
            this.userInfo.innerHTML = '';
            this.userInfo.appendChild(fragment);
        } else {
            this.userInfo.innerHTML = `<a href="./signup.html">SIGN IN/SIGN UP</a>`;
        }
    }
}
