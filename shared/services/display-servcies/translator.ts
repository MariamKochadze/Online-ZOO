import { TranslationStateService } from './../translation-state-service';
import { LocalStorageService } from '../local-storage-service';

interface Translations {
    [key: string]: string | Translations;
}

export class Translator {
    private currentLang = 'en';
    private translations: Translations = {};

    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly translationStateService: TranslationStateService,
    ) {}

    public async init(): Promise<void> {
        const savedLang = this.localStorageService.get<string>('lang');
        this.currentLang = savedLang ?? 'en';
        this.translationStateService.setLanguage(this.currentLang);

        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
        this.setupLanguageSwitcher();
    }

    private async loadTranslations(lang: string): Promise<void> {
        try {
            const response = await fetch(`local/${lang}.json`);

            if (!response.ok) {
                console.warn(`Missing ${lang}.json, fallback to en`);

                if (lang !== 'en') {
                    await this.loadTranslations('en');
                }
                return;
            }

            const data = (await response.json()) as Translations;
            this.translations = data;
        } catch (err) {
            console.error('Failed to load translations:', err);
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    }


    private getNestedValue(obj: Translations, path: string): string | undefined {
        const parts = path.split('.');
        let result: string | Translations | undefined = obj;

        for (const part of parts) {
            if (typeof result === 'object' && result !== null && part in result) {
                result = result[part];
            } else {
                return undefined;
            }
        }

        return typeof result === 'string' ? result : undefined;
    }

    private applyTranslations(): void {
        // text content
        document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;

            const translation = this.getNestedValue(this.translations, key);
            if (!translation) return;

            el.textContent = translation;
        });

        // placeholders
        document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;

            const translation = this.getNestedValue(this.translations, key);
            if (!translation) return;

            el.placeholder = translation;
        });
    }

    private setupLanguageSwitcher(): void {
        const buttons = document.querySelectorAll<HTMLElement>('[data-lang]');

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                void (async () => {
                    const lang = btn.getAttribute('data-lang');
                    if (!lang) return;

                    // Remove 'selected' from all buttons
                    buttons.forEach((b) => b.classList.remove('selected'));

                    // Add 'selected' to the clicked button
                    btn.classList.add('selected');

                   
                    this.localStorageService.add('lang', lang);
                    this.currentLang = lang;
                    this.translationStateService.setLanguage(this.currentLang)

            
                    await this.loadTranslations(lang);
                    this.applyTranslations();
                })();
            });
        });
    }
}
