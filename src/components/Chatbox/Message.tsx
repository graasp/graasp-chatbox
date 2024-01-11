import { FC } from 'react';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { ChatMessage, CompleteMember, Member } from '@graasp/sdk';
import { CHATBOX } from '@graasp/translations';
import { Avatar } from '@graasp/ui';

import { format } from 'date-fns';
import truncate from 'lodash.truncate';

import { messageIdCyWrapper } from '@/config/selectors';
import {
  DEFAULT_USER_NAME,
  MAX_AVATAR_SIZE,
  MAX_USERNAME_LENGTH,
} from '@/constants';
import { useHooksContext } from '@/context/HooksContext';
import { useChatboxTranslation } from '@/utils/utils';

import MessageBody from './MessageBody';

const MessageWrapper = styled(Box)(({ theme }) => ({
  background: grey[100],
  borderRadius: '5px',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(0.5, 1, 0),
  maxWidth: '70%',
  width: 'fit-content',
  minWidth: 100,
  // wrap text at box limit
  wordBreak: 'break-word',
}));

const TimeText = styled(Typography)({
  float: 'right',
});

const AvatarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
});

type Props = {
  message: ChatMessage;
  currentMember?: CompleteMember | null;
  member?: Member;
};

const Message: FC<Props> = ({ message, currentMember, member }) => {
  const { t, i18n } = useChatboxTranslation();
  const { useAvatarUrl } = useHooksContext();
  const {
    data: avatarUrl,
    isLoading: isLoadingAvatar,
    isFetching: isFetchingAvatar,
  } = useAvatarUrl({
    id: member?.id,
    size: 'small',
  });
  const creatorId = message.creator?.id;
  const isOwnMessage = creatorId === currentMember?.id;
  const creatorName = member?.name
    ? truncate(member?.name, { length: MAX_USERNAME_LENGTH })
    : DEFAULT_USER_NAME;
  const time = format(message.createdAt, 'hh:mm aaa', { locale: i18n.locale });

  return (
    <MessageWrapper
      p={1}
      sx={
        isOwnMessage
          ? { background: grey[300], alignSelf: 'flex-end' }
          : undefined
      }
      data-cy={messageIdCyWrapper(message.id)}
    >
      {!isOwnMessage && (
        <AvatarContainer>
          {member?.id && (
            <Avatar
              variant={'circular'}
              alt={creatorName}
              isLoading={isLoadingAvatar || isFetchingAvatar}
              component="avatar"
              url={avatarUrl}
              maxHeight={MAX_AVATAR_SIZE}
              maxWidth={MAX_AVATAR_SIZE}
              sx={{
                mr: 1,
                maxHeight: MAX_AVATAR_SIZE,
                maxWidth: MAX_AVATAR_SIZE,
              }}
            />
          )}
          <Typography variant="subtitle2">{`${creatorName}`}</Typography>
        </AvatarContainer>
      )}
      <MessageBody messageBody={message.body} />
      <TimeText variant="caption">
        {`${
          // when the createdAt and updatedAt times are different it means the message has been modified
          message.updatedAt !== message.createdAt
            ? t(CHATBOX.MESSAGE_MODIFIED_INDICATOR)
            : ''
        } ${time}`}
      </TimeText>
    </MessageWrapper>
  );
};

export default Message;
