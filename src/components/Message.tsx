import { FC } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import truncate from 'lodash.truncate';
import type { ChatMessage, ImmutableMember, Member } from '../types';
import { DEFAULT_USER_NAME, MAX_USERNAME_LENGTH } from '../constants';
import { messageIdCyWrapper } from '../config/selectors';
import { CHATBOX } from '@graasp/translations';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@graasp/ui';
import { Variant } from '@graasp/ui/dist/types';
import { useHooksContext } from '../context/HooksContext';

const useStyles = makeStyles((theme) => ({
  message: {
    background: grey[100],
    borderRadius: '5px',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 1, 0),
    maxWidth: '80%',
    width: 'fit-content',
    minWidth: 100,
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
  message: ChatMessage;
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
      <Typography className={classes.messageText} variant="body1">
        {message.body}
      </Typography>
      <Typography variant="caption" className={classes.time}>
        {`${
          message.updatedAt ? t(CHATBOX.MESSAGE_MODIFIED_INDICATOR) : ''
        } ${time}`}
      </Typography>
    </Box>
  );
};

export default Message;
