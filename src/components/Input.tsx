import React, { ChangeEvent, FC, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { PartialChatMessage } from '../types';
import { inputTextFieldCypress, sendButtonCypress } from '../config/selectors';

type Props = {
  sendMessageFunction?: (body: PartialChatMessage) => void;
  id?: string;
  placeholder?: string;
  chatId: string;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    margin: theme.spacing(1, 'auto'),
  },
}));

const Input: FC<Props> = ({ id, chatId, placeholder, sendMessageFunction }) => {
  const classes = useStyles();
  const [textInput, setTextInput] = useState('');
  const { t } = useTranslation();

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
        id="outlined-basic"
        value={textInput}
        onChange={onChange}
        onKeyDown={keyDown}
        variant="outlined"
        fullWidth
        multiline
        placeholder={placeholder || t('Type something…')}
      />
      <IconButton data-cy={sendButtonCypress} onClick={onClick}>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Input;
