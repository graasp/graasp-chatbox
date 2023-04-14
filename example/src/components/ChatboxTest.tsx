import { FC, useEffect, useMemo, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
  styled,
} from '@mui/material';

import { MentionButton } from '@graasp/chatbox';
import { MUTATION_KEYS } from '@graasp/query-client';
import { ChatMention } from '@graasp/sdk';
import buildI18n, { namespaces } from '@graasp/translations';

import {
  DEFAULT_CHAT_ID,
  DEFAULT_LANG,
  GRAASP_PANEL_WIDTH,
} from '../config/constants';
import { hooks, useMutation } from '../config/queryClient';
import ChatboxWrapper from './ChatboxWrapper';

const TextInputControl = styled(FormControlLabel)({
  width: '100%',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const TestContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
  padding: theme.spacing(2),
  width: '400px',
  border: 'solid darkred 1px',
  '& > *': {
    margin: theme.spacing(2, 0) + '!important',
  },
}));

const ChatInputBox = styled(TextField)({
  backgroundColor: 'white',
});

const ChatboxTest: FC = () => {
  const [testWidth, setTestWidth] = useState(GRAASP_PANEL_WIDTH);
  const [showTools, setShowTools] = useState(false);
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [chatId, setChatId] = useState(DEFAULT_CHAT_ID);

  const ChatboxContainer = styled('div')(({ theme }) => ({
    margin: theme.spacing(1),
    width: testWidth,
    padding: theme.spacing(0, 1),
    border: 'solid darkblue 1px',
    borderRadius: '6px',
  }));

  // get chatId from url
  useEffect(() => {
    const choppedUrl = window.location.pathname.split('/');
    setChatId(choppedUrl[choppedUrl.length - 1]);
  }, [window.location.pathname]);

  const { data: currentMember } = hooks.useCurrentMember();
  const memberId = currentMember?.get('id') as string;

  // mutations to handle the mentions
  const { mutate: patchMentionMutate } = useMutation<
    ChatMention,
    unknown,
    { memberId: string; id: string; status: string }
  >(MUTATION_KEYS.PATCH_MENTION);
  const patchMentionFunction = (args: { id: string; status: string }): void =>
    patchMentionMutate({ memberId, ...args });

  const { mutate: deleteMentionMutate } = useMutation<
    ChatMention,
    unknown,
    { memberId: string; mentionId: string }
  >(MUTATION_KEYS.DELETE_MENTION);
  const deleteMentionFunction = (mentionId: string): void =>
    deleteMentionMutate({ memberId, mentionId });

  const { mutate: clearAllMentionsMutate } = useMutation<
    ChatMention[],
    unknown,
    { memberId: string }
  >(MUTATION_KEYS.CLEAR_MENTIONS);
  const clearAllMentionsFunction = (): void =>
    clearAllMentionsMutate({ memberId });

  // adapt the width of the chatbox to simulate the width used on Graasp
  const onChangePanelWidth = (
    _: unknown,
    newValue: number | number[],
  ): void => {
    // narrow type of newValue to a simple number and not an array of numbers (slider with range)
    if (typeof newValue === 'number') {
      setTestWidth(newValue);
    } else {
      setTestWidth(0);
    }
  };

  const i18n = useMemo(() => {
    const i18nInstance = buildI18n(namespaces.chatbox);
    i18nInstance.changeLanguage(lang);
    return i18nInstance;
  }, [lang]);

  return (
    <I18nextProvider i18n={i18n}>
      <Container>
        <TestContainer>
          <Typography variant="h5">Test parameters</Typography>
          <Typography variant="body1">
            Current User: {currentMember?.get('name')}
          </Typography>
          <TextInputControl
            control={
              <ChatInputBox
                variant="outlined"
                value={chatId}
                fullWidth
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }): void => setChatId(value)}
              />
            }
            label="Chat Id"
            labelPlacement="top"
          />
          <FormControl>
            <FormLabel component="legend">Language</FormLabel>
            <RadioGroup
              aria-label="language"
              value={lang}
              onChange={({ target }): void => setLang(target.value)}
            >
              <FormControlLabel value="fr" control={<Radio />} label="French" />
              <FormControlLabel
                value="en"
                control={<Radio />}
                label="English"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel component="legend">Chatbox params</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  value={showTools}
                  onChange={(): void => setShowTools(!showTools)}
                />
              }
              label="Show Admin tools"
            />
            <FormControlLabel
              control={
                <Slider
                  value={testWidth}
                  min={GRAASP_PANEL_WIDTH}
                  step={20}
                  max={800}
                  color="secondary"
                  onChange={onChangePanelWidth}
                />
              }
              labelPlacement="top"
              label="Panel Width"
            />
          </FormControl>
          <MentionButton
            color="primary"
            useMentions={hooks.useMentions}
            useMembers={hooks.useMembers}
            patchMentionFunction={patchMentionFunction}
            deleteMentionFunction={deleteMentionFunction}
            clearAllMentionsFunction={clearAllMentionsFunction}
          />
        </TestContainer>
        <ChatboxContainer>
          <ChatboxWrapper
            chatId={chatId}
            lang={lang}
            showAdminTools={showTools}
          />
        </ChatboxContainer>
      </Container>
    </I18nextProvider>
  );
};

export default ChatboxTest;
