abstract class PageLifeCycle {
    constructor() {
        window.addEventListener('load', (event: Event) => {
            this.onWindowLoad(event);
        });

        window.addEventListener('beforeunload', (event: Event) => {
            this.onWindowUnLoad(event);
        });
    }

    protected abstract onWindowLoad(e: Event): void;

    protected abstract onWindowUnLoad(e: Event): void;
}

class MapPage extends PageLifeCycle {
    protected onWindowLoad(event: Event): void {
        console.log(event);
    }

    protected onWindowUnLoad(event: Event): void {
        console.log(event);
    }
}

new MapPage();
