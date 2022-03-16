import React, { FC, ReactElement, useState } from 'react';
import { INITIAL_EDITING_PROPS } from '../constants';
import { EditingProp } from '../types';

export type EditingContextType = {
  open: boolean;
  body: string;
  messageId: string;
  editing: EditingProp;
  openEdit: (id: string, body: string) => void;
  closeEdit: () => void;
};

export const EditingContext = React.createContext<EditingContextType>({
  open: false,
  body: '',
  messageId: '',
  editing: INITIAL_EDITING_PROPS,
  openEdit: () => null,
  closeEdit: () => null,
});

type Props = {
  children: ReactElement;
};

export const EditingContextProvider: FC<Props> = ({ children }) => {
  const [editing, setEditing] = useState(INITIAL_EDITING_PROPS);
  const open = editing.open;
  const body = editing.body;
  const messageId = editing.id;
  const openEdit = (id: string, body: string): void =>
    setEditing({ id, open: true, body });
  const closeEdit = (): void => setEditing(INITIAL_EDITING_PROPS);

  return (
    <EditingContext.Provider
      value={{ open, body, messageId, editing, openEdit, closeEdit }}
    >
      {children}
    </EditingContext.Provider>
  );
};

export const useEditingContext = (): EditingContextType =>
  React.useContext<EditingContextType>(EditingContext);
