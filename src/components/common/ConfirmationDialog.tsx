import { FC, ReactElement } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { CHATBOX } from '@graasp/translations';

import { useChatboxTranslation } from '@/config/i18n.js';
import {
  cancelDialogButtonCypress,
  confirmDialogButtonCypress,
} from '@/config/selectors.js';

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
  const { t } = useChatboxTranslation();

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onCancel}
          data-cy={cancelDialogButtonCypress}
        >
          {cancelText || t(CHATBOX.CANCEL_BUTTON)}
        </Button>
        <Button
          variant="outlined"
          onClick={onConfirm}
          data-cy={confirmDialogButtonCypress}
        >
          {confirmText || t(CHATBOX.CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
