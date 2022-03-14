import { FC, useRef, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { List } from 'immutable';
import Date from './Date';
import Message from './Message';
import type {
  ChatMessage,
  EditingProp,
  ImmutableMember,
  Member,
  PartialChatMessage,
} from '../types';
import { BIG_NUMBER, DEFAULT_DATE_FORMAT } from '../constants';
import MessageActions from './MessageActions';

type Props = {
  messages?: List<ChatMessage>;
  height?: number;
  currentMember: ImmutableMember;
  members?: List<Member>;
  editingProps: EditingProp;
  setEditing: (edit: EditingProp) => void;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  editMessageFunction?: (message: PartialChatMessage) => void;
};

const Messages: FC<Props> = ({
  messages,
  height,
  currentMember,
  members,
  deleteMessageFunction,
  editingProps,
  setEditing,
}) => {
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
  }));

  const classes = useStyles();

  // scroll down to last message at start, on new message and on editing message
  useEffect(() => {
    if (ref?.current) {
      // really big number to scroll down
      ref.current.scrollTop = BIG_NUMBER;
    }
  }, [ref, messages, editingProps]);

  const isOwn = (message: ChatMessage): boolean => {
    const creator = message.creator;
    return creator === currentMember.get('id');
  };

  const getAlignment = (message: ChatMessage): string | null => {
    const isOwnMessage = isOwn(message);
    return isOwnMessage ? 'flex-end' : 'flex-start';
  };

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
              <Box
                key={message.id}
                className={classes.singleMessageContainer}
                alignSelf={getAlignment(message)}
                justifyContent={getAlignment(message)}
              >
                <Message
                  currentMember={currentMember}
                  message={message}
                  member={members?.find(({ id }) => id === message.creator)}
                />
                {isOwn(message) && (
                  <MessageActions
                    message={message}
                    deleteMessageFunction={deleteMessageFunction}
                    setEditing={setEditing}
                  />
                )}
              </Box>
            ))}
          </Fragment>
        ))}
      </Box>
    </div>
  );
};

export default Messages;
