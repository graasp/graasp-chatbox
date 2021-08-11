import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

type Props = {
  title?: string;
};

const Header: FC<Props> = ({ title }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <ChatIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            {title || t('Chatbox')}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
