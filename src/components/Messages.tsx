import { FC, useRef, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { List } from 'immutable';
import Date from './Date';
import Message from './Message';
import type { ChatMessage, ImmutableMember, Member } from '../types';
import { BIG_NUMBER, DEFAULT_DATE_FORMAT } from '../constants';

type Props = {
  messages?: List<ChatMessage>;
  height?: number;
  currentMember: ImmutableMember;
  members?: List<Member>;
};

const Messages: FC<Props> = ({ messages, height, currentMember, members }) => {
  const ref = useRef<HTMLDivElement>(null);

  const useStyles = makeStyles(() => ({
    container: {
      overflowY: 'auto',
      height,
    },
    messagesContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }));

  const classes = useStyles();

  // scroll down to last message at start and on new message
  useEffect(() => {
    if (ref?.current) {
      // really big number to scroll down
      ref.current.scrollTop = BIG_NUMBER;
    }
  }, [ref, messages]);

  const messagesByDay = messages
    ?.groupBy(({ createdAt }: ChatMessage) =>
      moment(createdAt).format(DEFAULT_DATE_FORMAT),
    )
    // transform to array to avoid printing the first key
    .toArray();

  return (
    <div className={classes.container} ref={ref}>
      <Box className={classes.messagesContainer}>
        {messagesByDay?.map(([date, m]) => (
          <Fragment key={date}>
            <Date date={date} />
            {m?.map((message: ChatMessage) => (
              <Message
                key={message.id}
                currentMember={currentMember}
                message={message}
                member={members?.find(({ id }) => id === message.creator)}
              />
            ))}
          </Fragment>
        ))}
      </Box>
    </div>
  );
};

export default Messages;
