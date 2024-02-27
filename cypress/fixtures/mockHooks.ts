/// <reference types="../cypress"/>
import { ChatMention, ChatMessage, MentionStatus } from '@graasp/sdk';

import { QueryObserverResult } from '@tanstack/react-query';
import { v4 } from 'uuid';

import { CHAT_MESSAGES } from './chat_messages';
import { MOCK_ITEM } from './item';
import { CURRENT_MEMBER, MEMBERS } from './members';

type SpyHookType = {
  hook: Cypress.Agent<sinon.SinonSpy>;
  name: string;
};

const USE_AVATAR_HOOK_NAME = 'useAvatarUrl';

export const mockUseAvatar = (): SpyHookType => ({
  hook: cy
    .spy(() => {
      return {
        data: 'someText',
        isLoading: false,
        isFetching: false,
      };
    })
    .as(USE_AVATAR_HOOK_NAME),
  name: USE_AVATAR_HOOK_NAME,
});

export const mockUseMentions = (): QueryObserverResult<ChatMention[]> => {
  const defaultMessage: ChatMessage = {
    id: v4(),
    item: MOCK_ITEM,
    creator: MEMBERS.BOB,
    body: 'some message',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const defaultMention: ChatMention = {
    id: '',
    message: defaultMessage,
    member: CURRENT_MEMBER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: MentionStatus.Unread,
  };

  const CHAT_MENTION_1: ChatMention = {
    ...defaultMention,
    id: v4(),
    message: { ...defaultMessage, id: CHAT_MESSAGES[0].id },
  };
  const CHAT_MENTION_2: ChatMention = {
    ...defaultMention,
    id: v4(),
    message: {
      ...defaultMessage,
      id: CHAT_MESSAGES[1].id,
      creator: MEMBERS.ANNA,
    },
  };

  const MEMBER_MENTIONS: ChatMention[] = [CHAT_MENTION_1, CHAT_MENTION_2];
  return {
    data: MEMBER_MENTIONS,
  } as unknown as QueryObserverResult<ChatMention[]>;
};
