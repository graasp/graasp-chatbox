import { FC, ReactElement } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialogTitleIcon: {
    paddingRight: theme.spacing(1),
  },
  dialogTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type Props = {
  content: ReactElement;
  open: boolean;
  setOpen: (state: boolean) => void;
};

const MentionsDialog: FC<Props> = ({ content, open, setOpen }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={(): void => setOpen(false)} maxWidth="lg">
      <DialogTitle>
        <div className={classes.dialogTitleContainer}>
          <Notifications className={classes.dialogTitleIcon} color="primary" />
          Notifications
        </div>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default MentionsDialog;
