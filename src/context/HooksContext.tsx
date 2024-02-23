import { ReactElement, createContext, useContext } from 'react';

import { AvatarHookType } from '../types.js';

export const HooksContext = createContext({
  useAvatarUrl: (() => null) as unknown as AvatarHookType,
});

export type HooksContextType = {
  useAvatarUrl: AvatarHookType;
};

type Props = {
  children: ReactElement;
  useAvatarUrl: AvatarHookType;
};

export const HooksContextProvider = ({ children, useAvatarUrl }: Props) => {
  const value = {
    useAvatarUrl,
  };

  return (
    <HooksContext.Provider value={value}>{children}</HooksContext.Provider>
  );
};

export const useHooksContext = (): HooksContextType =>
  useContext<HooksContextType>(HooksContext);
