/// <reference types="../cypress"/>
import React from 'react';

import MentionButton from '../../src/components/Mentions/MentionButton';
import {
  dataCyWrapper,
  mentionButtonCypress,
} from '../../src/config/selectors';
import { spyMethod } from '../fixtures/chat_messages';
import { mockUseMembers, mockUseMentions } from '../fixtures/mockHooks';

describe('Mention Button', () => {
  it('should show mention button', () => {
    cy.viewport(500, 300);
    const patchMentionSpy = spyMethod('patchMention');
    const deleteMentionSpy = spyMethod('deleteMention');
    const clearMentionsSpy = spyMethod('clearMentions');
    cy.mount(
      <MentionButton
        color="primary"
        clearAllMentionsFunction={clearMentionsSpy}
        deleteMentionFunction={deleteMentionSpy}
        patchMentionFunction={patchMentionSpy}
        useMentions={mockUseMentions}
        useMembers={mockUseMembers}
      />,
    ).then(() => {
      cy.get(dataCyWrapper(mentionButtonCypress)).should('exist').click();
    });
  });
});
