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
}));

type Props = {
  message: ChatMessage;
  currentMember: ImmutableMember;
  member?: Member;
};

const Message: FC<Props> = ({ message, currentMember, member }) => {
  const classes = useStyles();
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
    >
      {!isOwnMessage && (
        <Typography variant="subtitle2">{`${creatorName}`}</Typography>
      )}
      <Typography variant="body1">{message.body}</Typography>
      <Typography variant="caption" className={classes.time}>
        {time}
      </Typography>
    </Box>
  );
};

export default Message;
