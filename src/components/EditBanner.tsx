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
  editBannerOldTextCypress,
} from '../config/selectors';
import { CHATBOX } from '@graasp/translations';
import { useTranslation } from 'react-i18next';
import { useEditingContext } from '../context/EditingContext';

const useStyles = makeStyles((theme) => ({
  container: {
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
    margin: theme.spacing(1),
  },
  oldTextPreview: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type Props = {
  onClose: () => void;
  editedText?: string;
};

const EditBanner: FC<Props> = ({ onClose, editedText }) => {
  const classes = useStyles();
  const { open } = useEditingContext();
  const { t } = useTranslation();
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
          fontSize="small"
          color="primary"
        />
        <Box className={classes.editContainer}>
          <Typography className={classes.oldTextLabel} variant="subtitle2">
            {t(CHATBOX.EDITING_MESSAGE_LABEL)}
          </Typography>
          <Typography
            className={classes.oldTextPreview}
            data-cy={editBannerOldTextCypress}
          >
            {editedText}
          </Typography>
        </Box>
        <IconButton data-cy={editBannerCloseButtonCypress} onClick={onClose}>
          <Close
            // todo: change to secondary once Graasp has one
            color="primary"
          />
        </IconButton>
      </Box>
    </>
  );
};

export default EditBanner;
