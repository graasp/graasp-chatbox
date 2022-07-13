import { FC, useEffect, useRef, useState } from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import {
  PartialChatMessage,
  PartialNewChatMessage,
} from '@graasp/query-client/dist/src/types';

import { useEditingContext } from '../context/EditingContext';
import { useMessagesContext } from '../context/MessagesContext';
import EditBanner from './EditBanner';
import Input from './Input';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
  },
}));

type Props = {
  sendMessageBoxId?: string;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
};

const InputBar: FC<Props> = ({
  sendMessageBoxId,
  sendMessageFunction,
  editMessageFunction,
}) => {
  const classes = useStyles();
  const { open, body, messageId, cancelEdit } = useEditingContext();
  const [textInput, setTextInput] = useState(open ? body : '');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { chatId } = useMessagesContext();

  useEffect(() => {
    // when in editing mode, seed the textfield with the old message body
    setTextInput(open ? body : '');
    // focus the input field
    if (open) {
      inputRef.current?.focus();
    }
  }, [open, messageId]);

  const handleOnCloseEditingBanner = (): void => {
    cancelEdit();
    setTextInput('');
  };

  const handleSendMessageFunction = (): void => {
    if (open) {
      editMessageFunction?.({
        messageId,
        chatId,
        body: { message: textInput },
      });
    } else {
      sendMessageFunction?.({ chatId, body: { message: textInput } });
    }
    // reset editing
    cancelEdit();
  };

  return (
    <Box className={classes.wrapper}>
      <EditBanner onClose={handleOnCloseEditingBanner} editedText={body} />
      <Input
        id={sendMessageBoxId}
        inputRef={inputRef}
        textInput={textInput}
        setTextInput={setTextInput}
        sendMessageFunction={handleSendMessageFunction}
      />
    </Box>
  );
};

export default InputBar;
