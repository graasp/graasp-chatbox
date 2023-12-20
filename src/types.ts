import { UseQueryResult } from 'react-query';

import {
  DeleteChatMessageParamType,
  Member,
  PatchChatMessageParamType,
  PostChatMessageParamType,
} from '@graasp/sdk';

export type AvatarHookType = (args: {
  id?: string;
  size?: string;
}) => UseQueryResult<string, Error>;

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
