import api from "./services/api.js";

class Translator {
    async detectLanguage(text) {
        const body = [{
            Text: text
        }];

        try {
            const {data} = await api.post("/Detect", body, {
                params: {
                    'api-version': '3.0',
                }
            });
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

    async translateMessage(text) {
        const detectedLanguage = await this.detectLanguage(text);
        if (detectedLanguage.isSupported) {
            const body = [{
                Text: text
            }];

            const {data} = await api.post(`/translate`, body, {
                params: {
                    from: detectedLanguage.language,
                    'to[0]': 'pt-br',
                    'api-version': '3.0',
                }
            });

            if (data && data.length > 0) {
                return data[0].translations[0].text;
            }
        } else {
            return "Não foi possível traduzir a mensagem";
        }
    }

    async startBot(client) {
        await client.onMessage(async (message) => {
            const translatedMessage = await this.translateMessage(message.body);
            if (translatedMessage) {
                await client.sendText(message.from, translatedMessage);
            }
        });
    }
}

export default Translator;
