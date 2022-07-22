import { ReactElement } from 'react';

import ChatboxTest from './components/ChatboxTest';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from './config/queryClient';

const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatboxTest />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
