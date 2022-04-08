import { FC } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { List } from 'immutable';
import Messages from './Messages';
import Header from './Header';
import { DEFAULT_CHATBOX_HEIGHT } from '../constants';
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
import { HooksContextProvider } from '../context/HooksContext';
import { AvatarHookType } from '../types';
import { MessagesContextProvider } from '../context/MessagesContext';
import ExportChat from './ExportChat';

type Props = {
  id?: string;
  sendMessageBoxId?: string;
  height?: number;
  messages?: List<ChatMessage>;
  isLoading?: boolean;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
  useAvatarHook?: AvatarHookType;
  chatId: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
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
  useAvatarHook,
  messages,
  isLoading,
  chatId,
  showHeader = false,
  showAdminTools = false,
  lang = langs.en,
  currentMember,
  members,
}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 1),
    },
    chatboxFrame: {
      height: height || DEFAULT_CHATBOX_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
      // add padding only on bottom
      padding: theme.spacing(0, 0, 1, 0),
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
        <HooksContextProvider useAvatarHook={useAvatarHook}>
          <MessagesContextProvider
            messages={messages}
            chatId={chatId}
            members={members}
          >
            <Container className={classes.chatboxFrame}>
              {showHeader && <Header />}
              <Container id={id} maxWidth="md" className={classes.container}>
                <Messages
                  members={members}
                  currentMember={currentMember}
                  messages={messages}
                  deleteMessageFunction={deleteMessageFunction}
                  editMessageFunction={editMessageFunction}
                />
                <InputBar
                  chatId={chatId}
                  sendMessageBoxId={sendMessageBoxId}
                  sendMessageFunction={sendMessageFunction}
                  editMessageFunction={editMessageFunction}
                />
                {showAdminTools && <ExportChat variant="button" />}
              </Container>
            </Container>
          </MessagesContextProvider>
        </HooksContextProvider>
      </EditingContextProvider>
    </I18nextProvider>
  );
};

export default Chatbox;
