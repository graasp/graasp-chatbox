import React, { FC, useState } from 'react';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import MoreVert from '@mui/icons-material/MoreVert';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';

import { ChatMessageRecord } from '@graasp/sdk/frontend';
import { CHATBOX } from '@graasp/translations';

import {
  deleteMenuItemCypress,
  editMenuItemCypress,
  messageActionsButtonCypress,
} from '@/config/selectors';
import { LIST_ICON_MIN_WIDTH } from '@/constants';
import { useEditingContext } from '@/context/EditingContext';
import { DeleteMessageFunctionType } from '@/types';
import { useChatboxTranslation } from '@/utils/utils';

type Props = {
  message: ChatMessageRecord;
  isOwn?: boolean;
  deleteMessageFunction?: DeleteMessageFunctionType;
};

const StyledListItemIcon = styled(ListItemIcon)({
  // reduce min width of icons in list to make more compact
  '&.MuiListItemIcon-root': {
    minWidth: LIST_ICON_MIN_WIDTH,
  },
});

const MessageActions: FC<Props> = ({
  message,
  deleteMessageFunction,
  isOwn = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { t } = useChatboxTranslation();
  const { enableEdit } = useEditingContext();

  const handleOnClickMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchor(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleOnCloseMenu = (): void => {
    setMenuAnchor(null);
  };

  const handleDeleteMessage = (): void => {
    deleteMessageFunction?.({ chatId: message.chatId, id: message.id });
    handleOnCloseMenu();
  };

  const handleEditMessage = (): void => {
    enableEdit(message.id, message.body);
    handleOnCloseMenu();
  };

  return (
    <>
      <IconButton
        data-cy={messageActionsButtonCypress}
        onClick={handleOnClickMenu}
      >
        <MoreVert />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={handleOnCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {
          // only show the edit button on own messages
          isOwn && (
            <MenuItem
              data-cy={editMenuItemCypress}
              onClick={handleEditMessage}
              dense
            >
              <StyledListItemIcon>
                <Edit color="primary" />
              </StyledListItemIcon>
              <ListItemText>{t(CHATBOX.EDIT_BUTTON)}</ListItemText>
            </MenuItem>
          )
        }
        <MenuItem
          data-cy={deleteMenuItemCypress}
          onClick={handleDeleteMessage}
          dense
        >
          <StyledListItemIcon>
            <Delete
              // todo: change to secondary once Graasp has one
              color="primary"
            />
          </StyledListItemIcon>
          <ListItemText>{t(CHATBOX.DELETE_BUTTON)}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MessageActions;
