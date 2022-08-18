import { List } from 'immutable';

import { FC, ReactElement, useState } from 'react';

import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { Check, Close, FiberManualRecord } from '@material-ui/icons';

import { ChatMentionRecord } from '@graasp/query-client/dist/src/types';
import { Button } from '@graasp/ui';

import { normalizeMentions } from '../../utils/mentions';
import ConfirmationDialog from '../common/ConfirmationDialog';

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
  const markAsRead = (id: string): void => {
    patchMention({ id: id, status: 'read' });
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
          hover
          onClick={(): void => console.log('go to item', m.itemPath)}
        >
          <TableCell>
            {m.status === 'unread' ? (
              <FiberManualRecord fontSize={'small'} color={'primary'} />
            ) : null}
          </TableCell>
          <TableCell>
            {Object.keys(m.toJS())
              .map((k: string) => `${k}: ${m[k]}`)
              .join('\n')}
          </TableCell>
          <TableCell>{normalizeMentions(m.message)}</TableCell>
          <TableCell>{m.creator}</TableCell>
          <TableCell>
            <Grid container direction="row">
              <Grid item>
                <Tooltip title={'Mark as Read'}>
                  <IconButton
                    onClick={(e): void => {
                      e.stopPropagation();
                      markAsRead(m.id);
                    }}
                  >
                    <Check color={'primary'} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Delete'}>
                  <IconButton
                    onClick={(e): void => {
                      e.stopPropagation();
                      deleteMention(m.id);
                    }}
                  >
                    <Close color={'primary'} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))
      .toJS() as ReactElement[];
  };

  console.log(mentions?.toJS());

  return (
    <Grid container direction="column">
      <Grid container item direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={(): void => {
            mentions
              ?.filter((m) => m.status === 'unread')
              .map((m) => patchMention({ id: m.id, status: 'read' }));
          }}
        >
          Mark All As Read
        </Button>
        <Button
          variant="outlined"
          onClick={(): void => setOpenConfirmation(true)}
        >
          Clear All
        </Button>
        <ConfirmationDialog
          open={openConfirmation}
          title="Clear All Notifications"
          content={'Are you sure you want to clear all your notifications ?'}
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
              <TableCell>Status</TableCell>
              <TableCell>Infos</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderMentionTableContent()}</TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default MentionsTable;
