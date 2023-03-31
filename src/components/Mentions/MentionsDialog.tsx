import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Notifications from '@mui/icons-material/Notifications';
import { Dialog, DialogContent, DialogTitle, styled } from '@mui/material';

const DialogTitleIcon = styled(Notifications)(({ theme }) => ({
  paddingRight: theme.spacing(1),
}));

const DialogTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

type Props = {
  content: ReactElement;
  open: boolean;
  setOpen: (state: boolean) => void;
};

const MentionsDialog: FC<Props> = ({ content, open, setOpen }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={(): void => setOpen(false)} maxWidth="lg">
      <DialogTitle>
        <DialogTitleContainer>
          <DialogTitleIcon color="primary" />
          {t('Notifications')}
        </DialogTitleContainer>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default MentionsDialog;
