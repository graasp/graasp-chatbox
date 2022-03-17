import { FC } from 'react';
import { List } from 'immutable';
import Chatbox, {
  ChatMessage,
  PartialChatMessage,
  ImmutableMember,
  Member,
} from '@graasp/chatbox';
import { MUTATION_KEYS } from '@graasp/query-client';
import { useMutation, hooks } from '../config/queryClient';
import { PartialNewChatMessage } from '../../../src';

type Props = {};

const ChatboxWrapper: FC<Props> = () => {
  // this is the id of the item to which the chat is attached (folder, document ...)
  const chatId = '39370f67-2153-4ab9-9679-b1966542d27d';
  const lang = 'fr';

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

  return (
    <Chatbox
      lang={lang}
      chatId={chatId}
      showHeader
      currentMember={member}
      members={members}
      messages={List(chatMessages)}
      sendMessageFunction={sendMessage}
      deleteMessageFunction={deleteMessage}
      editMessageFunction={editMessage}
    />
  );
};

export default ChatboxWrapper;