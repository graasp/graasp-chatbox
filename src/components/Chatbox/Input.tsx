import clsx from 'clsx';

import React, { FC, ReactElement, RefObject, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Mention,
  MentionsInput,
  OnChangeHandlerFunc,
  SuggestionDataItem,
} from 'react-mentions';

import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

import { MessageBodyType } from '@graasp/query-client/dist/src/types';
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
import { getAllMentions } from '../../utils/mentions';

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

const inputStyle = {
  width: '100%',
  // mentions
  control: {
    // fontFamily: 'monospace',
    minHeight: 63,
  },
  input: {
    padding: 9,
    border: '1px solid silver',
    width: '100%',
    overflow: 'auto',
    height: 70,
    borderRadius: '4px',
  },
  highlighter: {
    padding: 9,
    border: '1px solid transparent',
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: 70,
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#cee4e5',
      },
    },
  },
};

const mentionStyle = {
  backgroundColor: '#c5c9e8',
};

const Input: FC<Props> = ({
  id,
  inputRef,
  textInput,
  setTextInput,
  placeholder,
  sendMessageFunction,
}) => {
  const classes = useStyles();
  const { members } = useMessagesContext();
  const { id: currentMemberId } = useCurrentMemberContext();
  const { t } = useTranslation();

  const memberSuggestions = [
    { id: ALL_MEMBERS_ID, display: ALL_MEMBERS_DISPLAY },
    ...(members
      // exclude self from suggestions
      ?.filter((m) => m.id !== currentMemberId)
      .map((m) => ({ id: m.id, display: m.name }))
      .toJS() || []),
  ] as SuggestionDataItem[];
  // add mention to all
  const isMessageTooLong = textInput.length > HARD_MAX_MESSAGE_LENGTH;

  // autofocus on first render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSend = (): void => {
    if (textInput) {
      const mentions = getAllMentions(textInput).map(({ id }) => id);
      // expand '@all' to all members in mentions array
      let expandedMentions = mentions;
      if (mentions.includes(ALL_MEMBERS_ID)) {
        expandedMentions = members?.map((m) => m.id).toJS() as string[];
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
    if (textInput) {
      helperText =
        textInput.length +
        (isMessageTooLong ? ` (max. ${HARD_MAX_MESSAGE_LENGTH} chars)` : '');
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
          a11ySuggestionsListLabel={'Suggested mentions'}
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
