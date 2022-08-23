import clsx from 'clsx';

import React, { FC, ReactElement, RefObject, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Mention,
  MentionsInput,
  OnChangeHandlerFunc,
  SuggestionDataItem,
} from 'react-mentions';

import { Typography, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

import {
  MemberRecord,
  MessageBodyType,
} from '@graasp/query-client/dist/src/types';
import { CHATBOX } from '@graasp/translations';

import {
  charCounterCypress,
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from '../../config/selectors';
import {
  ALL_MEMBERS_DISPLAY,
  ALL_MEMBERS_ID,
  HARD_MAX_MESSAGE_LENGTH,
} from '../../constants';
import { useCurrentMemberContext } from '../../context/CurrentMemberContext';
import { useMessagesContext } from '../../context/MessagesContext';
import { getAllMentions, normalizeMentions } from '../../utils/mentions';

type Props = {
  id?: string;
  inputRef: RefObject<HTMLTextAreaElement>;
  placeholder?: string;
  textInput: string;
  setTextInput: (newText: string) => void;
  sendMessageFunction?: (body: MessageBodyType) => void;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
  },
  textLength: {
    whiteSpace: 'pre',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: 'gray',
  },
  textTooLong: {
    color: 'red !important',
  },
}));

const mentionStyle = {
  backgroundColor: '#b9b9ed',
};

const Input: FC<Props> = ({
  id,
  inputRef,
  textInput,
  setTextInput,
  placeholder,
  sendMessageFunction,
}) => {
  // use mui theme for the mentions component
  // we can not use 'useStyles' with it because it requests an object for the styles
  const theme = useTheme();
  // padding for the input field, needs to match the padding for the overlay
  // in the 'highlighter' key
  const inputPadding = theme.spacing(1);
  const inputRadius = theme.spacing(0.5);
  const inputStyle = {
    width: '100%',
    minWidth: '0px',
    // mentions
    control: {
      minHeight: '63px',
    },
    input: {
      padding: inputPadding,
      border: '1px solid silver',
      width: '100%',
      overflow: 'auto',
      height: '70px',
      borderRadius: inputRadius,
    },
    highlighter: {
      padding: inputPadding,
      border: '1px solid transparent',
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: '70px',
    },

    suggestions: {
      // hides the sharp corners
      overflow: 'hidden',
      borderRadius: inputRadius,
      list: {
        // hides the sharp corners
        overflow: 'hidden',
        backgroundColor: 'white',
        fontSize: '1rem',
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: inputRadius,
      },
      item: {
        display: {
          // change the style of the suggestions
        },
        padding: theme.spacing(0.5, 2),
        '&focused': {
          backgroundColor: '#b9b9ed',
        },
      },
    },
  };

  const classes = useStyles();
  const { members } = useMessagesContext();
  const { id: currentMemberId } = useCurrentMemberContext();
  const { t } = useTranslation();

  // exclude self from suggestions
  const membersExcludingSelf: MemberRecord[] =
    members?.filter((m) => m.id !== currentMemberId)?.toArray() || [];
  const memberSuggestions: SuggestionDataItem[] = [
    { id: ALL_MEMBERS_ID, display: ALL_MEMBERS_DISPLAY },
    ...membersExcludingSelf.map((m) => ({ id: m.id, display: m.name })),
  ];

  // compute if message exceeds max length
  const isMessageTooLong = textInput.length > HARD_MAX_MESSAGE_LENGTH;

  // autofocus on first render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSend = (): void => {
    if (textInput) {
      const mentions = getAllMentions(textInput).map(({ id }) => id);
      let expandedMentions: string[] = mentions;
      // expand '@all' to all members in mentions array (skip if there are no members)
      if (mentions.includes(ALL_MEMBERS_ID) && members?.size) {
        expandedMentions = members.map((m) => m.id).toArray();
      }
      sendMessageFunction?.({ message: textInput, mentions: expandedMentions });
      // reset input content
      setTextInput('');
    }
  };

  // controlled input onChange handler
  const onChange: OnChangeHandlerFunc = (
    _: {
      target: { value: string };
    },
    newValue: string,
  ): void => {
    setTextInput(newValue);
  };

  // catch {enter} key press to send messages
  const keyDown = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    // let user insert a new line with shift+enter
    if (e.key === 'Enter' && !e.shiftKey) {
      // do not propagate keypress event when only enter is pressed
      e.preventDefault();
      if (!isMessageTooLong) {
        // send message
        onSend();
      }
    }
  };

  const renderHelperText = (): ReactElement => {
    // when the textInput is empty, return a text with just a whitespace
    // to keep the height of the element the same
    let helperText = ' ';
    const normalizedTextInput = normalizeMentions(textInput);
    if (textInput) {
      helperText = normalizedTextInput.length.toString();
      // append the max message size
      if (isMessageTooLong) {
        helperText += t(CHATBOX.INPUT_MESSAGE_TOO_LONG, {
          length: HARD_MAX_MESSAGE_LENGTH,
        });
      }
    }
    return (
      <Typography
        className={clsx(classes.textLength, {
          [classes.textTooLong]: isMessageTooLong,
        })}
        variant="caption"
        data-cy={charCounterCypress}
      >
        {helperText}
      </Typography>
    );
  };

  return (
    <div>
      <Box
        display="flex"
        className={classes.wrapper}
        justifyContent="center"
        alignItems="flex-end"
        id={id}
      >
        <MentionsInput
          data-cy={inputTextFieldCypress}
          id={inputTextFieldTextAreaCypress}
          inputRef={inputRef}
          value={textInput}
          onChange={onChange}
          onKeyDown={keyDown}
          style={inputStyle}
          forceSuggestionsAboveCursor
          a11ySuggestionsListLabel={t(CHATBOX.SUGGESTED_MENTIONS)}
          placeholder={placeholder || t(CHATBOX.INPUT_FIELD_PLACEHOLDER)}
        >
          <Mention
            displayTransform={(_, login): string => `@${login}`}
            markup="`<!@__display__>[__id__]`"
            trigger={'@'}
            renderSuggestion={(_, __, highlightedDisplay): ReactElement => (
              <div className="user">{highlightedDisplay}</div>
            )}
            data={memberSuggestions}
            style={mentionStyle}
          />
        </MentionsInput>
        <IconButton
          data-cy={sendButtonCypress}
          onClick={onSend}
          disabled={isMessageTooLong}
        >
          <SendIcon color={isMessageTooLong ? 'disabled' : 'primary'} />
        </IconButton>
      </Box>
      {renderHelperText()}
    </div>
  );
};

export default Input;
