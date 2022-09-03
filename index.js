import 'dotenv/config.js';
import {create} from '@wppconnect-team/wppconnect';
import BotService from "./src/services/bot.service.js";

const translator = new BotService();

create({
    session: 'tradutor',
    poweredBy: 'Abner Rodrigues',
    deviceName: 'Tradutor',
    disableWelcome: true,
})
    .then((client) => translator.startBot(client))
    .catch((error) => console.log(error));
