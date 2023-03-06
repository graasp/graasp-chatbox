import { List } from 'immutable';

import { UseQueryResult } from 'react-query';

import { ChatMessage, Member, MessageBodyType } from '@graasp/sdk';
import { ChatMessageRecord } from '@graasp/sdk/frontend';

export type ChatMessageList = List<ChatMessageRecord>;

export type AvatarHookType = (args: {
  id?: string;
  size?: string;
}) => UseQueryResult<Blob | undefined>;

export type PartialMemberDisplay = Pick<Member, 'name' | 'id'>;

export type SendMessageFunctionParamType = Pick<ChatMessage, 'chatId'> & {
  body: MessageBodyType;
};
export type SendMessageFunctionType = (
  message: SendMessageFunctionParamType,
) => void;

export type EditMessageFunctionParamType = Pick<
  ChatMessage,
  'chatId' | 'id'
> & { body: MessageBodyType };
export type EditMessageFunctionType = (
  message: EditMessageFunctionParamType,
) => void;

export type DeleteMessageFunctionParamType = Pick<ChatMessage, 'chatId' | 'id'>;
export type DeleteMessageFunctionType = (
  message: DeleteMessageFunctionParamType,
) => void;
