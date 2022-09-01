import { List, Record } from 'immutable';

import { UseQueryResult } from 'react-query';

import { ChatMessageRecord } from '@graasp/query-client/dist/src/types';
import { UUID } from '@graasp/ui/dist/types';

import { BUTTON_VARIANT, ICON_VARIANT } from './constants';

export type EditingProp = {
  open: boolean;
  id: string;
  body: string;
};

export interface ChatMessage {
  id: string;
  chatId: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  body: string;
}

export type ChatMessageList = List<ChatMessageRecord>;

export interface ExportedChatMessage extends ChatMessage {
  creatorName: string;
}

export type Member = {
  id: string;
  name: string;
};

export class ImmutableMember extends Record({
  id: '',
  name: '',
  type: '',
}) {}

export type AvatarHookType = (args: {
  id?: UUID;
  size?: string;
}) => UseQueryResult<Blob>;
export type ClearChatHookType = (id: UUID) => void;

export const ToolVariants = {
  ICON: ICON_VARIANT,
  BUTTON: BUTTON_VARIANT,
} as const;

export type ToolVariantsType = typeof ToolVariants[keyof typeof ToolVariants];
