/// <reference types="../cypress"/>
import React from 'react';

import { convertJs } from '@graasp/sdk';

import { ImmutableMember } from '../../src';
import Chatbox from '../../src/components/Chatbox/Chatbox';
import {
  dataCyWrapper,
  deleteMenuItemCypress,
  editBannerCloseButtonCypress,
  editBannerCypress,
  editBannerOldTextCypress,
  editMenuItemCypress,
  inputTextFieldTextAreaCypress,
  messageActionsButtonCypress,
} from '../../src/config/selectors';
import { SIDE_PANE_HEIGHT, SIDE_PANE_WIDTH } from '../../src/constants';
import { CHAT_ID, CHAT_MESSAGES, spyMethod } from '../fixtures/chat_messages';
import { CURRENT_MEMBER, MEMBERS } from '../fixtures/members';
import { mockUseAvatar } from '../fixtures/mockHooks';

describe('Message actions', () => {
  beforeEach(() => {
    const { hook: fakeHook } = mockUseAvatar();
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={convertJs(Object.values(MEMBERS))}
        messages={convertJs(CHAT_MESSAGES)}
        useAvatarHook={fakeHook}
      />,
    );
  });

  it('should display message actions', () => {
    cy.get(dataCyWrapper(messageActionsButtonCypress)).each(($el) =>
      cy.wrap($el).should('be.visible'),
    );
  });

  it('should open menu', () => {
    cy.get(dataCyWrapper(messageActionsButtonCypress)).first().click();
    cy.get(dataCyWrapper(deleteMenuItemCypress)).should('be.visible');
    cy.get(dataCyWrapper(deleteMenuItemCypress)).should('be.visible');
  });
});

describe('Delete action', () => {
  it('should delete message', () => {
    const deleteMessageSpy = spyMethod('spyMethod');
    const { hook: fakeHook } = mockUseAvatar();
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={convertJs(Object.values(MEMBERS))}
        messages={convertJs(CHAT_MESSAGES)}
        deleteMessageFunction={deleteMessageSpy}
        useAvatarHook={fakeHook}
      />,
    );
    cy.get(dataCyWrapper(messageActionsButtonCypress))
      .first()
      .click()
      .get(dataCyWrapper(deleteMenuItemCypress))
      .click();
    cy.get('@spyMethod').should('have.been.called');
  });
});

describe('Edit action', () => {
  beforeEach(() => {
    // set the viewport to a narrower width
    cy.viewport(SIDE_PANE_WIDTH, SIDE_PANE_HEIGHT);
    const editMessageSpy = spyMethod('editSpyMethod');
    const sendMessageSpy = spyMethod('sendSpyMethod');
    const { hook: fakeHook } = mockUseAvatar();
    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={convertJs(Object.values(MEMBERS))}
        messages={convertJs(CHAT_MESSAGES)}
        editMessageFunction={editMessageSpy}
        sendMessageFunction={sendMessageSpy}
        useAvatarHook={fakeHook}
      />,
    );

    // open menu and click 'edit'
    cy.get(dataCyWrapper(messageActionsButtonCypress))
      .first()
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

  it('should change edited text when new message is edited', () => {
    const firstMessageIndex = 0;
    const secondMessageIndex = 1;
    cy.get(dataCyWrapper(editBannerOldTextCypress)).should(
      'contain.text',
      CHAT_MESSAGES.filter((m) => m.creator === CURRENT_MEMBER.id)[
        firstMessageIndex
      ].body,
    );
    cy.get(dataCyWrapper(messageActionsButtonCypress))
      .eq(secondMessageIndex)
      .click();
    cy.get(dataCyWrapper(editMenuItemCypress)).click();
    const oldTextMessage = CHAT_MESSAGES.filter(
      (m) => m.creator === CURRENT_MEMBER.id,
    )[secondMessageIndex].body;
    cy.get(dataCyWrapper(editBannerOldTextCypress)).should(
      'contain.text',
      oldTextMessage,
    );
    cy.get(`#${inputTextFieldTextAreaCypress}`).should(
      'have.value',
      oldTextMessage,
    );
  });
});
