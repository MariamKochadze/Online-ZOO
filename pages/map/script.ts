import { PageLifeCycle } from '../../shared/services/page-lifecycle-service';

class MapPage extends PageLifeCycle {
    protected async onWindowLoad(event: Event): Promise<void> {
        console.log(event);
        await Promise.resolve();
    }

    protected async onWindowUnLoad(event: Event): Promise<void> {
        console.log(event);
        await Promise.resolve();
    }
}

new MapPage();
