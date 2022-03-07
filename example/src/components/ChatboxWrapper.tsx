import { FC } from 'react';
import { List } from 'immutable';
import Chatbox, {
  ChatMessage,
  PartialChatMessage,
  ImmutableMember,
} from '@graasp/chatbox';
import { MUTATION_KEYS } from '@graasp/query-client';
import { useMutation, hooks } from '../config/queryClient';

type Props = {};

const ChatboxWrapper: FC<Props> = () => {
  // this is the id of the item to which the chat is attached (folder, document ...)
  const chatId = '39370f67-2153-4ab9-9679-b1966542d27d';
  // todo: make member dynamic with useMember hook
  const member = new ImmutableMember({
    name: 'basile',
    id: 'a1112eb7-7f28-4fdb-92cc-28171177463f',
  });
  // todo: fetch other members using hook
  const members = [
    member,
    {
      name: 'bob',
      id: 'bob-id',
    },
  ];

  // use kooks
  const { data: chat } = hooks.useItemChat(chatId);
  // get chat messages
  const chatMessages = chat?.get('messages') as ChatMessage[];
  const {
    mutate: sendMessage,
  }: { mutate: (message: PartialChatMessage) => void } = useMutation(
    MUTATION_KEYS.POST_ITEM_CHAT_MESSAGE,
  );

  return (
    <Chatbox
      chatId={chatId}
      showHeader
      currentMember={member}
      messages={List(chatMessages)}
      members={List(members)}
      sendMessageFunction={sendMessage}
    />
  );
};

export default ChatboxWrapper;
