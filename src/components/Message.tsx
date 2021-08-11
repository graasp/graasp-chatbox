import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { Record } from 'immutable';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import type { ChatMessage, Member } from '../types';

const useStyles = makeStyles((theme) => ({
  message: {
    background: grey[100],
    borderRadius: '5px',
    margin: theme.spacing(1, 0),
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
  currentMember: Record<Member>;
};

const Message: FC<Props> = ({ message, currentMember }) => {
  const classes = useStyles();
  const creator = message.creator;
  const isOwnMessage = creator === currentMember.get('id');
  const align = isOwnMessage ? 'flex-end' : null;

  return (
    <Box
      p={1}
      className={clsx(classes.message, { [classes.own]: isOwnMessage })}
      alignSelf={align}
    >
      {!isOwnMessage && <Typography variant="caption">{creator}</Typography>}
      <Typography variant="body2">{message.body}</Typography>
    </Box>
  );
};

export default Message;
