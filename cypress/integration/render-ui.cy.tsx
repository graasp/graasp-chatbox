/// <reference types="./cypress"/>
import { List } from 'immutable';
import { v4 } from 'uuid';

import { ImmutableMember, Member } from '../../src';
import Chatbox from '../../src/components/Chatbox/Chatbox';
import {
  dataCyWrapper,
  exportChatButtonCypress,
  inputTextFieldTextAreaCypress,
  messageIdCyWrapper,
  messagesContainerCypress,
} from '../../src/config/selectors';
import { CHAT_ID, CHAT_MESSAGES } from '../fixtures/chat_messages';
import { MEMBERS } from '../fixtures/members';
import { mockUseAvatar } from '../fixtures/mockHooks';

describe('Render Avatar', () => {
  beforeEach(() => {
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
      />,
    );
  });

  it('should call avatar hook', () => {
    const { hook: fakeHook, name: fakeHookName } = mockUseAvatar();
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        useAvatarHook={fakeHook}
      />,
    );
    cy.get(`@${fakeHookName}`).should('have.been.called');
  });
});

describe('Autofocus input field', () => {
  it('should autofocus input field on first render', () => {
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
      />,
    ).then(() =>
      cy.get(`#${inputTextFieldTextAreaCypress}`).should('be.focused'),
    );
  });
});

describe('Messages container', () => {
  it('should scroll when there are a lot of messages', () => {
    const firstId = v4();
    const lastId = v4();
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List([
          {
            ...CHAT_MESSAGES[0],
            id: firstId,
          },
          ...CHAT_MESSAGES,
          ...CHAT_MESSAGES,
          ...CHAT_MESSAGES,
          ...CHAT_MESSAGES,
          {
            ...CHAT_MESSAGES[0],
            id: lastId,
          },
        ])}
      />,
    ).then(() => {
      cy.get(dataCyWrapper(messageIdCyWrapper(lastId))).should('be.visible');
      cy.get(dataCyWrapper(messagesContainerCypress)).scrollTo('top');
      cy.get(dataCyWrapper(messageIdCyWrapper(firstId))).should('be.visible');
    });
  });
});

// describe('Export Chat button', () => {
//   it('should show export button', () => {
//     cy.mount(
//       <Chatbox
//         chatId={CHAT_ID}
//         currentMember={new ImmutableMember(MEMBERS.ANNA)}
//         members={List(Object.values(MEMBERS) as Member[])}
//         messages={List(CHAT_MESSAGES)}
//         showAdminTools
//       />,
//     ).then(() =>
//       cy.get(dataCyWrapper(exportChatButtonCypress)).should('exist'),
//     );
//   });

//   it('should not show button when chat is empty', () => {
//     cy.mount(
//       <Chatbox
//         chatId={CHAT_ID}
//         currentMember={new ImmutableMember(MEMBERS.ANNA)}
//         members={List(Object.values(MEMBERS) as Member[])}
//         showAdminTools
//       />,
//     ).then(() =>
//       cy.get(dataCyWrapper(exportChatButtonCypress)).should('not.exist'),
//     );
//   });

//   it('should not show export button', () => {
//     cy.mount(
//       <Chatbox
//         chatId={CHAT_ID}
//         currentMember={new ImmutableMember(MEMBERS.ANNA)}
//         members={List(Object.values(MEMBERS) as Member[])}
//         showAdminTools={false}
//       />,
//     ).then(() =>
//       cy.get(dataCyWrapper(exportChatButtonCypress)).should('not.exist'),
//     );
//   });
// });
