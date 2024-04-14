import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {LocaleEn} from "@/i18n/locales/locale-en.ts";

const resources = {
    en: {
        translation: new LocaleEn()
    }
};

void i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
