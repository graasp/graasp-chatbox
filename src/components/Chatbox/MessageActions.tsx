import { MouseEvent, useState } from 'react';

import { Delete, Edit, MoreVert } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';

import { ChatMessage } from '@graasp/sdk';
import { CHATBOX } from '@graasp/translations';

import { useChatboxTranslation } from '@/config/i18n.js';
import {
  deleteMenuItemCypress,
  editMenuItemCypress,
  messageActionsButtonCypress,
} from '@/config/selectors.js';
import { LIST_ICON_MIN_WIDTH } from '@/constants.js';
import { useEditingContext } from '@/context/EditingContext.js';
import { DeleteMessageFunctionType } from '@/types.js';

type Props = {
  message: ChatMessage;
  isOwn?: boolean;
  deleteMessageFunction?: DeleteMessageFunctionType;
};

const StyledListItemIcon = styled(ListItemIcon)({
  // reduce min width of icons in list to make more compact
  '&.MuiListItemIcon-root': {
    minWidth: LIST_ICON_MIN_WIDTH,
  },
});

const MessageActions = ({
  message,
  deleteMessageFunction,
  isOwn = false,
}: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { t } = useChatboxTranslation();
  const { enableEdit } = useEditingContext();

  const handleOnClickMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchor(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleOnCloseMenu = (): void => {
    setMenuAnchor(null);
  };

  const handleDeleteMessage = (): void => {
    deleteMessageFunction?.({ itemId: message.item.id, messageId: message.id });
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
