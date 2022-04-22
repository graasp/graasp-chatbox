import { FC, useState } from 'react';
import ConfirmationDialog from './common/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useHooksContext } from '../context/HooksContext';
import { useMessagesContext } from '../context/MessagesContext';
import { Button } from '@graasp/ui';
import { clearChatButtonCypress } from '../config/selectors';
import { Box, Typography } from '@material-ui/core';
import ExportChat from './ExportChat';

const ClearChat: FC = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useTranslation();
  const { clearChatHook: clearChat } = useHooksContext();
  const { chatId } = useMessagesContext();

  const handleClearChat = (): void => {
    clearChat?.(chatId);
  };

  return (
    <>
      <Button
        dataCy={clearChatButtonCypress}
        onClick={(): void => setOpenConfirmation(true)}
      >
        {t('Clear Chat')}
      </Button>
      <ConfirmationDialog
        open={openConfirmation}
        title={t('Clear Chat Confirmation')}
        content={
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography>
              {t(
                'Do you want to clear all messages from this chat? This action is non-reversible. Use the button below if you want to make a backup.',
              )}
            </Typography>
            <ExportChat variant="button" text="Save Chat" />
          </Box>
        }
        onConfirm={(): void => {
          setOpenConfirmation(false);
          handleClearChat();
        }}
        onCancel={(): void => {
          setOpenConfirmation(false);
        }}
      />
    </>
  );
};

export default ClearChat;
