import React, { ReactNode } from 'react';

import { CompleteMember } from '@graasp/sdk';

export type CurrentMemberContextType = CompleteMember | null | undefined;

export const CurrentMemberContext =
  React.createContext<CurrentMemberContextType>(null);

type Props = {
  children: ReactNode;
  currentMember?: CompleteMember | null;
};

export const CurrentMemberContextProvider = ({
  children,
  currentMember,
}: Props): JSX.Element => {
  return (
    <CurrentMemberContext.Provider value={currentMember}>
      {children}
    </CurrentMemberContext.Provider>
  );
};

export const useCurrentMemberContext = (): CurrentMemberContextType =>
  React.useContext<CurrentMemberContextType>(CurrentMemberContext);
