import { v4 } from 'uuid';

import { CHAT_ID } from './chat_messages';
import { CURRENT_MEMBER, MEMBERS } from './members';

export const CHAT_MENTIONS = [
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    body: 'Some really long text that is going to be wrapped to the next line i think, we need to test.\nOn multiple lines',
  },
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: MEMBERS.BOB.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    body: 'A lengthy response to the previous message that i think a lot of people will like to read, since it really goes in deep into the topic.\nAnd here also a preview of the next topic.\n\nSigned Bob',
  },
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: MEMBERS.BOB.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    body: 'And here a text with 2\n\nLine breaks',
  },
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    body: 'Message',
  },
];
