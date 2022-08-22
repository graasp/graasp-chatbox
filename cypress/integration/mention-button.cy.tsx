/// <reference types="./cypress"/>
// import { List } from 'immutable';
//
// import { QueryObserverResult } from 'react-query';
//
// import {
//   MemberMentionsRecord,
//   MemberRecord,
// } from '@graasp/query-client/dist/src/types';
//
// import MentionButton from '../../src/components/Mentions/MentionButton';
// import {
//   dataCyWrapper,
//   exportChatButtonCypress,
// } from '../../src/config/selectors';
// import { spyMethod } from '../fixtures/chat_messages';
//
// const patchMentionSpy = spyMethod('patchMention');
// const deleteMentionSpy = spyMethod('deleteMention');
// const clearMentionsSpy = spyMethod('clearMentions');

// todo: remove when tests are completed
export {};

describe('Mention Button', () => {
  it('should show mention button', () => {
    // cy.mount(
    //   <MentionButton
    //     color="primary"
    //     clearAllMentionsFunction={clearMentionsSpy}
    //     deleteMentionFunction={deleteMentionSpy}
    //     patchMentionFunction={patchMentionSpy}
    //     useMentions={(): QueryObserverResult<MemberMentionsRecord> =>
    //       null as unknown as QueryObserverResult<MemberMentionsRecord>
    //     }
    //     useMembers={(): QueryObserverResult<List<MemberRecord>> =>
    //       null as unknown as QueryObserverResult<List<MemberRecord>>
    //     }
    //     // useMentions={function (
    //     //   options?: { getUpdates?: boolean | undefined } | undefined,
    //     // ): { data?: RecordOf<MemberMentions> | undefined } {
    //     //   throw new Error('Function not implemented.');
    //     // }}
    //     // useMembers={function (memberIds: string[]): {
    //     //   data?: List<Member> | undefined;
    //     // } {
    //     //   throw new Error('Function not implemented.');
    //     // }}
    //   />,
    // ).then(() =>
    //   cy.get(dataCyWrapper(exportChatButtonCypress)).should('exist'),
    // );
  });
});
