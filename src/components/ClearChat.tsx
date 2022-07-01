import { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Tooltip, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { DeleteForever } from '@material-ui/icons';

import { Button } from '@graasp/ui';

import { clearChatButtonCypress } from '../config/selectors';
import { useHooksContext } from '../context/HooksContext';
import { useMessagesContext } from '../context/MessagesContext';
import { ToolVariants, ToolVariantsType } from '../types';
import ExportChat from './ExportChat';
import ConfirmationDialog from './common/ConfirmationDialog';

type Prop = {
  variant?: ToolVariantsType;
};

const ClearChat: FC<Prop> = ({ variant = ToolVariants.BUTTON }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useTranslation();
  const { clearChatHook: clearChat } = useHooksContext();
  const { chatId, messages } = useMessagesContext();

  if (!clearChat || !messages || !messages?.size) {
    return null;
  }

  const handleClearChat = (): void => {
    clearChat?.(chatId);
  };

  const getContent = (contentType: ToolVariantsType): ReactElement => {
    const text = t('Clear Chat');

    switch (contentType) {
      case ToolVariants.ICON:
        return (
          <Tooltip title={text}>
            <IconButton
              data-cy={clearChatButtonCypress}
              onClick={(): void => setOpenConfirmation(true)}
            >
              <DeleteForever color="primary" />
            </IconButton>
          </Tooltip>
        );
      case ToolVariants.BUTTON:
        return (
          <Button
            variant="outlined"
            dataCy={clearChatButtonCypress}
            onClick={(): void => setOpenConfirmation(true)}
          >
            {text}
          </Button>
        );
    }
  };

  return (
    <>
      {getContent(variant)}
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
            <ExportChat variant="button" text={t('Save Chat')} />
          </Box>
        }
        confirmText={t('Clear Chat')}
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
