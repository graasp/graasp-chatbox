/// <reference types="./cypress"/>
import { List } from 'immutable';

import { ImmutableMember, Member } from '../../src';
import Chatbox from '../../src/components/Chatbox/Chatbox';
import {
  charCounterCypress,
  dataCyWrapper,
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from '../../src/config/selectors';
import { HARD_MAX_MESSAGE_LENGTH } from '../../src/constants';
import {
  CHAT_ID,
  CHAT_MESSAGES,
  LONG_COMMENT,
  SHORT_COMMENT,
  spyMethod,
} from '../fixtures/chat_messages';
import { MEMBERS } from '../fixtures/members';

describe('Enter text', () => {
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
    const sendMessageSpy = spyMethod('spyMethod');
    cy.mount(
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
    const sendMessageSpy = spyMethod('spyMethod');
    cy.mount(
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

describe('Message Length', () => {
  let sendMessageSpy;
  beforeEach(() => {
    sendMessageSpy = spyMethod('spyMethod');
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        sendMessageFunction={sendMessageSpy}
      />,
    );
  });

  it('should not display char counter when text is empty', () => {
    cy.get(dataCyWrapper(inputTextFieldCypress)).type('{selectAll}{backspace}');
    cy.get(dataCyWrapper(inputTextFieldCypress)).should('contain.text', '');
    cy.get(dataCyWrapper(charCounterCypress)).should('contain.text', '');
  });

  it('should display char counter', () => {
    cy.get(dataCyWrapper(inputTextFieldCypress)).type(SHORT_COMMENT);
    cy.get(dataCyWrapper(charCounterCypress)).should(
      'contain.text',
      SHORT_COMMENT.length,
    );
    cy.get(dataCyWrapper(sendButtonCypress)).should('not.be.disabled').click();
    cy.get('@spyMethod').should('have.been.called');
  });

  it('should display char counter and error message', () => {
    cy.get(dataCyWrapper(inputTextFieldCypress)).type(
      LONG_COMMENT.replace('\n', '{shift}{enter}'),
      { delay: 0 },
    );
    if (LONG_COMMENT.length > HARD_MAX_MESSAGE_LENGTH) {
      cy.get(dataCyWrapper(sendButtonCypress)).should('be.disabled');
      cy.get(dataCyWrapper(charCounterCypress)).should(
        'contain.text',
        LONG_COMMENT.length,
      );
    } else {
      throw new Error('Message is not long enough');
    }
  });
});
