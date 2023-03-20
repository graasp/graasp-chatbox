import { UseQueryResult } from 'react-query';

import { ChatMessage, Member, MessageBodyType } from '@graasp/sdk';
import { ImmutableCast } from '@graasp/sdk/frontend';

import { List } from 'immutable';

export type ChatMessageList = List<ImmutableCast<ChatMessage>>;

export type AvatarHookType = (args: {
  id?: string;
  size?: string;
}) => UseQueryResult<string | undefined>;

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
