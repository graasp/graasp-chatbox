import { Member, MemberType } from '@graasp/sdk';

const dateNow = new Date().toISOString();
export const MEMBERS: { [key: string]: Member } = {
  ANNA: {
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'anna',
    email: 'anna@email.com',
    type: MemberType.Individual,
    extra: {},
    createdAt: dateNow,
    updatedAt: dateNow,
  },
  BOB: {
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'bob',
    email: 'bob@email.com',
    type: MemberType.Individual,
    extra: {},
    createdAt: dateNow,
    updatedAt: dateNow,
  },
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
