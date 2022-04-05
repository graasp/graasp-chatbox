import React, { ChangeEvent, FC, RefObject, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { PartialNewChatMessage } from '../types';
import {
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from '../config/selectors';
import { MAX_ROWS_INPUT } from '../constants';
import { CHATBOX } from '@graasp/translations';

type Props = {
  id?: string;
  inputRef: RefObject<HTMLDivElement>;
  chatId: string;
  placeholder?: string;
  textInput: string;
  setTextInput: (newText: string) => void;
  sendMessageFunction?: (body: PartialNewChatMessage) => void;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

const Input: FC<Props> = ({
  id,
  inputRef,
  chatId,
  textInput,
  setTextInput,
  placeholder,
  sendMessageFunction,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  // autofocus on first render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onClick = (): void => {
    if (textInput) {
      sendMessageFunction?.({ chatId, body: textInput });
      // reset input content
      setTextInput('');
    }
  };

  // controlled input onChange handler
  const onChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const newValue: string = event.target.value;
    setTextInput(newValue);
  };

  // catch {enter} key press to send messages
  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    // let user insert a new line with shift+enter
    if (e.key === 'Enter' && !e.shiftKey) {
      // do not propagate keypress event when only enter is pressed
      e.preventDefault();
      // send message
      onClick();
    }
  };

  return (
    <Box
      display="flex"
      className={classes.wrapper}
      justifyContent="center"
      alignItems="center"
      id={id}
    >
      <TextField
        data-cy={inputTextFieldCypress}
        id={inputTextFieldTextAreaCypress}
        inputRef={inputRef}
        value={textInput}
        onChange={onChange}
        onKeyDown={keyDown}
        variant="outlined"
        fullWidth
        multiline
        maxRows={MAX_ROWS_INPUT}
        placeholder={placeholder || t(CHATBOX.INPUT_FIELD_PLACEHOLDER)}
      />
      <IconButton data-cy={sendButtonCypress} onClick={onClick}>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Input;
