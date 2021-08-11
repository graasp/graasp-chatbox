import React, { FC, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Messages from './Messages';
import { List, Record } from 'immutable';
import Input from './Input';
import Header from './Header';
import { DEFAULT_CHATBOX_HEIGHT, INPUT_HEIGHT } from '../constants';
import type { ChatMessage, Member, PartialChatMessage } from '../types';

type Props = {
  id?: string;
  sendMessageBoxId?: string;
  height?: number;
  messages?: List<ChatMessage>;
  isLoading?: boolean;
  sendMessageFunction?: (message: PartialChatMessage) => void;
  chatId: string;
  showHeader?: boolean;
  currentMember: Record<Member>;
};

const Chatbox: FC<Props> = ({
  id,
  sendMessageBoxId,
  height = DEFAULT_CHATBOX_HEIGHT,
  sendMessageFunction,
  messages,
  isLoading,
  chatId,
  showHeader = false,
  currentMember,
}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      height: height || DEFAULT_CHATBOX_HEIGHT,
      padding: theme.spacing(0, 1),
    },
  }));
  const classes = useStyles();
  if (isLoading) {
    return null;
  }
  return (
    <Fragment>
      {showHeader && <Header />}
      <Container id={id} maxWidth="md" className={classes.container}>
        <Messages
          currentMember={currentMember}
          messages={messages}
          height={height - INPUT_HEIGHT}
        />
        <Input
          id={sendMessageBoxId}
          sendMessageFunction={sendMessageFunction}
          chatId={chatId}
        />
      </Container>
    </Fragment>
  );
};

export default Chatbox;
