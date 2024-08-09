import { StyledEngineProvider, styled } from '@mui/material';

import { Account, ChatMessage, CompleteMember, Member } from '@graasp/sdk';

import { CONTAINER_HEIGHT_SAFETY_MARGIN } from '@/constants.js';
import { CurrentMemberContextProvider } from '@/context/CurrentMemberContext.js';
import { EditingContextProvider } from '@/context/EditingContext.js';
import { HooksContextProvider } from '@/context/HooksContext.js';
import { MessagesContextProvider } from '@/context/MessagesContext.js';
import {
  AvatarHookType,
  DeleteMessageFunctionType,
  EditMessageFunctionType,
  SendMessageFunctionType,
} from '@/types.js';

import InputBar from './InputBar.js';
import Messages from './Messages.js';

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
  showAdminTools?: boolean;
  currentMember?: CompleteMember | null;
  members?: Account[];
};

const Chatbox = ({
  id,
  sendMessageBoxId,
  sendMessageFunction,
  deleteMessageFunction,
  editMessageFunction,
  useAvatarUrl,
  messages,
  isLoading,
  chatId,
  showAdminTools = false,
  currentMember,
  members,
}: Props): JSX.Element | null => {
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
            </MessagesContextProvider>
          </CurrentMemberContextProvider>
        </HooksContextProvider>
      </EditingContextProvider>
    </StyledEngineProvider>
  );
};

export default Chatbox;
