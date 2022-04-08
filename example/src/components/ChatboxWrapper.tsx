import { FC, useEffect, useState } from 'react';
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
import { HEADER_SIZE } from '../config/constants';

type Props = {
  chatId: string;
  lang?: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
};

const ChatboxWrapper: FC<Props> = ({
  chatId,
  lang = 'en',
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

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // cleanup eventListener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
      height={windowHeight - (showHeader ? HEADER_SIZE : 0)}
      showHeader={showHeader}
      showAdminTools={showAdminTools}
      currentMember={member}
      members={members}
      messages={List(chatMessages)}
      sendMessageFunction={sendMessage}
      deleteMessageFunction={deleteMessage}
      editMessageFunction={editMessage}
      useAvatarHook={hooks.useAvatar as AvatarHookType}
    />
  );
};

export default ChatboxWrapper;
