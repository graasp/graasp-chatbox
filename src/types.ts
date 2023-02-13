import { List } from 'immutable';

import { UseQueryResult } from 'react-query';

import { Member } from '@graasp/sdk';
import { ChatMessageRecord, MessageBodyType } from '@graasp/sdk/frontend';

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

export type AvatarHookType = (args: {
  id?: string;
  size?: string;
}) => UseQueryResult<Blob>;

export type PartialMemberDisplay = Pick<Member, 'name' | 'id'>;

export type sendMessageFunctionType = (
  message: Pick<ChatMessage, 'chatId'> & { body: MessageBodyType },
) => void;

export type EditMessageFunctionType = (
  message: Pick<ChatMessage, 'chatId' | 'id'> & { body: MessageBodyType },
) => void;

export type DeleteMessageFunctionType = (
  message: Pick<ChatMessage, 'chatId' | 'id'>,
) => void;
