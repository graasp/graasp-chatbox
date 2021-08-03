import React, { FC, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Messages from './Messages';
import Input from './Input';
import Header from './Header';
import { DEFAULT_CHATBOX_HEIGHT } from '../constants';
import { ChatMessage, PartialChatMessage } from '../types';

// todo: this should change once graasp-ui is completely using typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Loader } = require('@graasp/ui');

type Props = {
  id: string;
  height?: number;
  messages?: ChatMessage[];
  isLoading?: boolean;
  sendMessageFunction?: (message: PartialChatMessage) => void;
  chatId: string;
};

const Chatbox: FC<Props> = ({
  height,
  sendMessageFunction,
  messages,
  isLoading,
  chatId,
}) => {
  const useStyles = makeStyles(() => ({
    container: {
      height: height || DEFAULT_CHATBOX_HEIGHT,
    },
  }));
  const classes = useStyles();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <Messages messages={messages} />
        <Input sendMessageFunction={sendMessageFunction} chatId={chatId} />
      </Container>
    </Fragment>
  );
};

export default Chatbox;
