import { List } from 'immutable';

import { FC, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { StyledEngineProvider, styled } from '@mui/material';

import {
  MemberRecord,
  PartialChatMessage,
  PartialNewChatMessage,
} from '@graasp/query-client/dist/types';
import buildI18n, { langs, namespaces } from '@graasp/translations';

import { CONTAINER_HEIGHT_SAFETY_MARGIN } from '../../constants';
import { CurrentMemberContextProvider } from '../../context/CurrentMemberContext';
import { EditingContextProvider } from '../../context/EditingContext';
import { HooksContextProvider } from '../../context/HooksContext';
import { MessagesContextProvider } from '../../context/MessagesContext';
import type { ImmutableMember } from '../../types';
import { AvatarHookType, ChatMessageList } from '../../types';
import Header from './Header';
import InputBar from './InputBar';
import Messages from './Messages';

const ChatboxContainer = styled('div')({
  // set height of full container
  // the margin is used to make it "slightly" smaller than the ful height to not have very small scrollbars
  height: `calc(100vh - ${CONTAINER_HEIGHT_SAFETY_MARGIN}px)`,
  minHeight: '0px',
  display: 'flex',
  flexDirection: 'column',
});

const InputContainer = styled('div')({
  // no flex growing -> keep container at bottom of window
  flex: 'none',
});

type Props = {
  id?: string;
  sendMessageBoxId?: string;
  messages?: ChatMessageList;
  isLoading?: boolean;
  sendMessageFunction?: (message: PartialNewChatMessage) => void;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
  useAvatarHook: AvatarHookType;
  chatId: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
  lang?: string;
  currentMember: ImmutableMember;
  members?: List<MemberRecord>;
};

const Chatbox: FC<Props> = ({
  id,
  sendMessageBoxId,
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
  const i18n = useMemo(() => {
    const i18nInstance = buildI18n(namespaces.chatbox);
    i18nInstance.changeLanguage(lang);
    return i18nInstance;
  }, [lang]);

  if (isLoading) {
    return null;
  }

  return (
    <StyledEngineProvider injectFirst>
      <I18nextProvider i18n={i18n}>
        <EditingContextProvider>
          <HooksContextProvider useAvatarHook={useAvatarHook}>
            <CurrentMemberContextProvider currentMember={currentMember}>
              <MessagesContextProvider
                chatId={chatId}
                members={members}
                messages={messages}
              >
                <>
                  {showHeader && <Header />}
                  <ChatboxContainer id={id}>
                    <Messages
                      currentMember={currentMember}
                      isAdmin={showAdminTools}
                      deleteMessageFunction={deleteMessageFunction}
                    />
                    <InputContainer>
                      <InputBar
                        sendMessageBoxId={sendMessageBoxId}
                        sendMessageFunction={sendMessageFunction}
                        editMessageFunction={editMessageFunction}
                      />
                    </InputContainer>
                  </ChatboxContainer>
                </>
              </MessagesContextProvider>
            </CurrentMemberContextProvider>
          </HooksContextProvider>
        </EditingContextProvider>
      </I18nextProvider>
    </StyledEngineProvider>
  );
};

export default Chatbox;
