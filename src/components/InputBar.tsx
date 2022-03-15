import { FC, useEffect, useRef, useState } from 'react';
import Input from './Input';
import { PartialChatMessage, PartialNewChatMessage } from '../types';
import EditBanner from './EditBanner';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { INITIAL_EDITING_PROPS } from '../constants';
import { useEditingContext } from '../context/EditingContext';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
  },
}));

type Props = {
  chatId: string;
  sendMessageBoxId?: string;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
};

const InputBar: FC<Props> = ({
  chatId,
  sendMessageBoxId,
  sendMessageFunction,
  editMessageFunction,
}) => {
  const classes = useStyles();
  const { editing, setEditing } = useEditingContext();
  const [textInput, setTextInput] = useState(editing.open ? editing.body : '');
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // when in editing mode, seed the textfield with the old message body
    setTextInput(editing.open ? editing.body : '');
    // focus the input field
    if (editing.open) {
      inputRef.current?.focus();
    }
  }, [editing.open]);

  const handleOnCloseEditingBanner = (): void => {
    setEditing(INITIAL_EDITING_PROPS);
    setTextInput('');
  };

  const handleSendMessageFunction = (): void => {
    if (editing.open) {
      editMessageFunction?.({
        messageId: editing.id,
        chatId,
        body: textInput,
      });
    } else {
      sendMessageFunction?.({ chatId, body: textInput });
    }
    // reset editing
    setEditing(INITIAL_EDITING_PROPS);
  };

  return (
    <Box className={classes.wrapper}>
      <EditBanner
        open={editing.open}
        onClose={handleOnCloseEditingBanner}
        editedText={editing.body}
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
