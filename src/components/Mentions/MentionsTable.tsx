import { FC, ReactElement, useState } from 'react';

import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  styled,
} from '@mui/material';

import {
  ChatMention,
  MentionStatus,
  buildItemLinkForBuilder,
  getIdsFromPath,
} from '@graasp/sdk';
import { CHATBOX } from '@graasp/translations';
import { Button } from '@graasp/ui';

import { useChatboxTranslation } from '@/utils/utils';

import MessageBody from '../Chatbox/MessageBody';
import ConfirmationDialog from '../common/ConfirmationDialog';

const StyledRow = styled(TableRow)({
  '&:hover': {
    // make the cursor a pointer to indicate we can click
    cursor: 'pointer',
  },
});

type Props = {
  mentions?: ChatMention[];
  patchMention: (args: { id: string; status: string }) => void;
  clearAllMentions: () => void;
  deleteMention: (id: string) => void;
};

const MentionsTable: FC<Props> = ({
  mentions,
  patchMention,
  deleteMention,
  clearAllMentions,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useChatboxTranslation();
  const markAsRead = (id: string): void => {
    patchMention({ id: id, status: MentionStatus.Read });
  };

  const renderMentionTableContent = (): ReactElement | ReactElement[] => {
    if (!mentions || !mentions.length) {
      return (
        <TableRow>
          <TableCell colSpan={4}>{t(CHATBOX.EMPTY_NOTIFICATIONS)}</TableCell>
        </TableRow>
      );
    }

    return mentions.map((m) => (
      <StyledRow
        key={m.id}
        hover
        onClick={(): void => {
          const link = buildItemLinkForBuilder({
            origin: window.location.origin,
            itemId: getIdsFromPath(m.message.item.path).slice(-1)[0],
            chatOpen: true,
          });
          markAsRead(m.id);
          window.location.href = link;
        }}
      >
        <TableCell>
          {m.status === MentionStatus.Unread && (
            <FiberManualRecord fontSize="small" color="primary" />
          )}
        </TableCell>
        <TableCell>
          <MessageBody messageBody={m.message.body} />
        </TableCell>
        <TableCell>{m.message.creator?.name}</TableCell>
        <TableCell>
          <Grid container direction="row">
            <Grid item>
              <Tooltip title={t(CHATBOX.MARK_AS_READ)}>
                <IconButton
                  onClick={(e): void => {
                    e.stopPropagation();
                    markAsRead(m.id);
                  }}
                >
                  <Check color="primary" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={t(CHATBOX.DELETE_TOOLTIP)}>
                <IconButton
                  onClick={(e): void => {
                    e.stopPropagation();
                    deleteMention(m.id);
                  }}
                >
                  <Close color="primary" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </TableCell>
      </StyledRow>
    ));
  };

  return (
    <Grid container direction="column">
      <Grid container item direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={(): void => {
            mentions
              ?.filter((m) => m.status === MentionStatus.Unread)
              .map((m) =>
                patchMention({ id: m.id, status: MentionStatus.Read }),
              );
          }}
        >
          {t(CHATBOX.MARK_ALL_AS_READ)}
        </Button>
        <Button
          variant="outlined"
          onClick={(): void => setOpenConfirmation(true)}
        >
          {t(CHATBOX.CLEAR_ALL)}
        </Button>
        <ConfirmationDialog
          open={openConfirmation}
          title={t(CHATBOX.CLEAR_ALL_NOTIFICATIONS_TITLE)}
          content={t(CHATBOX.CLEAR_ALL_NOTIFICATIONS_CONTENT)}
          onConfirm={(): void => {
            clearAllMentions();
            setOpenConfirmation(false);
          }}
          onCancel={(): void => setOpenConfirmation(false)}
        />
      </Grid>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t(CHATBOX.COL_STATUS)}</TableCell>
              <TableCell>{t(CHATBOX.COL_MESSAGE)}</TableCell>
              <TableCell>{t(CHATBOX.COL_BY)}</TableCell>
              <TableCell>{t(CHATBOX.COL_ACTIONS)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderMentionTableContent()}</TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default MentionsTable;
