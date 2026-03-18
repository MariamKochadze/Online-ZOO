export abstract class PageLifeCycle {
    constructor() {
        window.addEventListener('load', (event: Event) => {
            void this.onWindowLoad(event)
                .then(() => console.log('Page specific logic initialized'))
                .catch((err) => console.error('Error during initialization', err));
        });
    }

    protected abstract onWindowLoad(e: Event): Promise<void>;
}
