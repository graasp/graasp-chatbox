import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  id?: string;
  placeholder?: string;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    margin: theme.spacing(1, 'auto'),
  },
}));

const Input: FC<Props> = ({ placeholder }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.wrapper}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={11}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          placeholder={placeholder || 'Type something...'}
        />
      </Grid>
      <Grid item>
        <IconButton>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Input;
