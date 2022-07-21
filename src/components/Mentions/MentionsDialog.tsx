import { FC, ReactElement } from 'react';

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

import { ChatMention } from '@graasp/query-client/dist/src/types';

import { normalizeMentions } from '../../utils/mentions';

type Props = {
  mentions: ChatMention[];
  patchMention: (args: { id: string; status: string }) => void;
  deleteMention: (id: string) => void;
};

const MentionsDialog: FC<Props> = ({
  mentions,
  patchMention,
  deleteMention,
}) => {
  const markAsRead = (id: string): void => {
    patchMention({ id: id, status: 'read' });
  };

  const renderMentionTableContent = (): ReactElement | ReactElement[] => {
    if (!mentions.length) {
      return (
        <TableRow>
          <TableCell colSpan={4}>No Notifications</TableCell>
        </TableRow>
      );
    }
    return mentions.map((m) => (
      <TableRow
        hover
        onClick={(): void => console.log('go to item', m.itemPath)}
      >
        <TableCell>
          {m.status === 'unread' ? (
            <FiberManualRecord fontSize={'small'} color={'secondary'} />
          ) : null}
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
    ));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>Message</TableCell>
          <TableCell>Mentioned By</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{renderMentionTableContent()}</TableBody>
    </Table>
  );
};

export default MentionsDialog;
