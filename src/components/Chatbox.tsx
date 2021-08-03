import React, { FC, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Messages from './Messages';
import { makeStyles } from '@material-ui/core/styles';
import Input from './Input';
import Header from './Header';
import { DEFAULT_CHATBOX_HEIGHT } from '../constants';

// todo: this should change once graasp-ui is completely using typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Loader } = require('@graasp/ui');

type Props = {
  id: string;
  height?: number;
};

const Chatbox: FC<Props> = ({ height }) => {
  const useStyles = makeStyles(() => ({
    container: {
      height: height || DEFAULT_CHATBOX_HEIGHT,
    },
  }));
  const classes = useStyles();

  // todo: get data from call
  const { data: messages, isLoading } = {
    data: [
      { id: '1', userId: 'me', text: 'a message' },
      { id: '2', userId: 'me', text: 'a message' },
      { id: '3', userId: 'another me', text: 'a message' },
      { id: '4', userId: 'me', text: 'a message' },
      { id: '5', userId: 'me', text: 'a message' },
      { id: '6', userId: 'anotmer', text: 'a message for you to be aware' },
      { id: '7', userId: 'me', text: 'a message' },
      { id: '11', userId: 'me', text: 'a message' },
      { id: '21', userId: 'me', text: 'a message' },
      { id: '31', userId: 'another me', text: 'a message' },
      { id: '41', userId: 'me', text: 'a message' },
      { id: '51', userId: 'me', text: 'a message' },
      { id: '61', userId: 'anotmer', text: 'a message for you to be aware' },
      { id: '71', userId: 'me', text: 'a message' },
    ],
    isLoading: false,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <Messages messages={messages} />
        <Input />
      </Container>
    </Fragment>
  );
};

export default Chatbox;
