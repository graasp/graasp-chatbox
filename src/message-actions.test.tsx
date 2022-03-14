import { mount } from '@cypress/react';
import Chatbox from './components/Chatbox';
import { CHAT_ID, CHAT_MESSAGES } from '../cypress/fixtures/chat_messages';
import { ImmutableMember, Member } from './types';
import { MEMBERS } from '../cypress/fixtures/members';
import { List } from 'immutable';
import {
  dataCyWrapper,
  deleteMenuItemCypress,
  editBannerCloseButtonCypress,
  editBannerCypress,
  editMenuItemCypress,
  inputTextFieldTextAreaCypress,
  messageActionsButtonCypress,
} from './config/selectors';

describe('Message actions', () => {
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

  it('should display message actions', () => {
    cy.get(dataCyWrapper(messageActionsButtonCypress)).should('be.visible');
  });

  it('should open menu', () => {
    cy.get(dataCyWrapper(messageActionsButtonCypress)).click();
    cy.get(dataCyWrapper(deleteMenuItemCypress)).should('be.visible');
    cy.get(dataCyWrapper(deleteMenuItemCypress)).should('be.visible');
  });
});

describe('Delete action', () => {
  it('should delete message', () => {
    const deleteMessageSpy = cy.spy(() => null).as('spyMethod');
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        deleteMessageFunction={deleteMessageSpy}
      />,
    );
    cy.get(dataCyWrapper(messageActionsButtonCypress))
      .click()
      .get(dataCyWrapper(deleteMenuItemCypress))
      .click();
    cy.get('@spyMethod').should('have.been.called');
  });
});

describe('Edit action', () => {
  beforeEach(() => {
    const editMessageSpy = cy.spy(() => null).as('editSpyMethod');
    const sendMessageSpy = cy.spy(() => null).as('sendSpyMethod');
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        editMessageFunction={editMessageSpy}
        sendMessageFunction={sendMessageSpy}
      />,
    );

    // open menu and click 'edit'
    cy.get(dataCyWrapper(messageActionsButtonCypress))
      .click()
      .get(dataCyWrapper(editMenuItemCypress))
      .click();
  });

  it('should display edit layout', () => {
    // verify it contains the old message text
    cy.get(`#${inputTextFieldTextAreaCypress}`).should(
      'have.value',
      CHAT_MESSAGES[0].body,
    );

    // verify the edit banner shows
    cy.get(dataCyWrapper(editBannerCypress)).should('be.visible');

    // click the close button and the text should clear
    cy.get(dataCyWrapper(editBannerCloseButtonCypress))
      .should('be.visible')
      .click();

    // banner should close and text field should be empty
    cy.get(dataCyWrapper(editBannerCypress)).should('not.exist');
    cy.get(`#${inputTextFieldTextAreaCypress}`).should('have.value', '');
  });

  it('should edit message', () => {
    const inputText = ' New input text';
    cy.get(`#${inputTextFieldTextAreaCypress}`)
      .type(inputText)
      .should('have.value', CHAT_MESSAGES[0].body + inputText)
      .type('{enter}');
    cy.get('@editSpyMethod').should('have.been.called');
    cy.get('@sendSpyMethod').should('not.have.been.called');
  });
});
