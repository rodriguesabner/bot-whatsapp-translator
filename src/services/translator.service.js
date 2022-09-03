import LanguageTranslatorV3 from "ibm-watson/language-translator/v3.js";
import {IamAuthenticator} from "ibm-watson/auth/index.js";

class TranslatorService {
    constructor() {
        this.languageTranslator = this.startService();
    }

    startService(){
        return new LanguageTranslatorV3({
            version: process.env.WATSON_API_VERSION,
            authenticator: new IamAuthenticator({
                apikey: process.env.API_KEY_TRANSLATOR,
            }),
            serviceUrl: process.env.ENDPOINT_TRANSLATOR,
        });
    }

    async #detectLanguage(text) {
        try {
            const {result} = await this.languageTranslator.identify({text})
            if(result.languages.length > 0) {
                return result.languages[0];
            }

            return null;
        } catch (e) {
            throw new Error(e);
        }
    }

    async #translateText(text) {
        const from = await this.#detectLanguage(text);
        if (!from.language) {
            return "Não foi possível detectar a linguagem informada";
        }

        try {
            const {result} = await this.languageTranslator.translate({
                text,
                modelId: `${from.language}-pt`
            })

            return result.translations[0].translation;
        } catch (e) {
            return "Não foi possível traduzir a mensagem";
        }
    }

    async exec(text) {
        return await this.#translateText(text);
    }
}

export default TranslatorService;
