import { mount } from '@cypress/react';
import Chatbox from '../components/Chatbox';
import {
  CHAT_ID,
  CHAT_MESSAGES,
  spyMethod,
} from '../../cypress/fixtures/chat_messages';
import { ImmutableMember, Member } from '../types';
import { MEMBERS } from '../../cypress/fixtures/members';
import { List } from 'immutable';
import {
  adminToolsContainerCypress,
  cancelDialogButtonCypress,
  clearChatButtonCypress,
  confirmDialogButtonCypress,
  dataCyWrapper,
  exportChatButtonCypress,
} from '../config/selectors';
import { verifyDownloadedChat } from './utils/utils';

const mountChatbox = (showTools: boolean, emptyData = false): void => {
  mount(
    <Chatbox
      chatId={CHAT_ID}
      currentMember={new ImmutableMember(MEMBERS.ANNA)}
      members={List(Object.values(MEMBERS) as Member[])}
      messages={emptyData ? List() : List(CHAT_MESSAGES)}
      showAdminTools={showTools}
    />,
  );
};

describe('Admin tools', () => {
  it('should show admin tools', () => {
    // show tools
    mountChatbox(true);
    cy.get(dataCyWrapper(adminToolsContainerCypress))
      .should('exist')
      .and('be.visible');
  });

  it('should not show admin tools', () => {
    // do not show tools
    mountChatbox(false);
    cy.get(dataCyWrapper(adminToolsContainerCypress)).should('not.exist');
  });

  it('should show export chat and download csv', () => {
    // show tools
    mountChatbox(true);
    cy.get(dataCyWrapper(exportChatButtonCypress))
      .should('exist')
      .and('be.visible')
      // download file
      .click();

    // get file name from data-cy-filename attribute and check local csv
    cy.get(dataCyWrapper(exportChatButtonCypress))
      .should('have.attr', 'data-cy-filename')
      .then((filename) => {
        console.log('filename:', filename);
        verifyDownloadedChat(filename.toString(), CHAT_MESSAGES.length);
      });
  });

  it('should not show export chat with empty chat', () => {
    // show tools but with no data
    mountChatbox(true, true);
    cy.get(dataCyWrapper(adminToolsContainerCypress)).should('exist');
    cy.get(dataCyWrapper(exportChatButtonCypress)).should('not.exist');
  });

  it('should show clear chat button', () => {
    const clearChatSpy = spyMethod('spyMethod');
    mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={new ImmutableMember(MEMBERS.ANNA)}
        members={List(Object.values(MEMBERS) as Member[])}
        messages={List(CHAT_MESSAGES)}
        showAdminTools
        clearChatFunction={clearChatSpy}
      />,
    );
    cy.get(dataCyWrapper(clearChatButtonCypress))
      .should('exist')
      .and('be.visible')
      // click button
      .click();
    cy.get(dataCyWrapper(cancelDialogButtonCypress)).should('be.visible');
    cy.get(dataCyWrapper(confirmDialogButtonCypress))
      .should('be.visible')
      // validate popup
      .click();
    // check that spy method has been called
    cy.get('@spyMethod').should('have.been.called');
  });
});
