import { FC, ReactElement } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Button } from '@graasp/ui';
import { useTranslation } from 'react-i18next';
import {
  cancelDialogButtonCypress,
  confirmDialogButtonCypress,
} from '../../config/selectors';

type Props = {
  open: boolean;
  title: string;
  content: ReactElement<unknown> | string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: FC<Props> = ({
  open,
  title,
  content,
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
          variant="outlined"
          onClick={onCancel}
          dataCy={cancelDialogButtonCypress}
        >
          {t('Cancel')}
        </Button>
        <Button onClick={onConfirm} dataCy={confirmDialogButtonCypress}>
          {t('Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
