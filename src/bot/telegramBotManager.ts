import TelegramBot from 'node-telegram-bot-api';
import { clientBotTokens } from '../config/botsConfig';
import { loadChatIds, saveChatId } from '../utils/chatStorage';

type BotInfo = {
    bot: TelegramBot;
    chatId?: string;
};

const bots: Record<string, BotInfo> = {};
const savedChatIds = loadChatIds();

for (const [dbName, config] of Object.entries(clientBotTokens)) {
  const token = config.token;

  if (!token || !/^(\d+):[\w-]{30,}$/.test(token)) {
    console.warn(`⚠️ Token inválido o vacío para ${dbName}. Bot omitido.`);
    continue;
  }

  try {
    const bot = new TelegramBot(token, { polling: true });
    bots[dbName] = { bot };

    //Recupera chatId si ya esta guardado
    if(saveChatId[dbName]) {
      bots[dbName].chatId = savedChatIds[dbName];
      console.log(`✅ chatId restaurado para ${dbName}: ${savedChatIds[dbName]}`);
    }

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id.toString();
      bots[dbName].chatId = chatId;
      saveChatId(dbName, chatId);
      bot.sendMessage(chatId, `¡Hola! Bot vinculado al cliente "${dbName}".`);
    });

    console.log(`✅ Bot para ${dbName} iniciado correctamente`);
  } catch (error) {
    console.error(`❌ Error al iniciar bot para ${dbName}:`, error);
  }
}



export function sendToClientBot(dbName: string, message: string) {
    const botInfo = bots[dbName];

    if(!botInfo?.chatId) {
        console.warn(`No se ha recibido /start aún para ${dbName}.`);
        return;
    }

    botInfo.bot.sendMessage(botInfo.chatId, message, { parse_mode: 'HTML' }).catch(err => console.error(`Error al enviar mensaje a ${dbName}:`, err));
}