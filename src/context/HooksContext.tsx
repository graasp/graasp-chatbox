import React, { FC, ReactElement } from 'react';

import { AvatarHookType } from '../types';

export const HooksContext = React.createContext({
  useAvatarHook: (() => null) as unknown as AvatarHookType,
});

export type HooksContextType = {
  useAvatarHook: AvatarHookType;
};

type Props = {
  children: ReactElement;
  useAvatarHook: AvatarHookType;
};

export const HooksContextProvider: FC<Props> = ({
  children,
  useAvatarHook,
}) => {
  const value = {
    useAvatarHook,
  };

  return (
    <HooksContext.Provider value={value}>{children}</HooksContext.Provider>
  );
};

export const useHooksContext = (): HooksContextType =>
  React.useContext<HooksContextType>(HooksContext);
