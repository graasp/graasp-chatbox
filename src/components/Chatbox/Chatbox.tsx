import { FC } from 'react';

import { StyledEngineProvider, styled } from '@mui/material';

import { ChatMessage, CompleteMember, Member } from '@graasp/sdk';

import { CONTAINER_HEIGHT_SAFETY_MARGIN } from '../../constants';
import { CurrentMemberContextProvider } from '../../context/CurrentMemberContext';
import { EditingContextProvider } from '../../context/EditingContext';
import { HooksContextProvider } from '../../context/HooksContext';
import { MessagesContextProvider } from '../../context/MessagesContext';
import {
  AvatarHookType,
  DeleteMessageFunctionType,
  EditMessageFunctionType,
  SendMessageFunctionType,
} from '../../types';
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
  messages?: ChatMessage[];
  isLoading?: boolean;
  sendMessageFunction?: SendMessageFunctionType;
  deleteMessageFunction?: DeleteMessageFunctionType;
  editMessageFunction?: EditMessageFunctionType;
  useAvatarUrl: AvatarHookType;
  chatId: string;
  showHeader?: boolean;
  showAdminTools?: boolean;
  currentMember?: CompleteMember;
  members?: Member[];
};

const Chatbox: FC<Props> = ({
  id,
  sendMessageBoxId,
  sendMessageFunction,
  deleteMessageFunction,
  editMessageFunction,
  useAvatarUrl,
  messages,
  isLoading,
  chatId,
  showHeader = false,
  showAdminTools = false,
  currentMember,
  members,
}) => {
  if (isLoading) {
    return null;
  }

  return (
    <StyledEngineProvider injectFirst>
      <EditingContextProvider>
        <HooksContextProvider useAvatarUrl={useAvatarUrl}>
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
    </StyledEngineProvider>
  );
};

export default Chatbox;
