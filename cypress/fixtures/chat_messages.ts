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

export const SHORT_COMMENT = 'Hello how are you ?';
export const LONG_COMMENT = `# Test Title

## Subtitle

**Bold**, *Italic*, ~strike-through~

Hello, i want you to by me:
- Milk
- Bread
- Ice-cream
  - Chocolat
    - Dark
    - Milk
  - Vanilla
  - Milk
- Bread

> A quote

And also don't forget to checkout [our awesome platform](https://graasp.org)
A lengthy response to the previous message that i think a lot of people will like to read, since it really goes in deep into the topic.
\`some code\`

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| hello | You | are | here ? |
| hello | You | are | here ? |

## Tasklist

* [ ] to do
* [x] done`;

export const MARKDOWN_COMMENT = {
  id: v4(),
  chatId: CHAT_ID,
  creator: CURRENT_MEMBER.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  body: `# Test Title

## Subtitle

**Bold**, *Italic*, ~strike-through~

Hello, i want you to by me:
- Milk
- Bread
- Ice-cream
  - Chocolat
    - Dark
    - Milk
  - Vanilla
  - Milk
- Bread


> A quote

And also don't forget to checkout [our awesome platform](https://graasp.org)

A lengthy response to the previous message that i think a lot of people will like to read, since it really goes in deep into the topic.

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
