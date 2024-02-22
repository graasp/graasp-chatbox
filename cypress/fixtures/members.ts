import { CompleteMember, MemberType } from '@graasp/sdk';

export const MEMBERS: { [key: string]: CompleteMember } = {
  ANNA: {
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'anna',
    email: 'anna@email.com',
    type: MemberType.Individual,
    extra: {},
    createdAt: '2023-12-11T23:00:45.456Z',
    updatedAt: '2023-12-11T23:00:45.456Z',
  },
  BOB: {
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'bob',
    email: 'bob@email.com',
    type: MemberType.Individual,
    extra: {},
    createdAt: '2023-12-11T23:00:45.456Z',
    updatedAt: '2023-12-11T23:00:45.456Z',
  },
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
