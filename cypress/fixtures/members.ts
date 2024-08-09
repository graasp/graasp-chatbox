import { CompleteMember, MemberFactory } from '@graasp/sdk';

export const MEMBERS: { [key: string]: CompleteMember } = {
  ANNA: MemberFactory({
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'anna',
    email: 'anna@email.com',
  }),
  BOB: MemberFactory({
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'bob',
    email: 'bob@email.com',
  }),
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
