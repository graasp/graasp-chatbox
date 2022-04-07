import React, { FC, ReactElement } from 'react';
import { ChatMessage, Member } from '../types';
import { List } from 'immutable';

export const MessagesContext = React.createContext({});

export type MessagesContextType = {
  messages?: List<ChatMessage>;
  chatId?: string;
  members?: List<Member>;
};

type Props = {
  children: ReactElement;
  messages?: List<ChatMessage>;
  chatId?: string;
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
