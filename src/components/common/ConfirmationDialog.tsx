import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { CHATBOX } from '@graasp/translations';
import { Button } from '@graasp/ui';

import {
  cancelDialogButtonCypress,
  confirmDialogButtonCypress,
} from '../../config/selectors';

type Props = {
  open: boolean;
  title: string;
  content: ReactElement<unknown> | string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: FC<Props> = ({
  open,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onCancel}
          dataCy={cancelDialogButtonCypress}
        >
          {cancelText || t(CHATBOX.CANCEL_BUTTON)}
        </Button>
        <Button
          variant="outlined"
          onClick={onConfirm}
          dataCy={confirmDialogButtonCypress}
        >
          {confirmText || t(CHATBOX.CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
