import { List } from 'immutable';

import { FC, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';

import {
  PartialChatMessage,
  PartialNewChatMessage,
} from '@graasp/query-client/dist/src/types';
import buildI18n, { langs, namespaces } from '@graasp/translations';

import { CurrentMemberContextProvider } from '../context/CurrentMemberContext';
import { EditingContextProvider } from '../context/EditingContext';
import { HooksContextProvider } from '../context/HooksContext';
import { MessagesContextProvider } from '../context/MessagesContext';
import type {
  ChatMessage,
  ClearChatHookType,
  ImmutableMember,
  Member,
} from '../types';
import { AvatarHookType } from '../types';
import AdminTools from './AdminTools';
import Header from './Header';
import InputBar from './InputBar';
import Messages from './Messages';

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
  const useStyles = makeStyles(() => ({
    chatboxContainer: {
      // set height of full container
      height: 'calc(100vh - 16px)',
      minHeight: '0px',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      minHeight: '0px',
    },
    bottomContainer: {
      // no flex growing -> keep container at bottom of window
      flex: 'none',
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
          <CurrentMemberContextProvider currentMember={currentMember}>
            <MessagesContextProvider
              chatId={chatId}
              members={members}
              messages={messages}
            >
              <>
                {showHeader && <Header />}
                <div className={classes.chatboxContainer} id={id}>
                  <Messages
                    currentMember={currentMember}
                    isAdmin={showAdminTools}
                    deleteMessageFunction={deleteMessageFunction}
                  />
                  <div className={classes.bottomContainer}>
                    <InputBar
                      sendMessageBoxId={sendMessageBoxId}
                      sendMessageFunction={sendMessageFunction}
                      editMessageFunction={editMessageFunction}
                    />
                    {showAdminTools && <AdminTools variant="icon" />}
                  </div>
                </div>
              </>
            </MessagesContextProvider>
          </CurrentMemberContextProvider>
        </HooksContextProvider>
      </EditingContextProvider>
    </I18nextProvider>
  );
};

export default Chatbox;
