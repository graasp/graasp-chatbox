import clsx from 'clsx';

import React, {
  ChangeEvent,
  FC,
  ReactElement,
  RefObject,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';

import { CHATBOX } from '@graasp/translations';

import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

import {
  charCounterCypress,
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from '../config/selectors';
import { HARD_MAX_MESSAGE_LENGTH, MAX_ROWS_INPUT } from '../constants';
import { useMessagesContext } from '../context/MessagesContext';
import { PartialNewChatMessage } from '../types';

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

  const isMessageTooLong = textInput.length > HARD_MAX_MESSAGE_LENGTH;

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

  const renderHelperText = (): ReactElement => {
    // when the textInput is empty, return a text with just a whitespace
    // to keep the height of the element the same
    let helperText = ' ';
    if (textInput) {
      helperText =
        textInput.length +
        (isMessageTooLong ? ` (max. ${HARD_MAX_MESSAGE_LENGTH} chars)` : '');
    }
    return (
      <Typography
        className={clsx(classes.textLength, {
          [classes.textTooLong]: isMessageTooLong,
        })}
        variant="caption"
        data-cy={charCounterCypress}
      >
        {helperText}
      </Typography>
    );
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
      {renderHelperText()}
    </div>
  );
};

export default Input;
