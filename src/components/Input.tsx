import { FC, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
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

const Input: FC<Props> = ({ id, chatId, placeholder, sendMessageFunction }) => {
  const classes = useStyles();
  const textRef = useRef<HTMLInputElement>();
  const { t } = useTranslation();

  const onClick = (): void => {
    if (textRef?.current?.value) {
      const text = textRef?.current?.value;
      sendMessageFunction?.({ chatId, body: text });
      // reset input content
      textRef.current.value = '';
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
        inputRef={textRef}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        placeholder={placeholder || t('Type something…')}
      />
      <IconButton onClick={onClick}>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Input;
