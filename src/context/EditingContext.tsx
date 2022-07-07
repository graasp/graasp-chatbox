import React, { FC, ReactElement, useState } from 'react';

import { INITIAL_EDITING_PROPS } from '../constants';
import { EditingProp } from '../types';

export type EditingContextType = {
  open: boolean;
  body: string;
  messageId: string;
  editing: EditingProp;
  enableEdit: (id: string, body: string) => void;
  cancelEdit: () => void;
};

export const EditingContext = React.createContext<EditingContextType>({
  open: false,
  body: '',
  messageId: '',
  editing: INITIAL_EDITING_PROPS,
  enableEdit: () => null,
  cancelEdit: () => null,
});

type Props = {
  children: ReactElement;
};

export const EditingContextProvider: FC<Props> = ({ children }) => {
  const [editing, setEditing] = useState(INITIAL_EDITING_PROPS);
  const open = editing.open;
  const body = editing.body;
  const messageId = editing.id;
  const enableEdit = (id: string, body: string): void =>
    setEditing({ id, open: true, body });
  const cancelEdit = (): void => setEditing(INITIAL_EDITING_PROPS);

  return (
    <EditingContext.Provider
      value={{ open, body, messageId, editing, enableEdit, cancelEdit }}
    >
      {children}
    </EditingContext.Provider>
  );
};

export const useEditingContext = (): EditingContextType =>
  React.useContext<EditingContextType>(EditingContext);
