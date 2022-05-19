import { FC, useMemo } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { List } from 'immutable';
import Messages from './Messages';
import Header from './Header';
import type {
  ChatMessage,
  ClearChatHookType,
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
import AdminTools from './AdminTools';

type Props = {
  id?: string;
  sendMessageBoxId?: string;
  messages?: List<ChatMessage>;
  isLoading?: boolean;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
  clearChatFunction?: ClearChatHookType;
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
  sendMessageFunction,
  deleteMessageFunction,
  editMessageFunction,
  clearChatFunction,
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
      height: 'calc(100vh - 16px)',
      minHeight: '0px',
    },
    bottomContainer: {
      boxSizing: 'border-box',
    },
  }));
  const classes = useStyles();
  const i18n = useMemo(() => {
    const i18nInstance = buildI18n(namespaces.chatbox);
    i18nInstance.changeLanguage(lang);
    return i18nInstance;
  }, [lang]);

  if (isLoading) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <EditingContextProvider>
        <HooksContextProvider
          useAvatarHook={useAvatarHook}
          clearChatHook={clearChatFunction}
        >
          <MessagesContextProvider
            chatId={chatId}
            members={members}
            messages={messages}
          >
            <>
              {showHeader && <Header />}
              <Container id={id} maxWidth="md" className={classes.container}>
                <Messages
                  currentMember={currentMember}
                  isAdmin={showAdminTools}
                  deleteMessageFunction={deleteMessageFunction}
                />
                <InputBar
                  sendMessageBoxId={sendMessageBoxId}
                  sendMessageFunction={sendMessageFunction}
                  editMessageFunction={editMessageFunction}
                />
                {showAdminTools && <AdminTools variant="icon" />}
              </Container>
            </>
          </MessagesContextProvider>
        </HooksContextProvider>
      </EditingContextProvider>
    </I18nextProvider>
  );
};

export default Chatbox;
