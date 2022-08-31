import apiService from "./api.service.js";

class TranslatorService {
    async #detectLanguage(text) {
        const body = [{Text: text}];

        try {
            const {data} = await apiService.post("/Detect", body);
            if (data && data.length > 0) {
                return {
                    language: data[0].language,
                    isSupported: data[0].isTranslationSupported,
                };
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async #translateText(text) {
        const from = await this.#detectLanguage(text);
        if (!from.isSupported) {
            return "Não foi possível traduzir a mensagem";
        }

        const body = [{Text: text}];

        try {
            const {data} = await apiService.post(`/translate`, body, {
                params: {
                    'to[0]': 'pt-br',
                    from: from.language,
                }
            });

            if (data && data.length > 0) {
                return data[0].translations[0].text;
            }
        } catch (e) {
            return "Não foi possível traduzir a mensagem";
        }
    }

    async exec(text) {
        return await this.#translateText(text);
    }
}

export default TranslatorService;
