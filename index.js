import 'dotenv/config';
import {create} from '@wppconnect-team/wppconnect';
import Translator from "./src/translator.js";

const translator = new Translator();

create({
    session: 'tradutor',
    poweredBy: 'Abner Rodrigues',
})
    .then((client) => translator.startBot(client))
    .catch((error) => console.log(error));
