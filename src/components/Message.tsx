import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import type { MessageType } from '../types';

const useStyles = makeStyles((theme) => ({
  message: {
    background: grey[100],
    borderRadius: '5px',
    margin: theme.spacing(1),
    padding: theme.spacing(0.5, 1, 1),
    maxWidth: '80%',
    width: 'fit-content',
  },
  own: {
    background: grey[300],
  },
}));

type Props = {
  message: MessageType;
};

const Message: FC<Props> = ({ message }) => {
  const { userId, text } = message;
  const classes = useStyles();

  const isOwnMessage = userId === 'me';
  const align = isOwnMessage ? 'flex-end' : null;

  return (
    <Box
      p={1}
      className={clsx(classes.message, { [classes.own]: isOwnMessage })}
      alignSelf={align}
    >
      {!isOwnMessage && <Typography variant="caption">{userId}</Typography>}
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default Message;
