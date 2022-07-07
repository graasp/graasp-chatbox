import { FC, useState } from 'react';

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
  makeStyles,
} from '@material-ui/core';

import {
  DEFAULT_CHAT_ID,
  DEFAULT_LANG,
  GRAASP_PANEL_WIDTH,
} from '../config/constants';
import ChatboxWrapper from './ChatboxWrapper';

type Props = {};

const ChatboxTest: FC<Props> = () => {
  const [testWidth, setTestWidth] = useState(GRAASP_PANEL_WIDTH);
  const [showTools, setShowTools] = useState(false);
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [chatId, setChatId] = useState(DEFAULT_CHAT_ID);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    chatboxContainer: {
      margin: theme.spacing(1),
      width: testWidth,
      padding: theme.spacing(0, 1),
      border: 'solid darkblue 1px',
      borderRadius: '6px',
    },
    testContainer: {
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
    },
    textInputControl: {
      width: '100%',
    },
    chatInputBox: {
      backgroundColor: 'white',
    },
  }));

  const classes = useStyles();

  // adapt the width of the chatbox to simulate the width used on Graasp
  const onChangePanelWidth = (_: unknown, newValue: number | number[]) => {
    if (typeof newValue == 'number') {
      setTestWidth(newValue);
    } else {
      setTestWidth(0);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.testContainer}>
        <Typography variant="h5">Test parameters</Typography>
        <FormControlLabel
          className={classes.textInputControl}
          control={
            <TextField
              className={classes.chatInputBox}
              variant="outlined"
              value={chatId}
              fullWidth
              onChange={({ target }) => setChatId(target.value)}
            />
          }
          label={'Chat Id'}
          labelPlacement="top"
        />
        <FormControl>
          <FormLabel component="legend">Language</FormLabel>
          <RadioGroup
            aria-label="language"
            value={lang}
            onChange={({ target }) => setLang(target.value)}
          >
            <FormControlLabel value="fr" control={<Radio />} label={'French'} />
            <FormControlLabel
              value="en"
              control={<Radio />}
              label={'English'}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel component="legend">Chatbox params</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                value={showTools}
                onChange={() => setShowTools(!showTools)}
              />
            }
            label={'Show Admin tools'}
          />
          <FormControlLabel
            control={
              <Slider
                value={testWidth}
                min={GRAASP_PANEL_WIDTH}
                step={20}
                max={800}
                color={'secondary'}
                onChange={onChangePanelWidth}
              />
            }
            labelPlacement="top"
            label={'Panel Width'}
          />
        </FormControl>
      </div>
      <div className={classes.chatboxContainer}>
        <ChatboxWrapper
          chatId={chatId}
          lang={lang}
          showAdminTools={showTools}
        />
      </div>
    </div>
  );
};

export default ChatboxTest;
