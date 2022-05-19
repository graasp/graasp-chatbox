import { FC } from 'react';
import { List } from 'immutable';
import Chatbox, {
  ChatMessage,
  PartialChatMessage,
  ImmutableMember,
  Member,
  AvatarHookType,
} from '@graasp/chatbox';
import { MUTATION_KEYS } from '@graasp/query-client';
import { useMutation, hooks } from '../config/queryClient';
import { PartialNewChatMessage } from '../../../src';
import { DEFAULT_LANG } from '../config/constants';
import { ClearChatHookType } from '../../../src/types';

type Props = {
  chatId: string;
  lang?: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
};

const ChatboxWrapper: FC<Props> = ({
  chatId,
  lang = DEFAULT_LANG,
  showHeader = true,
  showAdminTools = false,
}) => {
  // use kooks
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: chat } = hooks.useItemChat(chatId);
  // get chat messages
  const chatMessages = chat?.get('messages') as ChatMessage[];

  // get id of member that posted messages in the chat
  const memberIds = Array.from(
    new Set(chatMessages?.map(({ creator }: { creator: string }) => creator)),
  );

  const member = new ImmutableMember(currentMember);
  const members = hooks.useMembers(memberIds).data as List<Member>;

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
      messages={List(chatMessages)}
      sendMessageFunction={sendMessage}
      deleteMessageFunction={deleteMessage}
      editMessageFunction={editMessage}
      clearChatFunction={clearChat}
      useAvatarHook={hooks.useAvatar as AvatarHookType}
    />
  );
};

export default ChatboxWrapper;
