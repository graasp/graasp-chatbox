import { v4 } from 'uuid';
import { CURRENT_MEMBER, MEMBERS } from './members';

export const CHAT_ID = v4();

const INIT_CHAT_MESSAGES = [
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

export let CHAT_MESSAGES = INIT_CHAT_MESSAGES;

export const resetChatMessages = () =>
  (CHAT_MESSAGES = [...INIT_CHAT_MESSAGES]);

export const sendMessage = ({
  chatId,
  body,
}: {
  chatId: string;
  body: string;
}): void => {
  const newMessage = {
    id: v4(),
    chatId,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    body,
  };
  CHAT_MESSAGES = [...CHAT_MESSAGES, newMessage];
};
