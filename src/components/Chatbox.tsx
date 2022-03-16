import { FC, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { List } from 'immutable';
import Messages from './Messages';
import Header from './Header';
import { DEFAULT_CHATBOX_HEIGHT, INPUT_HEIGHT } from '../constants';
import type {
  ChatMessage,
  ImmutableMember,
  Member,
  PartialChatMessage,
  PartialNewChatMessage,
} from '../types';
import InputBar from './InputBar';
import { I18nextProvider } from 'react-i18next';
import buildI18n, { namespaces, langs } from '@graasp/translations';
import { EditingContextProvider } from '../context/EditingContext';

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
  lang?: string;
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
  lang = langs.en,
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
  const i18n = buildI18n(namespaces.chatbox);
  i18n.changeLanguage(lang);

  if (isLoading) {
    return null;
  }
  return (
    <I18nextProvider i18n={i18n}>
      <EditingContextProvider>
        <Fragment>
          {showHeader && <Header />}
          <Container id={id} maxWidth="md" className={classes.container}>
            <Messages
              members={members}
              currentMember={currentMember}
              messages={messages}
              height={height - INPUT_HEIGHT}
              deleteMessageFunction={deleteMessageFunction}
              editMessageFunction={editMessageFunction}
            />
            <InputBar
              chatId={chatId}
              sendMessageBoxId={sendMessageBoxId}
              sendMessageFunction={sendMessageFunction}
              editMessageFunction={editMessageFunction}
            />
          </Container>
        </Fragment>
      </EditingContextProvider>
    </I18nextProvider>
  );
};

export default Chatbox;
