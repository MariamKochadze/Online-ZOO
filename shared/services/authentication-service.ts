import { User } from '../../pages/sign-up/models/sign-up-model';
import { AuthenticationStateService } from './authentication-state-service';
import { LocalStorageService } from './local-storage-service';

export class AuthenticationService {
    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly authenticationStateService: AuthenticationStateService,
    ) {}

    public initialize() {
        const accessToken = this.localStorageService.get<string>('accessToken');
        const user = this.localStorageService.get<User>('user');

        if (!accessToken || !user) {
            this.authenticationStateService.setAuthState(false);
            this.authenticationStateService.setCurrentUser(undefined);
            return;
        }

        this.authenticationStateService.setAuthState(true);
        this.authenticationStateService.setCurrentUser(user);
    }
}
