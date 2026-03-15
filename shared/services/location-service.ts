type LocationChangeListener = (k: string, v: string) => void;

export class LocationService {
    private listeners: LocationChangeListener[] = [];

    public onLocationChange(listener: LocationChangeListener) {
        this.listeners.push(listener);
    }

    public updateSearchParams(paramKey: string, paramValue: string) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(paramKey, paramValue);
        const newUrl = window.location.pathname + '?' + urlParams.toString();

        history.pushState({ [paramKey]: paramValue }, '', newUrl);

        this.listeners.forEach((l) => l(paramKey, paramValue));
    }

    public getCurrentParamValue(paramKey: string): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get(paramKey);
        return value;
    }

    public navigateTo(url: string): void {
        window.location.href = url;
    }
}
