import React, { FC, useState } from 'react';
import { ChatMessage, EditingProp, PartialChatMessage } from '../types';
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

type Props = {
  message: ChatMessage;
  deleteMessageFunction?: (message: PartialChatMessage) => void;
  setEditing: (editing: EditingProp) => void;
};

const useStyles = makeStyles(() => ({
  menu: {
    // reduce min width of icons in list to make more compact
    '&.MuiListItemIcon-root': {
      minWidth: '30px',
    },
  },
}));

const MessageActions: FC<Props> = ({
  message,
  deleteMessageFunction,
  setEditing,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const classes = useStyles();

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
    setEditing({
      open: true,
      id: message.id,
      body: message.body,
    });
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
        keepMounted
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
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          data-cy={deleteMenuItemCypress}
          onClick={handleDeleteMessage}
          dense
        >
          <ListItemIcon className={classes.menu}>
            <Delete color={'secondary'} />
          </ListItemIcon>
          <ListItemText color={'secondary'}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MessageActions;
