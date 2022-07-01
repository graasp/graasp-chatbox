import { Record } from 'immutable';

import { UUID } from '@graasp/ui/dist/types';

import { BUTTON_VARIANT, ICON_VARIANT } from './constants';

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

export interface ChatMessage {
  id: string;
  chatId: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  body: string;
}

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

export type AvatarHookType = (id?: UUID, size?: string) => unknown;
export type ClearChatHookType = (id: UUID) => void;

export const ToolVariants = {
  ICON: ICON_VARIANT,
  BUTTON: BUTTON_VARIANT,
} as const;

export type ToolVariantsType = typeof ToolVariants[keyof typeof ToolVariants];
