import React, { ChangeEvent, FC, RefObject, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { PartialNewChatMessage } from '../types';
import {
  charCounterCypress,
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from '../config/selectors';
import { MAX_MESSAGE_LENGTH_HARD, MAX_ROWS_INPUT } from '../constants';
import { CHATBOX } from '@graasp/translations';
import { useMessagesContext } from '../context/MessagesContext';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

type Props = {
  id?: string;
  inputRef: RefObject<HTMLDivElement>;
  placeholder?: string;
  textInput: string;
  setTextInput: (newText: string) => void;
  sendMessageFunction?: (body: PartialNewChatMessage) => void;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
  },
  textLength: {
    whiteSpace: 'pre',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: 'gray',
  },
  textTooLong: {
    color: 'red !important',
  },
}));

const Input: FC<Props> = ({
  id,
  inputRef,
  textInput,
  setTextInput,
  placeholder,
  sendMessageFunction,
}) => {
  const classes = useStyles();
  const { chatId } = useMessagesContext();

  const { t } = useTranslation();

  const isMessageTooLong = textInput.length > MAX_MESSAGE_LENGTH_HARD;

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
      if (!isMessageTooLong) {
        // send message
        onClick();
      }
    }
  };

  return (
    <div>
      <Box
        display="flex"
        className={classes.wrapper}
        justifyContent="center"
        alignItems="flex-end"
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
        <IconButton
          data-cy={sendButtonCypress}
          onClick={onClick}
          disabled={isMessageTooLong}
        >
          <SendIcon color={isMessageTooLong ? 'disabled' : 'primary'} />
        </IconButton>
      </Box>
      <Typography
        className={clsx(classes.textLength, {
          [classes.textTooLong]: isMessageTooLong,
        })}
        variant="caption"
        data-cy={charCounterCypress}
      >
        {textInput
          ? textInput.length +
            (isMessageTooLong ? ` (max. ${MAX_MESSAGE_LENGTH_HARD} chars)` : '')
          : ' '}
      </Typography>
    </div>
  );
};

export default Input;
