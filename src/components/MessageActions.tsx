import React, { FC, useState } from 'react';
import { ChatMessage, PartialChatMessage } from '../types';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Delete, Edit, MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  deleteMenuItemCypress,
  editMenuItemCypress,
  messageActionsButtonCypress,
} from '../config/selectors';
import { LIST_ICON_MIN_WIDTH } from '../constants';
import { useTranslation } from 'react-i18next';
import { CHATBOX } from '@graasp/translations';
import { useEditingContext } from '../context/EditingContext';

type Props = {
  message: ChatMessage;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
};

const useStyles = makeStyles(() => ({
  menu: {
    // reduce min width of icons in list to make more compact
    '&.MuiListItemIcon-root': {
      minWidth: LIST_ICON_MIN_WIDTH,
    },
  },
}));

const MessageActions: FC<Props> = ({ message, deleteMessageFunction }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const classes = useStyles();
  const { t } = useTranslation();
  const { enableEdit } = useEditingContext();

  const handleOnClickMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchor(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleOnCloseMenu = (): void => {
    setMenuAnchor(null);
  };

  const handleDeleteMessage = (): void => {
    deleteMessageFunction?.({ chatId: message.chatId, messageId: message.id });
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
        <MenuItem
          data-cy={editMenuItemCypress}
          onClick={handleEditMessage}
          dense
        >
          <ListItemIcon className={classes.menu}>
            <Edit color={'primary'} />
          </ListItemIcon>
          <ListItemText>{t(CHATBOX.EDIT_BUTTON)}</ListItemText>
        </MenuItem>
        <MenuItem
          data-cy={deleteMenuItemCypress}
          onClick={handleDeleteMessage}
          dense
        >
          <ListItemIcon className={classes.menu}>
            <Delete
              // todo: change to secondary once Graasp has one
              color={'primary'}
            />
          </ListItemIcon>
          <ListItemText>{t(CHATBOX.DELETE_BUTTON)}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MessageActions;
