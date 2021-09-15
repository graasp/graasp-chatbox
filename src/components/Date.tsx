import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  date: {
    padding: theme.spacing(0.5, 1, 1),
  },
}));

type Props = {
  date: string;
};

const Date: FC<Props> = ({ date }) => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.date} alignSelf="center">
      <Typography variant="subtitle2">{date}</Typography>
    </Box>
  );
};

export default Date;
