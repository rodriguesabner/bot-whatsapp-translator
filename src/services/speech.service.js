import TextToSpeechV1 from "ibm-watson/text-to-speech/v1.js";
import {IamAuthenticator} from "ibm-watson/auth/index.js";

class SpeechService {
    constructor() {
        this.textToSpeech = this.#start();
    }

    #start() {
        return new TextToSpeechV1({
            authenticator: new IamAuthenticator({apikey: process.env.API_KEY_SPEECH_TO_TEXT}),
            serviceUrl: process.env.ENDPOINT_SPEECH_TO_TEXT,
        });
    }

    async #streamToBuffer(readableStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on("data", (data) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on("end", () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on("error", reject);
        });
    }

    async #pronunciation(text) {
        try {
            const {result} = await this.textToSpeech.synthesize({
                text,
                accept: 'audio/mp3',
                voice: 'pt-BR_IsabelaV3Voice'
            })

            const buffer = await this.#streamToBuffer(result);
            const base64 = buffer.toString('base64');
            return base64;
        } catch (e) {
            throw new Error(e);
        }
    }

    async exec(text) {
        return this.#pronunciation(text);
    }
}

export default SpeechService;