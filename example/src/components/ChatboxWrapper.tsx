import { FC } from 'react';

import Chatbox, { AvatarHookType, ImmutableMember } from '@graasp/chatbox';
import { MUTATION_KEYS } from '@graasp/query-client';
import {
  PartialChatMessage,
  PartialNewChatMessage,
} from '@graasp/query-client/dist/src/types';

import { ClearChatHookType } from '../../../src/types';
import { DEFAULT_LANG } from '../config/constants';
import { hooks, useMutation } from '../config/queryClient';

type Props = {
  chatId: string;
  lang?: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
};

const ChatboxWrapper: FC<Props> = ({
  chatId,
  lang = DEFAULT_LANG,
  showHeader = false,
  showAdminTools = false,
}) => {
  // use kooks
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: chat } = hooks.useItemChat(chatId);
  // get chat messages
  const chatMessages = chat?.messages;

  // get id of member that posted messages in the chat
  const memberIds: string[] = Array.from(
    new Set(chatMessages?.map(({ creator }: { creator: string }) => creator)),
  );

  const member = new ImmutableMember(currentMember);
  const members = hooks.useMembers(memberIds).data;

  const {
    mutate: sendMessage,
  }: { mutate: (message: PartialNewChatMessage) => void } = useMutation(
    MUTATION_KEYS.POST_ITEM_CHAT_MESSAGE,
  );
  const {
    mutate: deleteMessage,
  }: { mutate: (message: PartialChatMessage) => void } = useMutation(
    MUTATION_KEYS.DELETE_ITEM_CHAT_MESSAGE,
  );
  const {
    mutate: editMessage,
  }: { mutate: (message: PartialChatMessage) => void } = useMutation(
    MUTATION_KEYS.PATCH_ITEM_CHAT_MESSAGE,
  );
  const { mutate: clearChat }: { mutate: ClearChatHookType } = useMutation(
    MUTATION_KEYS.CLEAR_ITEM_CHAT,
  );

  return (
    <Chatbox
      lang={lang}
      chatId={chatId}
      showHeader={showHeader}
      showAdminTools={showAdminTools}
      currentMember={member}
      members={members}
      messages={chatMessages}
      sendMessageFunction={sendMessage}
      deleteMessageFunction={deleteMessage}
      editMessageFunction={editMessage}
      clearChatFunction={clearChat}
      useAvatarHook={hooks.useAvatar as AvatarHookType}
    />
  );
};

export default ChatboxWrapper;
