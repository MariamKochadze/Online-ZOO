export abstract class PageLifeCycle {
    constructor() {
        window.addEventListener('load', (event: Event) => {
            void this.onWindowLoad(event)
                .then(() => console.log('Page specific logic initialized'))
                .catch((err) => console.error('Error during initialization', err));
        });

        window.addEventListener('beforeunload', (event: Event) => {
            void this.onWindowUnLoad(event)
                .then(() => console.log('Page specific logic disposed'))
                .catch((err) => console.error('Error during disposion', err));
        });
    }

    protected abstract onWindowLoad(e: Event): Promise<void>;

    protected abstract onWindowUnLoad(e: Event): Promise<void>;
}
