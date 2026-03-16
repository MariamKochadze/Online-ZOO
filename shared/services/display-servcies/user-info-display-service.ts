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
            const logoutButton: HTMLAnchorElement = document.createElement('a');
            const img: HTMLImageElement = document.createElement('img');
            img.src = '../../assets/icons/logout.png';

            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.reload();
            });

            logoutButton.appendChild(img);
            this.userInfo.innerHTML = '';
            this.userInfo.appendChild(logoutButton);
        } else {
            this.userInfo.innerHTML = `<a href="./signup.html"><img src="../../assets/icons/register.png" alt="" /></a>`;
        }
    }
}
