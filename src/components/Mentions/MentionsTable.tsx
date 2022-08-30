import { List } from 'immutable';

import { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { Check, Close, FiberManualRecord } from '@material-ui/icons';

import { ChatMentionRecord } from '@graasp/query-client/dist/src/types';
import {
  MentionStatus,
  buildItemLinkForBuilder,
  getIdsFromPath,
} from '@graasp/sdk';
import { CHATBOX } from '@graasp/translations';
import { Button } from '@graasp/ui';

import { normalizeMentions } from '../../utils/mentions';
import ConfirmationDialog from '../common/ConfirmationDialog';

const useStyles = makeStyles({
  row: {
    '&:hover': {
      // make the cursor a pointer to indicate we can click
      cursor: 'pointer',
    },
  },
});

type Props = {
  mentions?: List<ChatMentionRecord>;
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
  const { t } = useTranslation();
  const classes = useStyles();
  const markAsRead = (id: string): void => {
    patchMention({ id: id, status: MentionStatus.READ });
  };

  const renderMentionTableContent = (): ReactElement | ReactElement[] => {
    if (!mentions || !mentions.size) {
      return (
        <TableRow>
          <TableCell colSpan={4}>No Notifications</TableCell>
        </TableRow>
      );
    }
    return mentions
      .map((m) => (
        <TableRow
          key={m.id}
          className={classes.row}
          hover
          onClick={(): void => {
            const link = buildItemLinkForBuilder({
              host: '',
              itemId: getIdsFromPath(m.itemPath).slice(-1)[0],
              chatOpen: true,
            });
            window.location.href = link;
          }}
        >
          <TableCell>
            {m.status === MentionStatus.UNREAD && (
              <FiberManualRecord fontSize="small" color="primary" />
            )}
          </TableCell>
          <TableCell>{normalizeMentions(m.message)}</TableCell>
          <TableCell>{m.creator}</TableCell>
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
        </TableRow>
      ))
      .toArray();
  };

  return (
    <Grid container direction="column">
      <Grid container item direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={(): void => {
            mentions
              ?.filter((m) => m.status === MentionStatus.UNREAD)
              .map((m) =>
                patchMention({ id: m.id, status: MentionStatus.READ }),
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
