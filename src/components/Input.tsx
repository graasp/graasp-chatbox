import React, { FC, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { PartialChatMessage } from '../types';

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

const Input: FC<Props> = ({ chatId, placeholder, sendMessageFunction }) => {
  const classes = useStyles();
  const textRef = useRef<HTMLInputElement>();

  const onClick = (): void => {
    const text = textRef?.current?.value;
    if (!text) {
      return;
    }
    return sendMessageFunction?.({ chatId, body: text });
  };

  return (
    <Box
      display="flex"
      className={classes.wrapper}
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        inputRef={textRef}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        placeholder={placeholder || 'Type something...'}
      />
      <IconButton onClick={onClick}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default Input;
