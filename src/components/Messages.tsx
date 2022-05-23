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
import { DEFAULT_DATE_FORMAT, SAFETY_MARGIN } from '../constants';
import MessageActions from './MessageActions';
import clsx from 'clsx';
import { useEditingContext } from '../context/EditingContext';
import { messagesContainerCypress } from '../config/selectors';
import { useMessagesContext } from '../context/MessagesContext';

type Props = {
  currentMember: ImmutableMember;
  isAdmin?: boolean;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
};

const Messages: FC<Props> = ({
  currentMember,
  isAdmin = false,
  deleteMessageFunction,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { open } = useEditingContext();
  const { messages, members } = useMessagesContext();

  const useStyles = makeStyles(() => ({
    // used in accordance with the main container (input + scroll window)
    container: {
      overflowY: 'auto',
      // grow container to push input at bottom of window
      flex: 1,
      minHeight: '0px',
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
      // temporarily hide the scroll bars when scrolling the container
      ref.current.style.overflowY = 'hidden';
      // scroll down the height of the container + some margin to make sure we are at the bottom
      ref.current.scrollTop = ref.current.scrollHeight + SAFETY_MARGIN;
      // re-activate scroll
      ref.current.style.overflowY = 'auto';
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
