import clsx from 'clsx';
import truncate from 'lodash.truncate';
import moment from 'moment';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

import { ChatMessageRecord } from '@graasp/query-client/dist/src/types';
import { CHATBOX } from '@graasp/translations';
import { Avatar } from '@graasp/ui';
import { Variant } from '@graasp/ui/dist/types';

import { messageIdCyWrapper } from '../../config/selectors';
import { DEFAULT_USER_NAME, MAX_USERNAME_LENGTH } from '../../constants';
import { useHooksContext } from '../../context/HooksContext';
import type { ImmutableMember, Member } from '../../types';
import MessageBody from './MessageBody';

const useStyles = makeStyles((theme) => ({
  message: {
    background: grey[100],
    borderRadius: '5px',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 1, 0),
    maxWidth: '70%',
    width: 'fit-content',
    minWidth: 100,
    // wrap text at box limit
    wordBreak: 'break-word',
  },
  own: {
    background: grey[300],
  },
  time: {
    float: 'right',
  },
  messageText: {
    whiteSpace: 'pre-line',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  avatar: {
    marginRight: theme.spacing(1),
    maxWidth: 20,
    maxHeight: 20,
  },
}));

type Props = {
  message: ChatMessageRecord;
  currentMember: ImmutableMember;
  member?: Member;
};

const Message: FC<Props> = ({ message, currentMember, member }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { useAvatarHook } = useHooksContext();
  const creator = message.creator;
  const isOwnMessage = creator === currentMember.get('id');
  const align = isOwnMessage ? 'flex-end' : null;
  const creatorName = member?.name
    ? truncate(member?.name, { length: MAX_USERNAME_LENGTH })
    : DEFAULT_USER_NAME;
  const time = moment(message.createdAt).format('hh:mm a');

  return (
    <Box
      p={1}
      className={clsx(classes.message, { [classes.own]: isOwnMessage })}
      alignSelf={align}
      data-cy={messageIdCyWrapper(message.id)}
    >
      {!isOwnMessage && (
        <Box className={classes.avatarContainer}>
          {member?.id && useAvatarHook && (
            <Avatar
              className={classes.avatar}
              id={member?.id}
              // todo: is it important to have the extra info ?
              extra={{}}
              variant={'circle' as Variant}
              alt={creatorName}
              component="avatar"
              useAvatar={useAvatarHook}
            />
          )}
          <Typography variant="subtitle2">{`${creatorName}`}</Typography>
        </Box>
      )}
      <MessageBody messageBody={message.body} />
      <Typography variant="caption" className={classes.time}>
        {`${
          // when the createdAt and updatedAt times are different it means the message has been modified
          message.updatedAt !== message.createdAt
            ? t(CHATBOX.MESSAGE_MODIFIED_INDICATOR)
            : ''
        } ${time}`}
      </Typography>
    </Box>
  );
};

export default Message;
