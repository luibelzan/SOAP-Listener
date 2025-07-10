import TelegramBot from 'node-telegram-bot-api';
import { clientBotTokens } from './botsConfig';

type BotInfo = {
    bot: TelegramBot;
    chatId?: string;
};

const bots: Record<string, BotInfo> = {};

for(const [dbName, token] of Object.entries(clientBotTokens)) {
    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id.toString();
        console.log(`Nuevo /start para ${dbName}, chatId: ${chatId}`);

        //Guarda el chatId en memoria (o base de datos)
        bots[dbName].chatId = chatId;

        bot.sendMessage(chatId, `¡Hola! Este bot ahora está vinculado al cliente "${dbName}".`);
    });

    bots[dbName] = { bot };
}

export function sendToClientBot(dbName: string, message: string) {
    const botInfo = bots[dbName];

    if(!botInfo?.chatId) {
        console.warn(`No se ha recibido /start aún para ${dbName}.`);
        return;
    }

    botInfo.bot.sendMessage(botInfo.chatId, message, { parse_mode: 'HTML' }).catch(err => console.error(`Error al enviar mensaje a ${dbName}:`, err));
}