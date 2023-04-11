/// <reference types="../support/cypress"/>
import React from 'react';

import { convertJs } from '@graasp/sdk';

import { LEGACY_MENTION_MARKUP, getMentionMarkupFromMember } from '../../src';
import Chatbox from '../../src/components/Chatbox/Chatbox';
import { dataCyWrapper, messageIdCyWrapper } from '../../src/config/selectors';
import { ALL_MEMBERS_DISPLAY, ALL_MEMBERS_MEMBER } from '../../src/constants';
import { CHAT_ID, getMockMessage } from '../fixtures/chat_messages';
import { MEMBERS } from '../fixtures/members';
import { mockUseAvatar } from '../fixtures/mockHooks';

describe('Mention Highlighting', () => {
  it('Display legacy mentions', () => {
    const { hook: fakeHook } = mockUseAvatar();
    const anna = MEMBERS.ANNA;
    const annaMessage = getMockMessage({
      message: getMentionMarkupFromMember(anna, LEGACY_MENTION_MARKUP),
    });
    const allMessage = getMockMessage({
      message: getMentionMarkupFromMember(
        ALL_MEMBERS_MEMBER,
        LEGACY_MENTION_MARKUP,
      ),
    });

    cy.mount(
      <Chatbox
        chatId={CHAT_ID}
        currentMember={convertJs(MEMBERS.ANNA)}
        members={convertJs(Object.values(MEMBERS))}
        messages={convertJs([annaMessage, allMessage])}
        useAvatarHook={fakeHook}
      />,
    );
    cy.get(dataCyWrapper(messageIdCyWrapper(annaMessage.id))).should(
      'contain',
      `@${anna.name}`,
    );
    cy.get(dataCyWrapper(messageIdCyWrapper(allMessage.id))).should(
      'contain',
      `@${ALL_MEMBERS_DISPLAY}`,
    );
  });
});
