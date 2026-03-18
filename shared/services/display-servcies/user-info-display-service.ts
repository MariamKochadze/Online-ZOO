import { AuthenticationStateService } from './../authentication-state-service';

export class UserInfoDisplayService {
    private userInfo: HTMLElement | null = null;

    constructor(private readonly authenticationStateService: AuthenticationStateService) {}

    public initialize() {
        this.userInfo = document.querySelector('#user-info');

        if (!this.userInfo) return;

        const user = this.authenticationStateService.getCurrentUser();
        const isLoggedIn = this.authenticationStateService.getAuthState();

        if (isLoggedIn && user) {
            const profileIcon = document.createElement('div');
            profileIcon.className = 'profile-trigger';
            profileIcon.innerHTML = `<img src="../../assets/icons/profile.svg" alt="User" />`;

            const username = document.createElement('span');
            username.innerText = user.name;

            profileIcon.addEventListener('click', (e) => {
                e.stopPropagation(); 
                this.toggleUserPopup(user.name, user.email);
            });

            this.userInfo.innerHTML = '';
            this.userInfo.appendChild(profileIcon);
            this.userInfo.append(username);
        } else {

            this.userInfo.innerHTML = `
                <a href="./signup.html" class="login-link">
                    <img src="../../assets/icons/register.png" alt="Register" />
                </a>`;
        }
    }

    private toggleUserPopup(name: string, email: string) {
        let popup: HTMLElement | null = document.querySelector('.user-popup');

        if (popup) {
            popup.remove();
            return;
        }

        popup = document.createElement('div');
        popup.className = 'user-popup';
        popup.innerHTML = `
            <div class="user-popup__info">
                <p class="user-popup__name"><strong>Name:</strong> ${name}</p>
                <p class="user-popup__email"><strong>Email:</strong> ${email}</p>
            </div>
            <button id="logout-btn" class="logout-button">Log Out</button>
        `;

        this.userInfo?.appendChild(popup);

        document.getElementById('logout-btn')?.addEventListener('click', () => {
            localStorage.removeItem('token'); 
            localStorage.removeItem('user');
            window.location.reload(); 
        });

        document.addEventListener('click', () => popup.remove(), { once: true });
    }
}
