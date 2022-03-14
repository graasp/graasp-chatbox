import { FC, useEffect, useRef, useState } from 'react';
import Input from './Input';
import {
  EditingProp,
  PartialChatMessage,
  PartialNewChatMessage,
} from '../types';
import EditBanner from './EditBanner';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { INITIAL_EDITING } from '../constants';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
  },
}));

type Props = {
  chatId: string;
  sendMessageBoxId?: string;
  editingProps: EditingProp;
  setEditing: (edit: EditingProp) => void;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
};

const InputBar: FC<Props> = ({
  chatId,
  sendMessageBoxId,
  editingProps,
  setEditing,
  sendMessageFunction,
  editMessageFunction,
}) => {
  const classes = useStyles();
  const [textInput, setTextInput] = useState(
    editingProps.open ? editingProps.body : '',
  );
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // when in editing mode, seed the textfield with the old message body
    setTextInput(editingProps.open ? editingProps.body : '');
    // focus the input field
    if (editingProps.open) {
      inputRef.current?.focus();
    }
  }, [editingProps.open]);

  const handleOnCloseEditingBanner = (): void => {
    setEditing(INITIAL_EDITING);
    setTextInput('');
  };

  const handleSendMessageFunction = (): void => {
    if (editingProps.open) {
      editMessageFunction?.({
        messageId: editingProps.id,
        chatId,
        body: textInput,
      });
    } else {
      sendMessageFunction?.({ chatId, body: textInput });
    }
    // reset editing
    setEditing(INITIAL_EDITING);
  };

  return (
    <Box className={classes.wrapper}>
      <EditBanner
        open={editingProps.open}
        onClose={handleOnCloseEditingBanner}
        editedText={editingProps.body}
      />
      <Input
        id={sendMessageBoxId}
        inputRef={inputRef}
        textInput={textInput}
        setTextInput={setTextInput}
        sendMessageFunction={handleSendMessageFunction}
        chatId={chatId}
      />
    </Box>
  );
};

export default InputBar;
