import { FC, useRef, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { List } from 'immutable';
import Date from './Date';
import Message from './Message';
import type {
  ChatMessage,
  ImmutableMember,
  Member,
  PartialChatMessage,
} from '../types';
import {
  BIG_NUMBER,
  DEFAULT_DATE_FORMAT,
  EDIT_BANNER_HEIGHT,
} from '../constants';
import MessageActions from './MessageActions';
import clsx from 'clsx';
import { useEditingContext } from '../context/EditingContext';

type Props = {
  messages?: List<ChatMessage>;
  height: number;
  currentMember: ImmutableMember;
  members?: List<Member>;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
};

const Messages: FC<Props> = ({
  messages,
  height,
  currentMember,
  members,
  deleteMessageFunction,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { open } = useEditingContext();

  const useStyles = makeStyles(() => ({
    container: {
      overflowY: 'auto',
      // reduce the height of the messages box when the editing banner is opn
      height: height - (open ? EDIT_BANNER_HEIGHT : 0),
    },
    messagesContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    singleMessageContainer: {
      // make sure that the box container takes the most space
      width: '100%',
      // used to place actions on the left of the message
      flexDirection: 'row',
      // center button with message box
      alignItems: 'center',
      alignContent: 'stretch',
      display: 'flex',
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
    <div className={classes.container} ref={ref}>
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
                  {isOwnMessage && (
                    <MessageActions
                      message={message}
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
