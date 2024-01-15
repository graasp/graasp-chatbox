import { FC, ReactElement } from 'react';

import Notifications from '@mui/icons-material/Notifications';
import { Dialog, DialogContent, DialogTitle, styled } from '@mui/material';

import { CHATBOX } from '@graasp/translations';

import { useChatboxTranslation } from '@/config/i18n';

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
  const { t } = useChatboxTranslation();
  return (
    <Dialog open={open} onClose={(): void => setOpen(false)} maxWidth="lg">
      <DialogTitle>
        <DialogTitleContainer>
          <DialogTitleIcon color="primary" />
          {t(CHATBOX.NOTIFICATIONS_DIALOG_TITLE)}
        </DialogTitleContainer>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default MentionsDialog;
