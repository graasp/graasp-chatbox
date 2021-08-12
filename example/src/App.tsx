import Chatbox, { ImmutableMember } from '@graasp/chatbox';

const App = () => {
  const member = new ImmutableMember({
    name: 'kim',
    id: 'kim-id',
  });
  const chatId = 'chat-id';
  return <Chatbox chatId={chatId} showHeader currentMember={member} />;
};

export default App;
