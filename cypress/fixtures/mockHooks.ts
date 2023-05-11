/// <reference types="../cypress"/>
import { QueryObserverResult } from 'react-query';

import {
  ChatMention,
  Member,
  MemberType,
  MentionStatus,
  convertJs,
} from '@graasp/sdk';
import { MemberMentionsRecord, MemberRecord } from '@graasp/sdk/frontend';

import { List } from 'immutable';
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

export const mockUseMentions =
  (): QueryObserverResult<MemberMentionsRecord> => {
    const defaultMention: ChatMention = {
      id: '',
      item: MOCK_ITEM,
      message: 'a message',
      messageId: '',
      member: CURRENT_MEMBER,
      creator: MEMBERS.BOB,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: MentionStatus.UNREAD,
    };

    const CHAT_MENTION_1: ChatMention = {
      ...defaultMention,
      id: v4(),
      creator: MEMBERS.BOB,
      messageId: CHAT_MESSAGES[0].id,
    };
    const CHAT_MENTION_2: ChatMention = {
      ...defaultMention,
      id: v4(),
      creator: MEMBERS.ANNA,
      messageId: CHAT_MESSAGES[1].id,
    };

    const MEMBER_MENTIONS: MemberMentionsRecord = convertJs({
      memberId: CURRENT_MEMBER.id,
      mentions: [CHAT_MENTION_1, CHAT_MENTION_2],
    });
    return {
      data: MEMBER_MENTIONS,
    } as unknown as QueryObserverResult<MemberMentionsRecord>;
  };
