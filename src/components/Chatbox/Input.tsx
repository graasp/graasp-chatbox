import React, { FC, ReactElement, RefObject, useEffect, useState } from 'react';
import {
  Mention,
  MentionItem,
  MentionsInput,
  OnChangeHandlerFunc,
  SuggestionDataItem,
} from 'react-mentions';

import SendIcon from '@mui/icons-material/Send';
import { Box, Typography, styled, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { MessageBodyType } from '@graasp/sdk';
import { CHATBOX } from '@graasp/translations';

import {
  charCounterCypress,
  inputTextFieldCypress,
  inputTextFieldTextAreaCypress,
  sendButtonCypress,
} from '@/config/selectors';
import {
  ALL_MEMBERS_ID,
  ALL_MEMBERS_SUGGESTION,
  GRAASP_MENTION_COLOR,
  HARD_MAX_MESSAGE_LENGTH,
} from '@/constants';
import { useCurrentMemberContext } from '@/context/CurrentMemberContext';
import { useMessagesContext } from '@/context/MessagesContext';
import { MENTION_MARKUP } from '@/utils/mentions';
import { useChatboxTranslation } from '@/utils/utils';

const HelperText = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre',
  paddingLeft: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: 'gray',
}));

const mentionStyle = {
  backgroundColor: GRAASP_MENTION_COLOR,
};

type Props = {
  id?: string;
  inputRef: RefObject<HTMLTextAreaElement>;
  placeholder?: string;
  textInput: string;
  setTextInput: (newText: string) => void;
  sendMessageFunction?: (body: MessageBodyType) => void;
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
    height: '100%',
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
      height: '100%',
      maxHeight: '30vh',
      lineHeight: 'inherit',
      borderRadius: inputRadius,
    },
    highlighter: {
      padding: inputPadding,
      border: '1px solid transparent',
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: '100%',
      maxHeight: '30vh',
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

  const { members } = useMessagesContext();
  const currentMember = useCurrentMemberContext();
  const { t } = useChatboxTranslation();
  const [currentMentions, setCurrentMentions] = useState<string[]>([]);
  const [plainTextMessage, setPlainTextMessage] = useState<string>('');

  if (!currentMember) {
    return null;
  }

  const { id: currentMemberId } = currentMember;

  // exclude self from suggestions and add @all pseudo member
  const memberSuggestions: SuggestionDataItem[] = [
    ALL_MEMBERS_SUGGESTION,
    ...(members
      ?.filter((m) => m.id !== currentMemberId)
      ?.map((m) => ({ id: m.id, display: m.name })) || []),
  ];

  // compute if message exceeds max length
  const isMessageTooLong = textInput.length > HARD_MAX_MESSAGE_LENGTH;

  // autofocus on first render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSend = (): void => {
    if (textInput) {
      let expandedMentions: string[] = currentMentions;
      // expand '@all' to all members in mentions array (skip if there are no members)
      if (currentMentions.includes(ALL_MEMBERS_ID) && members?.length) {
        expandedMentions = members.map((m) => m.id);
      }
      sendMessageFunction?.({ body: textInput, mentions: expandedMentions });
      // reset input content
      setTextInput('');
      setPlainTextMessage('');
      setCurrentMentions([]);
    }
  };

  // controlled input onChange handler
  const onChange: OnChangeHandlerFunc = (
    _: {
      target: { value: string };
    },
    // new value of the field
    newValue: string,
    // newPlainTextValue of the field
    newPlainTextValue: string,
    newMentions: MentionItem[],
  ): void => {
    setTextInput(newValue);
    setPlainTextMessage(newPlainTextValue);
    setCurrentMentions(newMentions.map(({ id }) => id));
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
    if (textInput && plainTextMessage) {
      helperText = plainTextMessage.length.toString();
      // append the max message size
      if (isMessageTooLong) {
        // there is a "space" before the message
        helperText += ` ${t(CHATBOX.INPUT_MESSAGE_TOO_LONG, {
          length: HARD_MAX_MESSAGE_LENGTH,
        })}`;
      }
    }
    return (
      <HelperText
        sx={{ ...(isMessageTooLong && { color: 'red !important' }) }}
        variant="caption"
        data-cy={charCounterCypress}
      >
        {helperText}
      </HelperText>
    );
  };

  return (
    <div>
      <Box
        width="100%"
        display="flex"
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
            displayTransform={(_, display): string => `@${display}`}
            markup={MENTION_MARKUP}
            trigger="@"
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
