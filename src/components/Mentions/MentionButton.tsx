import { List, RecordOf } from 'immutable';

import { FC, useState } from 'react';

import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

import {
  ChatMention,
  MemberMentions,
} from '@graasp/query-client/dist/src/types';
import { Member } from '@graasp/ui/dist/types';

import MentionsDialog from './MentionsDialog';
import MentionsTable from './MentionsTable';

const useStyles = makeStyles((theme) => ({
  badge: {
    '& .MuiBadge-badge': {
      border: `2px solid ${theme.palette.background.paper}`,
    },
  },
}));

type Props = {
  useMentions: (options?: { getUpdates?: boolean | undefined } | undefined) => {
    data?: RecordOf<MemberMentions>;
  };
  useMembers: (memberIds: string[]) => { data?: List<Member> };
  patchMentionFunction: (args: { id: string; status: string }) => void;
  deleteMentionFunction: (id: string) => void;
  clearAllMentionsFunction: () => void;
};

const MentionButton: FC<Props> = ({
  useMentions,
  useMembers,
  patchMentionFunction,
  deleteMentionFunction,
  clearAllMentionsFunction,
}) => {
  const classes = useStyles();

  const { data: memberMentions } = useMentions();
  const mentions = memberMentions?.get('mentions') || ([] as ChatMention[]);

  // get member ids from the mentions
  const memberIds = Array.from(new Set(mentions.map((m) => m.creator)));
  const { data: members = List<Member>() } = useMembers(memberIds);

  // add member names to mentions
  const mentionsWithMembers = mentions.map((m) => ({
    ...m,
    creator: members.find((u) => u.id === m.creator)?.name || 'Anonymous',
  }));

  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={(): void => setOpen(true)}>
        <Badge
          className={classes.badge}
          overlap="circular"
          color="secondary"
          badgeContent={mentions.filter((m) => m.status === 'unread').length}
        >
          <Notifications color="primary" />
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
