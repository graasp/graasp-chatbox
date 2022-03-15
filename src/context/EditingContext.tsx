import React, { FC, ReactElement, useState } from 'react';
import { INITIAL_EDITING_PROPS } from '../constants';
import { EditingProp } from '../types';

export type EditingContextType = {
  editing: EditingProp;
  setEditing: (editing: EditingProp) => void;
};

export const EditingContext = React.createContext<EditingContextType>({
  editing: INITIAL_EDITING_PROPS,
  setEditing: () => null,
});

type Props = {
  children: ReactElement;
};

export const EditingContextProvider: FC<Props> = ({ children }) => {
  const [editing, setEditing] = useState(INITIAL_EDITING_PROPS);
  return (
    <EditingContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditingContext = (): EditingContextType =>
  React.useContext<EditingContextType>(EditingContext);
