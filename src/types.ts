import { Record } from 'immutable';
import { UUID } from '@graasp/ui/dist/types';

export type EditingProp = {
  open: boolean;
  id: string;
  body: string;
};

export type PartialNewChatMessage = {
  chatId: string;
  body: string;
};

export type PartialChatMessage = {
  chatId: string;
  messageId: string;
  body?: string;
};

export type ChatMessage = {
  id: string;
  chatId: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
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

export type AvatarHookType = (id?: UUID, size?: string) => unknown;
