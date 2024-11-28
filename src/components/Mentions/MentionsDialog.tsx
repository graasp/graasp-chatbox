import { ReactElement } from 'react';

import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';

import { CHATBOX } from '@graasp/translations';
import { useButtonColor } from '@graasp/ui';

import { BellIcon } from 'lucide-react';

import { useChatboxTranslation } from '@/config/i18n.js';

type Props = {
  content: ReactElement;
  open: boolean;
  setOpen: (state: boolean) => void;
};

const MentionsDialog = ({ content, open, setOpen }: Props): JSX.Element => {
  const { t } = useChatboxTranslation();
  const { color } = useButtonColor('primary');
  return (
    <Dialog open={open} onClose={(): void => setOpen(false)} maxWidth="lg">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <BellIcon color={color} />
          {t(CHATBOX.NOTIFICATIONS_DIALOG_TITLE)}
        </Stack>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default MentionsDialog;
