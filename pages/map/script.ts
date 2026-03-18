import { AuthenticationService } from '../../shared/services/authentication-service';
import { AuthenticationStateService } from '../../shared/services/authentication-state-service';
import { UserInfoDisplayService } from '../../shared/services/display-servcies/user-info-display-service';
import { LocalStorageService } from '../../shared/services/local-storage-service';
import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';

class MapPage extends PageLifeCycle {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userInfoDisplayService: UserInfoDisplayService,
    ) {
        super();
    }
    protected async onWindowLoad(): Promise<void> {
        this.authenticationService.initialize();
        this.userInfoDisplayService.initialize();

        await Promise.resolve();
    }
}

const authenticationStateService = new AuthenticationStateService();
const localStorageService = new LocalStorageService();

const userInfoDisplayService = new UserInfoDisplayService(authenticationStateService);
const authenticationService = new AuthenticationService(localStorageService, authenticationStateService);

new MapPage(authenticationService, userInfoDisplayService);
