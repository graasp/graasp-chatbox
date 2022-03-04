import { queryClient, QueryClientProvider, ReactQueryDevtools } from './config/queryClient';
import { ENV, NODE_ENV } from "./config/constants";
import ChatboxWrapper from "./components/ChatboxWrapper";
import { I18nextProvider } from "react-i18next";
import i18nConfig from './config/i18n';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18nConfig}>
        <ChatboxWrapper />
      </I18nextProvider>
      {NODE_ENV === ENV.DEVELOPMENT && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;
