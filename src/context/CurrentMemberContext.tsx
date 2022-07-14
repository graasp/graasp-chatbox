import React, { FC, ReactElement } from 'react';

import { ImmutableMember } from '../types';

export const CurrentMemberContext = React.createContext(new ImmutableMember());

export type CurrentMemberContextType = ImmutableMember;

type Props = {
  children: ReactElement | ReactElement[];
  currentMember: ImmutableMember;
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
