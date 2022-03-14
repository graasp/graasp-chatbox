import { FC } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Close, Edit } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { Divider, SvgIcon } from '@material-ui/core';
import {
  editBannerCloseButtonCypress,
  editBannerCypress,
} from '../config/selectors';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '100%',
  },
  oldTextLabel: {
    color: theme.palette.primary.main,
  },
  editIcon: {
    padding: '12px 12px 12px 0',
  },
  oldTextPreview: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
  editedText?: string;
};

const EditBanner: FC<Props> = ({ open, onClose, editedText }) => {
  const classes = useStyles();
  if (!open) {
    return null;
  }
  return (
    <>
      <Divider />
      <Box data-cy={editBannerCypress} className={classes.container}>
        <SvgIcon
          className={classes.editIcon}
          component={Edit}
          fontSize={'small'}
          color={'primary'}
        />
        <Box className={classes.editContainer}>
          <Typography className={classes.oldTextLabel} variant="subtitle2">
            Editing Message
          </Typography>
          <Typography className={classes.oldTextPreview}>
            {editedText}
          </Typography>
        </Box>
        <IconButton data-cy={editBannerCloseButtonCypress} onClick={onClose}>
          <Close color={'secondary'} />
        </IconButton>
      </Box>
    </>
  );
};

export default EditBanner;
