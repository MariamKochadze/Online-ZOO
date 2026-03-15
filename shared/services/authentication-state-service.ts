import { User } from '../../pages/sign-up/models/sign-up-model';

export class AuthenticationStateService {
    private isAuthenticated = false;
    private currentUser: User | undefined = undefined;

    public setAuthState(isAuthed: boolean): void {
        this.isAuthenticated = isAuthed;
    }

    public setCurrentUser(user: User | undefined) {
        this.currentUser = user;
    }

    public getAuthState(): boolean {
        return this.isAuthenticated;
    }

    public getCurrentUser(): User | undefined {
        return this.currentUser;
    }
}
