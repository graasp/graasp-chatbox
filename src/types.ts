import { UseQueryResult } from 'react-query';

import {
  DeleteChatMessageParamType,
  Member,
  PatchChatMessageParamType,
  PostChatMessageParamType,
} from '@graasp/sdk';
import { ChatMessageRecord } from '@graasp/sdk/frontend';

import { List } from 'immutable';

export type ChatMessageList = List<ChatMessageRecord>;

export type AvatarHookType = (args: {
  id?: string;
  size?: string;
}) => UseQueryResult<string | undefined>;

export type PartialMemberDisplay = Pick<Member, 'name' | 'id'>;

export type SendMessageFunctionType = (
  message: PostChatMessageParamType,
) => void;

export type EditMessageFunctionType = (
  message: PatchChatMessageParamType,
) => void;

export type DeleteMessageFunctionType = (
  message: DeleteChatMessageParamType,
) => void;
