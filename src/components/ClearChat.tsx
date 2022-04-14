import { FC, useState } from 'react';
import ConfirmationDialog from './common/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useHooksContext } from '../context/HooksContext';
import { useMessagesContext } from '../context/MessagesContext';
import { Button } from '@graasp/ui';

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
      <Button onClick={(): void => setOpenConfirmation(true)}>
        {t('Clear Chat')}
      </Button>
      <ConfirmationDialog
        open={openConfirmation}
        title={t('Clear Chat Confirmation')}
        content={t(
          'Do you want to clear all messages from this chat ? This action is non-reversible. Make sure you have a backup in case you want to save these messages.',
        )}
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
