import { List } from 'immutable';

import React, { FC, PropsWithChildren } from 'react';

import { MemberRecord } from '@graasp/query-client/dist/types';

import { ChatMessageList } from '../types';

export type MessagesContextType = {
  messages?: ChatMessageList;
  chatId: string;
  members: List<MemberRecord>;
};

export const MessagesContext = React.createContext<MessagesContextType>({
  chatId: '',
  members: List<MemberRecord>(),
});

type Props = {
  messages?: ChatMessageList;
  chatId: string;
  members?: List<MemberRecord>;
};

export const MessagesContextProvider: FC<PropsWithChildren<Props>> = ({
  children,
  messages,
  chatId,
  members = List<MemberRecord>(),
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
