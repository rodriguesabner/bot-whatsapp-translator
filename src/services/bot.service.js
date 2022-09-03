import TranslatorService from "./translator.service.js";
import SpeechService from "./speech.service.js";

class BotService {
    constructor() {
        this.translatorService = new TranslatorService();
        this.speechService = new SpeechService();
        this.userSettings = [];
    }

    async startBot(client) {
        await client.onMessage(async (message) => {
            const currentUserIndex = this.userSettings?.findIndex((u) => u.phone === message.from);

            if (message.body === "#ativaraudio") {
                this.activateAudio(currentUserIndex, message);
                await client.sendText(message.from, "A tradução em formato de áudio foi ativada com sucesso, mande outra msg 😁");
                return;
            }

            if (message.body === "#desativaraudio") {
               this.deactivateAudio(currentUserIndex, message);
            }

            const translatedMessage = await this.translatorService.exec(message.body);
            await client.sendText(message.from, translatedMessage);

            if (currentUserIndex != null && currentUserIndex > -1) {
                if (this.userSettings[currentUserIndex].sendAudio === true) {
                    const pathAudio = await this.speechService.exec(translatedMessage);
                    await client.sendPttFromBase64(message.from, pathAudio, "translated.mp3");
                }
            }
        });
    }

    activateAudio(currentUserIndex, message){
        if (currentUserIndex && currentUserIndex !== -1) {
            this.userSettings[currentUserIndex].sendAudio = true;
        } else {
            this.userSettings.push({
                phone: message.from,
                sendAudio: true
            })
        }
    }

    deactivateAudio(currentUserIndex, message){
        if (currentUserIndex && currentUserIndex > -1) {
            this.userSettings[currentUserIndex].sendAudio = false;
        } else {
            this.userSettings.push({
                phone: message.from,
                sendAudio: false
            })
        }
    }
}

export default BotService;
