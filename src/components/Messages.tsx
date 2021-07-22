import React, { FC, useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message';
import type { MessageType } from '../types';

type Props = {
  messages: MessageType[];
};

const useStyles = makeStyles(() => ({
  wrapper: {
    overflowY: 'scroll',
    height: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    display: 'flex',
  },
}));

const Messages: FC<Props> = ({ messages }) => {
  const boxRef = useRef<HTMLDivElement>();

  const classes = useStyles();

  // scroll down to last message
  useEffect(() => {
    if (boxRef?.current) {
      // really big number to scroll down
      boxRef.current.scrollTop = 99999;
    }
  }, [boxRef]);

  return (
    <Box
      // hack to use ref
      // https://github.com/mui-org/material-ui/issues/17010#issuecomment-615577360
      {...{ ref: boxRef }}
      className={classes.wrapper}
    >
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </Box>
  );
};

export default Messages;
