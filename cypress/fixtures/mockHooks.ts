/// <reference types="../cypress"/>
import { List, Record } from 'immutable';
import { v4 } from 'uuid';

import { QueryObserverResult } from 'react-query';

import {
  ChatMention,
  ChatMentionRecord,
  Member,
  MemberExtra,
  MemberExtraRecord,
  MemberMentions,
  MemberMentionsRecord,
  MemberRecord,
} from '@graasp/query-client/dist/src/types';
import { MentionStatus } from '@graasp/sdk';

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

    const createMention: Record.Factory<ChatMention> = Record(defaultMention);
    const CHAT_MENTION_1: ChatMentionRecord = createMention({
      id: v4(),
      creator: MEMBERS.BOB.id,
      messageId: CHAT_MESSAGES[0].id,
    });
    const CHAT_MENTION_2: ChatMentionRecord = createMention({
      id: v4(),
      creator: MEMBERS.ANNA.id,
      messageId: CHAT_MESSAGES[1].id,
    });

    const defaultMemberMentionsValues: MemberMentions = {
      memberId: '',
      mentions: List([]),
    };

    const createMockMemberMentions: Record.Factory<MemberMentions> = Record(
      defaultMemberMentionsValues,
    );
    const MEMBER_MENTIONS: MemberMentionsRecord = createMockMemberMentions({
      memberId: CURRENT_MEMBER.id,
      mentions: List([CHAT_MENTION_1, CHAT_MENTION_2]),
    });
    return {
      data: MEMBER_MENTIONS,
    } as unknown as QueryObserverResult<MemberMentionsRecord>;
  };

export const mockUseMembers = (): QueryObserverResult<List<MemberRecord>> => {
  const defaultMemberExtra: MemberExtra = {
    hasAvatar: false,
  };
  const createMemberExtra: Record.Factory<MemberExtra> =
    Record(defaultMemberExtra);
  const extra: MemberExtraRecord = createMemberExtra();
  const defaultMember: Member = {
    id: '',
    name: '',
    extra,
    email: 'default@mail.com',
  };

  const createMember: Record.Factory<Member> = Record(defaultMember);

  return {
    data: List([
      createMember({ id: MEMBERS.ANNA.id, name: MEMBERS.ANNA.name }),
      createMember({ id: MEMBERS.BOB.id, name: MEMBERS.BOB.name }),
    ]),
  } as unknown as QueryObserverResult<List<MemberRecord>>;
};
