import { List } from 'immutable';

import React, { FC, ReactElement } from 'react';

import { ChatMessageList, Member } from '../types';

export const MessagesContext = React.createContext({
  chatId: '',
});

export type MessagesContextType = {
  messages?: ChatMessageList;
  chatId: string;
  members?: List<Member>;
};

type Props = {
  children: ReactElement;
  messages?: ChatMessageList;
  chatId: string;
  members?: List<Member>;
};

export const MessagesContextProvider: FC<Props> = ({
  children,
  messages,
  chatId,
  members,
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
