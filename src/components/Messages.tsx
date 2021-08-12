import React, { FC, useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { List } from 'immutable';
import Message from './Message';
import type { ChatMessage, ImmutableMember } from '../types';

type Props = {
  messages?: List<ChatMessage>;
  height?: number;
  currentMember: ImmutableMember;
};

const Messages: FC<Props> = ({ messages, height, currentMember }) => {
  const ref = useRef<HTMLDivElement>(null);

  const useStyles = makeStyles(() => ({
    container: {
      overflowY: 'scroll',
      height,
    },
    messagesContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'flex-end',
      height: '100%',
    },
  }));

  const classes = useStyles();

  // scroll down to last message at start and on new message
  useEffect(() => {
    if (ref?.current) {
      // really big number to scroll down
      ref.current.scrollTop = Number.POSITIVE_INFINITY;
    }
  }, [ref, messages]);

  return (
    <div className={classes.container} ref={ref}>
      <Box className={classes.messagesContainer}>
        {messages?.map((message) => (
          // todo: apply key
          <Message currentMember={currentMember} message={message} />
        ))}
      </Box>
    </div>
  );
};

export default Messages;
