export class LocalStorageService {
    public add(key: string, value: string | number | object): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public get<T>(key: string): T | undefined {
        const value = localStorage.getItem(key);
        if (!value) {
            return undefined;
        }
        return JSON.parse(value) as T;
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}
