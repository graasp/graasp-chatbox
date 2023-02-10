/// <reference types="../cypress"/>
import { List } from 'immutable';
import { v4 } from 'uuid';

import { QueryObserverResult } from 'react-query';

import { Member, MemberType, MentionStatus, convertJs } from '@graasp/sdk';
import {
  ChatMention,
  MemberMentionsRecord,
  MemberRecord,
} from '@graasp/sdk/frontend';

import { CHAT_MESSAGES } from './chat_messages';
import { CURRENT_MEMBER, MEMBERS } from './members';

type SpyHookType = {
  hook: Cypress.Agent<sinon.SinonSpy>;
  name: string;
};

const USE_AVATAR_HOOK_NAME = 'useAvatarHook';

export const mockUseAvatar = (): SpyHookType => ({
  hook: cy
    .spy(() => {
      return {
        data: new Blob(['someText']),
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
      itemPath: 'some itemPath',
      message: 'a message',
      messageId: '',
      memberId: CURRENT_MEMBER.id,
      creator: MEMBERS.BOB.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: MentionStatus.UNREAD,
    };

    const CHAT_MENTION_1: ChatMention = {
      ...defaultMention,
      id: v4(),
      creator: MEMBERS.BOB.id,
      messageId: CHAT_MESSAGES[0].id,
    };
    const CHAT_MENTION_2: ChatMention = {
      ...defaultMention,
      id: v4(),
      creator: MEMBERS.ANNA.id,
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

export const mockUseMembers = (): QueryObserverResult<List<MemberRecord>> => {
  const defaultMember: Member = {
    id: '',
    name: '',
    extra: {},
    type: MemberType.Individual,
    email: 'default@mail.com',
    createdAt: 'somedate',
    updatedAt: 'someotherDate',
  };

  const createMember = (member: Partial<Member>): MemberRecord =>
    convertJs({ ...defaultMember, ...member });

  return {
    data: List([
      createMember({ id: MEMBERS.ANNA.id, name: MEMBERS.ANNA.name }),
      createMember({ id: MEMBERS.BOB.id, name: MEMBERS.BOB.name }),
    ]),
  } as unknown as QueryObserverResult<List<MemberRecord>>;
};
