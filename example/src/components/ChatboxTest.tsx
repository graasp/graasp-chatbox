import { FC, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import ChatboxWrapper from './ChatboxWrapper';
import { DEFAULT_CHAT_ID, DEFAULT_LANG } from '../config/constants';

const useStyles = makeStyles((theme) => ({
  testContainer: {
    padding: theme.spacing(2),
    background: 'lightblue',
  },
}));

type Props = {};

const ChatboxTest: FC<Props> = () => {
  const classes = useStyles();
  const [showTools, setShowTools] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [chatId, setChatId] = useState(DEFAULT_CHAT_ID);
  return (
    <Grid container direction="row">
      <Grid item xs>
        <ChatboxWrapper
          chatId={chatId}
          lang={lang}
          showHeader={showHeader}
          showAdminTools={showTools}
        />
      </Grid>
      <Grid
        className={classes.testContainer}
        container
        item
        justify="flex-end"
        direction="column"
        xs
        spacing={2}
      >
        <Typography variant="h5">Test parameters</Typography>
        <Grid item>
          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                value={chatId}
                fullWidth
                onChange={({ target }) => setChatId(target.value)}
              />
            }
            label={'Chat Id'}
            labelPlacement="top"
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel component="legend">Chatbox params</FormLabel>
            <RadioGroup
              aria-label="language"
              value={lang}
              onChange={({ target }) => setLang(target.value)}
            >
              <FormControlLabel
                value="fr"
                control={<Radio />}
                label={'French'}
              />
              <FormControlLabel
                value="en"
                control={<Radio />}
                label={'English'}
              />
            </RadioGroup>
            <FormLabel component="legend">Chatbox params</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  value={showHeader}
                  onChange={() => setShowHeader(!showHeader)}
                />
              }
              label={'Show Header'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={showTools}
                  onChange={() => setShowTools(!showTools)}
                />
              }
              label={'Show Admin tools'}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatboxTest;
