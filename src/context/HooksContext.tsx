import React, { FC, ReactElement } from 'react';

import { AvatarHookType } from '../types';

export const HooksContext = React.createContext({
  useAvatarUrl: (() => null) as unknown as AvatarHookType,
});

export type HooksContextType = {
  useAvatarUrl: AvatarHookType;
};

type Props = {
  children: ReactElement;
  useAvatarUrl: AvatarHookType;
};

export const HooksContextProvider: FC<Props> = ({ children, useAvatarUrl }) => {
  const value = {
    useAvatarUrl,
  };

  return (
    <HooksContext.Provider value={value}>{children}</HooksContext.Provider>
  );
};

export const useHooksContext = (): HooksContextType =>
  React.useContext<HooksContextType>(HooksContext);
