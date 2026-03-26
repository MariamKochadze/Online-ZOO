type Listener = (lang: string) => void;

export class TranslationStateService {
    private listeners: Listener[] = [];
    private cuurentLanguage = 'en';

    public onLanguageChange(cb: Listener) {
        this.listeners.push(cb);
    }

    public setLanguage(lang: string) {
        this.cuurentLanguage = lang;
        this.listeners.forEach((cb) => {
            cb(this.cuurentLanguage);
        });
    }

    public getCurrentlanguage(): string {
        return this.cuurentLanguage;
    }
}
