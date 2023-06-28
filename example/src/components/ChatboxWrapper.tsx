import { Member, MemberType, convertJs } from '@graasp/sdk';

import { v4 } from 'uuid';

import Chatbox, { AvatarHookType } from '../../../src';
import { hooks, mutations } from '../config/queryClient';

type Props = {
  chatId: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
};

const ChatboxWrapper = ({
  chatId,
  showHeader = false,
  showAdminTools = false,
}: Props): JSX.Element => {
  // use hooks
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: chatMessages } = hooks.useItemChat(chatId);
  const { data: memberships } = hooks.useItemMemberships(chatId);

  const memberIds: string[] =
    (memberships?.size && memberships?.map((m) => m.member.id)?.toArray()) ||
    [];
  const { data: members } = hooks.useMembers(memberIds);
  const defaultCurrentMember: Member = {
    id: v4(),
    name: 'default-member',
    email: 'default-email',
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
    extra: {},
  };
  const member = currentMember || convertJs(defaultCurrentMember);

  const { mutate: sendMessage } = mutations.usePostItemChatMessage();
  const { mutate: deleteMessage } = mutations.useDeleteItemChatMessage();
  const { mutate: editMessage } = mutations.usePatchItemChatMessage();

  return (
    <Chatbox
      chatId={chatId}
      showHeader={showHeader}
      showAdminTools={showAdminTools}
      currentMember={member}
      members={members?.data?.toSeq()?.toList()}
      messages={chatMessages}
      sendMessageFunction={sendMessage}
      deleteMessageFunction={deleteMessage}
      editMessageFunction={editMessage}
      useAvatarUrl={hooks.useAvatar as AvatarHookType}
    />
  );
};

export default ChatboxWrapper;
