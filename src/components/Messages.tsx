import { FC, useRef, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Date from './Date';
import Message from './Message';
import type {
  ChatMessage,
  ImmutableMember,
  PartialChatMessage,
} from '../types';
import { BIG_NUMBER, DEFAULT_DATE_FORMAT } from '../constants';
import MessageActions from './MessageActions';
import clsx from 'clsx';
import { useEditingContext } from '../context/EditingContext';
import { messagesContainerCypress } from '../config/selectors';
import { useMessagesContext } from '../context/MessagesContext';

type Props = {
  currentMember: ImmutableMember;
  isAdmin?: boolean;
  height: number;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
};

const Messages: FC<Props> = ({
  currentMember,
  isAdmin = false,
  height,
  deleteMessageFunction,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { open } = useEditingContext();
  const { messages, members } = useMessagesContext();

  const useStyles = makeStyles(() => ({
    container: {
      overflowY: 'auto',
      height: height,
    },
    messagesContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    singleMessageContainer: {
      // make sure that the box container takes the most space
      width: '100%',
      display: 'flex',
      // used to place actions on the left of the message
      flexDirection: 'row',
      // center button with message box
      alignItems: 'center',
      alignContent: 'stretch',
    },
    alignLeft: {
      justifyContent: 'flex-start',
    },
    alignRight: {
      justifyContent: 'flex-end',
    },
  }));

  const classes = useStyles();

  // scroll down to last message at start, on new message and on editing message
  useEffect(() => {
    if (ref?.current) {
      // really big number to scroll down
      ref.current.scrollTop = BIG_NUMBER;
    }
  }, [ref, messages, open]);

  const isOwn = (message: ChatMessage): boolean =>
    message.creator === currentMember.get('id');

  const messagesByDay = messages
    ?.groupBy(({ createdAt }: ChatMessage) =>
      moment(createdAt).format(DEFAULT_DATE_FORMAT),
    )
    // transform to array to avoid printing the first key
    .toArray();

  return (
    <div
      className={classes.container}
      ref={ref}
      data-cy={messagesContainerCypress}
    >
      <Box className={classes.messagesContainer}>
        {messagesByDay?.map(([date, m]) => (
          <Fragment key={date}>
            <Date date={date} />
            {m?.map((message: ChatMessage) => {
              const isOwnMessage = isOwn(message);
              return (
                <Box
                  key={message.id}
                  className={clsx(classes.singleMessageContainer, {
                    // align message to the correct side
                    [classes.alignRight]: isOwnMessage,
                    [classes.alignLeft]: !isOwnMessage,
                  })}
                >
                  <Message
                    currentMember={currentMember}
                    message={message}
                    member={members?.find(({ id }) => id === message.creator)}
                  />
                  {(isOwnMessage || isAdmin) && (
                    <MessageActions
                      message={message}
                      isOwn={isOwnMessage}
                      deleteMessageFunction={deleteMessageFunction}
                    />
                  )}
                </Box>
              );
            })}
          </Fragment>
        ))}
      </Box>
    </div>
  );
};

export default Messages;
