import { mount } from '@cypress/react';
import Chatbox from './components/Chatbox';
import { CHAT_ID, CHAT_MESSAGES } from '../cypress/fixtures/chat_messages';
import { ImmutableMember, Member } from './types';
import { MEMBERS } from '../cypress/fixtures/members';
import { List } from 'immutable';
import { mockUseAvatar } from '../cypress/fixtures/mockHooks';

describe('Render Avatar', () => {
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

  it('should call avatar hook', () => {
    const { hook: fakeHook, name: fakeHookName } = mockUseAvatar();
    mount(
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
