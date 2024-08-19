import { Box, Stack, Typography, styled } from '@mui/material';
import { colors } from '@mui/material';

import { Account, ChatMessage, CompleteMember } from '@graasp/sdk';
import { CHATBOX } from '@graasp/translations';
import { Avatar } from '@graasp/ui';

import { format } from 'date-fns';
import truncate from 'lodash.truncate';

import { getDateLocale, useChatboxTranslation } from '@/config/i18n.js';
import { messageIdCyWrapper } from '@/config/selectors.js';
import {
  DEFAULT_USER_NAME,
  MAX_AVATAR_SIZE,
  MAX_USERNAME_LENGTH,
} from '@/constants.js';
import { useHooksContext } from '@/context/HooksContext.js';

import MessageBody from './MessageBody.js';

const MessageWrapper = styled(Box)(({ theme }) => ({
  background: colors.grey[100],
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

type Props = {
  message: ChatMessage;
  currentMember?: CompleteMember | null;
  member?: Account;
};

const Message = ({ message, currentMember, member }: Props): JSX.Element => {
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
  const time = format(message.createdAt, 'HH:mm aaa', {
    locale: getDateLocale(i18n.language),
  });

  return (
    <MessageWrapper
      p={1}
      sx={
        isOwnMessage
          ? { background: colors.grey[300], alignSelf: 'flex-end' }
          : undefined
      }
      data-cy={messageIdCyWrapper(message.id)}
    >
      {!isOwnMessage && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
          gap={1}
        >
          {member?.id && (
            <Avatar
              variant={'circular'}
              alt={creatorName}
              isLoading={isLoadingAvatar || isFetchingAvatar}
              component="avatar"
              url={avatarUrl}
              maxHeight={MAX_AVATAR_SIZE}
              maxWidth={MAX_AVATAR_SIZE}
            />
          )}
          <Typography variant="subtitle2">{creatorName}</Typography>
        </Stack>
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
