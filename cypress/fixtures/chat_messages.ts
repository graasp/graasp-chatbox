import { v4 } from 'uuid';
import { CURRENT_MEMBER, MEMBERS } from './members';

export const CHAT_ID = v4();

export const CHAT_MESSAGES = [
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    updatedAt: '',
    body: 'Some text\nOn multiple lines',
  },
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: MEMBERS.BOB.id,
    createdAt: new Date().toISOString(),
    updatedAt: '',
    body: 'And here a text with 2\n\nLine breaks',
  },
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    updatedAt: '',
    body: 'Message',
  },
];

export const spyMethod = (name: string): Cypress.Agent<sinon.SinonSpy> =>
  cy.spy(() => null).as(name);
