import Chatbox from '@graasp/chatbox';
import { ImmutableMember } from '../../src/types';

const App = () => {
  const member = new ImmutableMember({ name: 'kim', id: 'kim-id' });
  return <Chatbox chatId="24" id="24" showHeader currentMember={member} />;
};

export default App;
