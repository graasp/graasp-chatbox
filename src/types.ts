import { Record } from 'immutable';

export type PartialChatMessage = {
  chatId: string;
  body: string;
};

export type ChatMessage = {
  chatId: string;
  creator: string;
  createdAt: string;
  body: string;
};

export type Member = {
  id: string;
  name: string;
};
export class ImmutableMember extends Record({
  id: '',
  name: '',
  type: '',
}) {}
