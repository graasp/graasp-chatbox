import { v4 } from 'uuid';
import { CURRENT_MEMBER, MEMBERS } from './members';

export const CHAT_ID = v4();

export const CHAT_MESSAGES = [
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    body: 'Some text\nOn multiple lines',
  },
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: MEMBERS.BOB.id,
    createdAt: new Date().toISOString(),
    body: 'And here a text with 2\n\nLine breaks',
  },
];
