import React, { FC, ReactElement } from 'react';
import { AvatarHookType, ClearChatHookType } from '../types';

export const HooksContext = React.createContext({});

export type HooksContextType = {
  useAvatarHook?: AvatarHookType;
  clearChatHook?: ClearChatHookType;
};

type Props = {
  children: ReactElement;
  useAvatarHook?: AvatarHookType;
  clearChatHook?: ClearChatHookType;
};

export const HooksContextProvider: FC<Props> = ({
  children,
  useAvatarHook,
  clearChatHook,
}) => {
  const value = {
    useAvatarHook,
    clearChatHook,
  };

  return (
    <HooksContext.Provider value={value}>{children}</HooksContext.Provider>
  );
};

export const useHooksContext = (): HooksContextType =>
  React.useContext<HooksContextType>(HooksContext);
