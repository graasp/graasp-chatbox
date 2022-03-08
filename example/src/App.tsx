import {
  queryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from './config/queryClient';
import ChatboxWrapper from './components/ChatboxWrapper';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatboxWrapper />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
