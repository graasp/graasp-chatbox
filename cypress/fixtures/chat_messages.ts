import { v4 } from 'uuid';
import { CURRENT_MEMBER, MEMBERS } from './members';

export const CHAT_ID = v4();

export const CHAT_MESSAGES = [
  {
    id: v4(),
    chatId: CHAT_ID,
    creator: CURRENT_MEMBER.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    body: 'Some text\nOn multiple lines',
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
export const MARKDOWN_COMMENT = {
  id: v4(),
  chatId: CHAT_ID,
  creator: CURRENT_MEMBER.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  body: `# Test Title

## Subtitle

**Bold**, *Italic*, ~strike-through~, __undelined__

Hello, i want you to by me:
- Milk
- Bread
- Ice-cream
  - Chocolat
    - Dark
    - Milk
  - Vanilla

> A quote

And also don't forget to checkout [our awesome platform](https://graasp.org)

\`some code\`

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| hello | You | are | here ? |
| hello | You | are | here ? |

## Tasklist

* [ ] to do
* [x] done`,
};

export const spyMethod = (name: string): Cypress.Agent<sinon.SinonSpy> =>
  cy.spy(() => null).as(name);
