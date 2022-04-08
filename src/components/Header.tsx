import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import { HEADER_HEIGHT } from '../constants';
import { CHATBOX } from '@graasp/translations';
import ExportChat from './ExportChat';

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
  spacing: {
    height: HEADER_HEIGHT,
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
      <AppBar position="relative">
        <Toolbar>
          <ChatIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            {title || t(CHATBOX.CHATBOX_HEADER)}
          </Typography>
          <ExportChat />
        </Toolbar>
      </AppBar>
      <div className={classes.spacing} />
    </div>
  );
};

export default Header;
