import TranslatorService from "./translator.service.js";

class BotService {
    constructor() {
        this.translatorService = new TranslatorService();
    }

    async startBot(client) {
        await client.onMessage(async (message) => {
            const translatedMessage = await this.translatorService.exec(message.body);
            await client.sendText(message.from, translatedMessage);
        });
    }
}

export default BotService;
