import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import type { ChatMessage } from '../types';

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
  message: ChatMessage;
};

const Message: FC<Props> = ({ message }) => {
  const { creator, body } = message;
  const classes = useStyles();

  const isOwnMessage = creator === 'me';
  const align = isOwnMessage ? 'flex-end' : null;

  return (
    <Box
      p={1}
      className={clsx(classes.message, { [classes.own]: isOwnMessage })}
      alignSelf={align}
    >
      {!isOwnMessage && <Typography variant="caption">{creator}</Typography>}
      <Typography variant="body2">{body}</Typography>
    </Box>
  );
};

export default Message;
