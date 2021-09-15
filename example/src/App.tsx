import Chatbox, { ChatMessage, ImmutableMember } from '@graasp/chatbox';
import { List } from 'immutable';

const App = () => {
  const member = new ImmutableMember({
    name: 'kim',
    id: 'kim-id',
  });
  const members = [
    member,
    {
      name: 'bob',
      id: 'bob-id',
    },
  ];
  const chatId = 'chat-id';

  const chatMessages: ChatMessage[] = [
    {
      chatId,
      creator: member.id,
      createdAt: new Date().toString(),
      body: 'hello',
    },
    {
      chatId,
      creator: members[1].id,
      createdAt: new Date().toString(),
      body: 'hello',
    },
  ];

  return (
    <Chatbox
      chatId={chatId}
      showHeader
      currentMember={member}
      messages={List(chatMessages)}
      members={List(members)}
    />
  );
};

export default App;
