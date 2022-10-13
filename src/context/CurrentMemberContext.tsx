import React, { FC, ReactElement } from 'react';

import { ImmutableMember } from '../types';

export type CurrentMemberContextType = {
  id: string;
  name: string;
  type: string;
};

export const CurrentMemberContext = React.createContext({
  id: '',
  name: '',
  type: '',
});

type Props = {
  children: ReactElement | ReactElement[];
  currentMember: ImmutableMember;
};

export const CurrentMemberContextProvider: FC<Props> = ({
  children,
  currentMember,
}) => {
  return (
    <CurrentMemberContext.Provider
      value={currentMember.toJS() as CurrentMemberContextType}
    >
      {children}
    </CurrentMemberContext.Provider>
  );
};

export const useCurrentMemberContext = (): CurrentMemberContextType =>
  React.useContext<CurrentMemberContextType>(CurrentMemberContext);