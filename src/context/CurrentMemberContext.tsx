import React, { FC, ReactElement } from 'react';

import { CompleteMember } from '@graasp/sdk';

export type CurrentMemberContextType = CompleteMember | null | undefined;

export const CurrentMemberContext =
  React.createContext<CurrentMemberContextType>(null);

type Props = {
  children: ReactElement | ReactElement[];
  currentMember?: CompleteMember | null;
};

export const CurrentMemberContextProvider: FC<Props> = ({
  children,
  currentMember,
}) => {
  return (
    <CurrentMemberContext.Provider value={currentMember}>
      {children}
    </CurrentMemberContext.Provider>
  );
};

export const useCurrentMemberContext = (): CurrentMemberContextType =>
  React.useContext<CurrentMemberContextType>(CurrentMemberContext);
