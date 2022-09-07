import { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Tooltip, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { DeleteForever } from '@material-ui/icons';

import { CHATBOX, namespaces } from '@graasp/translations';
import { Button } from '@graasp/ui';

import { clearChatButtonCypress } from '../../config/selectors';
import {
  ClearChatHookType,
  ExportChatHookType,
  ToolVariants,
  ToolVariantsType,
} from '../../types';
import ConfirmationDialog from '../common/ConfirmationDialog';
import ExportChat from './ExportChat';

type Prop = {
  variant?: ToolVariantsType;
  chatId: string;
  clearChatHook: ClearChatHookType;
  exportChatHook: ExportChatHookType;
};

const ClearChat: FC<Prop> = ({
  chatId,
  clearChatHook,
  exportChatHook,
  variant = ToolVariants.BUTTON,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useTranslation(namespaces.chatbox);

  if (!clearChatHook) {
    return null;
  }

  const handleClearChat = (): void => {
    clearChatHook?.(chatId);
  };

  const getContent = (contentType: ToolVariantsType): ReactElement => {
    const text = t(CHATBOX.CLEAR_ALL_CHAT);

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
            startIcon={<DeleteForever color="primary" />}
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
    <div>
      {getContent(variant)}
      <ConfirmationDialog
        open={openConfirmation}
        title={t(CHATBOX.CLEAR_ALL_CHAT_TITLE)}
        content={
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography>{t(CHATBOX.CLEAR_ALL_CHAT_CONTENT)}</Typography>
            <ExportChat
              chatId={chatId}
              variant="button"
              exportChatHook={exportChatHook}
              text={t(CHATBOX.SAVE_CHAT_BUTTON)}
            />
          </Box>
        }
        confirmText={t(CHATBOX.CLEAR_ALL_CHAT)}
        onConfirm={(): void => {
          setOpenConfirmation(false);
          handleClearChat();
        }}
        onCancel={(): void => {
          setOpenConfirmation(false);
        }}
      />
    </div>
  );
};

export default ClearChat;
