import { AuthenticationStateService } from './../authentication-state-service';

export class UserInfoDisplayService {
    private userInfo: HTMLElement | null = null;

    constructor(private readonly authenticationStateService: AuthenticationStateService) {}

    public initialize() {
        this.userInfo = document.querySelector('#user-info');
        console.log(this.userInfo);
        if (!this.userInfo) {
            return;
        }

        console.log(this.authenticationStateService.getAuthState());

        if (this.authenticationStateService.getAuthState()) {
            this.userInfo.innerHTML = `<a href="./profile.html">${this.authenticationStateService.getCurrentUser()?.name}</a> <button>Logout</button>`;
        } else {
            this.userInfo.innerHTML = `<a href="./signup.html">SIGN IN/SIGN UP</a>`;
        }
    }
}
