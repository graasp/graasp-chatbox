import { mount } from '@cypress/react';
import Chatbox from './components/Chatbox';
import {
  dataCyWrapper,
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from './config/selectors';
import { List } from 'immutable';
import { ImmutableMember, Member } from './index';
import { CHAT_ID, CHAT_MESSAGES } from '../cypress/fixtures/chat_messages';
import { MEMBERS } from '../cypress/fixtures/members';

describe('Enter text', () => {
  beforeEach(() => {
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
      />,
    );
  });

  it('should enter text', () => {
    const inputText = 'Hello there';

    cy.get(`#${inputTextFieldTextAreaCypress}`)
      .type(inputText)
      .should('contain.value', inputText);
  });

  it('should add a new line', () => {
    const inputText = 'Hello there';
    cy.get(`#${inputTextFieldTextAreaCypress}`)
      .type(inputText)
      .type('{shift}{enter}{shift}')
      .should('contain', '\n');
  });
});

describe('Send message', () => {
  it('should send a message with click', () => {
    const inputText = 'Hello there';
    const sendMessageSpy = cy.spy(() => null).as('spyMethod');
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        sendMessageFunction={sendMessageSpy}
      />,
    );
    cy.get(dataCyWrapper(inputTextFieldCypress)).type(inputText);
    cy.get(dataCyWrapper(sendButtonCypress)).click();
    cy.get('@spyMethod').should('have.been.called');
  });

  it('should send a message with enter', function () {
    const inputText = 'Hello there';
    const sendMessageSpy = cy.spy(() => null).as('spyMethod');
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        sendMessageFunction={sendMessageSpy}
      />,
    );
    cy.get(dataCyWrapper(inputTextFieldCypress))
      .type(inputText)
      .type('{enter}');
    cy.get('@spyMethod').should('have.been.called');
  });
});
