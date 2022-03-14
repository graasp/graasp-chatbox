import { FC, Fragment, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { List } from 'immutable';
import Messages from './Messages';
import Header from './Header';
import {
  DEFAULT_CHATBOX_HEIGHT,
  EDIT_BANNER_HEIGHT,
  INITIAL_EDITING,
  INPUT_HEIGHT,
} from '../constants';
import type {
  ChatMessage,
  ImmutableMember,
  Member,
  PartialChatMessage,
  PartialNewChatMessage,
} from '../types';
import InputBar from './InputBar';

type Props = {
  id?: string;
  sendMessageBoxId?: string;
  height?: number;
  messages?: List<ChatMessage>;
  isLoading?: boolean;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
  chatId: string;
  showHeader?: boolean;
  currentMember: ImmutableMember;
  members?: List<Member>;
};

const Chatbox: FC<Props> = ({
  id,
  sendMessageBoxId,
  height = DEFAULT_CHATBOX_HEIGHT,
  sendMessageFunction,
  deleteMessageFunction,
  editMessageFunction,
  messages,
  isLoading,
  chatId,
  showHeader = false,
  currentMember,
  members,
}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      height: height || DEFAULT_CHATBOX_HEIGHT,
      padding: theme.spacing(0, 1),
    },
  }));
  const classes = useStyles();
  const [editing, setEditing] = useState(INITIAL_EDITING);

  if (isLoading) {
    return null;
  }
  return (
    <Fragment>
      {showHeader && <Header />}
      <Container id={id} maxWidth="md" className={classes.container}>
        <Messages
          members={members}
          currentMember={currentMember}
          messages={messages}
          height={
            height - INPUT_HEIGHT - (editing.open ? EDIT_BANNER_HEIGHT : 0)
          }
          editingProps={editing}
          setEditing={setEditing}
          deleteMessageFunction={deleteMessageFunction}
          editMessageFunction={editMessageFunction}
        />
        <InputBar
          chatId={chatId}
          editingProps={editing}
          setEditing={setEditing}
          sendMessageBoxId={sendMessageBoxId}
          sendMessageFunction={sendMessageFunction}
          editMessageFunction={editMessageFunction}
        />
      </Container>
    </Fragment>
  );
};

export default Chatbox;
