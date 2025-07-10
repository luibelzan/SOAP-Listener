import fs from 'fs';
import path from 'path';

const CHAT_FILE = path.join(__dirname, '../../storage/chatIds.json');

type ChatStore = Record<string, string>;

export function loadChatIds(): ChatStore {
  if (!fs.existsSync(CHAT_FILE)) return {};
  const data = fs.readFileSync(CHAT_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveChatId(clientName: string, chatId: string) {
  const chatData = loadChatIds();
  chatData[clientName] = chatId;
  fs.writeFileSync(CHAT_FILE, JSON.stringify(chatData, null, 2));
}
