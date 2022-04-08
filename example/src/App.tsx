import {
  queryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from './config/queryClient';
import ChatboxTest from './components/ChatboxTest';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatboxTest />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
