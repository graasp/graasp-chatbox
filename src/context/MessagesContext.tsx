import React, { FC, PropsWithChildren } from 'react';

import { Account, ChatMessage } from '@graasp/sdk';

export type MessagesContextType = {
  messages?: ChatMessage[];
  chatId: string;
  members: Account[];
};

export const MessagesContext = React.createContext<MessagesContextType>({
  chatId: '',
  members: [],
});

type Props = {
  messages?: ChatMessage[];
  chatId: string;
  members?: Account[];
};

export const MessagesContextProvider: FC<PropsWithChildren<Props>> = ({
  children,
  messages,
  chatId,
  members = [],
}) => {
  const value = {
    messages,
    chatId,
    members,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = (): MessagesContextType =>
  React.useContext<MessagesContextType>(MessagesContext);
