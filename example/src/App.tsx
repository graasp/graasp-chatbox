import { queryClient, QueryClientProvider, ReactQueryDevtools } from './config/queryClient';
import { ENV, NODE_ENV } from "./config/constants";
import ChatboxWrapper from "./components/ChatboxWrapper";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatboxWrapper />
      {NODE_ENV === ENV.DEVELOPMENT && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;
