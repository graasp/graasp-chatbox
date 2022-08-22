import { List } from 'immutable';

import { FC, useState } from 'react';
import { QueryObserverResult } from 'react-query';

import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

import {
  MemberMentionsRecord,
  MemberRecord,
} from '@graasp/query-client/dist/src/types';
import { MentionStatus } from '@graasp/sdk';

import MentionsDialog from './MentionsDialog';
import MentionsTable from './MentionsTable';

type Props = {
  color?: 'primary' | 'secondary';
  useMentions: (
    options?: { getUpdates?: boolean | undefined } | undefined,
  ) => QueryObserverResult<MemberMentionsRecord>;
  useMembers: (memberIds: string[]) => QueryObserverResult<List<MemberRecord>>;
  patchMentionFunction: (args: { id: string; status: string }) => void;
  deleteMentionFunction: (id: string) => void;
  clearAllMentionsFunction: () => void;
};

const MentionButton: FC<Props> = ({
  color = 'primary',
  useMentions,
  useMembers,
  patchMentionFunction,
  deleteMentionFunction,
  clearAllMentionsFunction,
}) => {
  const useStyles = makeStyles((theme) => ({
    badge: {
      '& .MuiBadge-badge': {
        border: `2px solid ${
          color === 'primary'
            ? theme.palette.background.paper
            : theme.palette.primary.main
        }`,
      },
    },
  }));
  const classes = useStyles();

  const { data: memberMentions } = useMentions();
  const mentions = memberMentions?.mentions;

  // get member ids from the mentions
  const memberIds = Array.from(new Set(mentions?.map((m) => m.creator)));
  const { data: members = List<MemberRecord>() } = useMembers(memberIds);

  // add member names to mentions
  const mentionsWithMembers = mentions?.map((m) => {
    return m.update(
      'creator',
      () => members.find((u) => u.id === m.creator)?.name || 'Anonymous',
    );
  });

  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={(): void => setOpen(true)}>
        <Badge
          className={classes.badge}
          overlap="circular"
          color={color}
          badgeContent={
            mentions?.filter((m) => m.status === MentionStatus.UNREAD)?.size ||
            0
          }
        >
          <Notifications color={color} />
        </Badge>
      </IconButton>
      <MentionsDialog
        content={
          <MentionsTable
            mentions={mentionsWithMembers}
            patchMention={patchMentionFunction}
            deleteMention={deleteMentionFunction}
            clearAllMentions={clearAllMentionsFunction}
          />
        }
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default MentionButton;
