import { mount } from '@cypress/react';
import Chatbox from './components/Chatbox';
import {
  dataCyWrapper,
  inputTextFieldCypress,
  messageIdCyWrapper,
  sendButtonCypress,
} from './config/selectors';
import { List } from 'immutable';
import { ImmutableMember, Member } from './index';
import {
  CHAT_ID,
  CHAT_MESSAGES,
  sendMessage,
} from '../cypress/fixtures/chat_messages';
import { MEMBERS } from '../cypress/fixtures/members';

describe('Sending message', () => {
  it('enters message', () => {
    const inputText = 'Hello there';
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        sendMessageFunction={sendMessage}
      />,
    );
    cy.get(dataCyWrapper(inputTextFieldCypress)).type(inputText);
    cy.get(dataCyWrapper(sendButtonCypress)).click();
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        sendMessageFunction={sendMessage}
      />,
    ).then(({ rerender }) => {
      rerender(
        <Chatbox
          chatId={CHAT_ID}
          currentMember={new ImmutableMember(MEMBERS.ANNA)}
          members={List(Object.values(MEMBERS) as Member[])}
          messages={List(CHAT_MESSAGES)}
          sendMessageFunction={sendMessage}
        />,
      );
    });
    const latestId = CHAT_MESSAGES.at(-1)?.id;
    cy.get(dataCyWrapper(messageIdCyWrapper(latestId))).should('exist');
  });
});
