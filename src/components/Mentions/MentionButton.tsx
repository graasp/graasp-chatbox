import { useState } from 'react';

import { Badge, BadgeProps, IconButton } from '@mui/material';

import { ChatMention, MentionStatus } from '@graasp/sdk';

import { UseQueryResult } from '@tanstack/react-query';
import { BellIcon } from 'lucide-react';

import { mentionButtonCypress } from '@/config/selectors.js';

import MentionsDialog from './MentionsDialog.js';
import MentionsTable from './MentionsTable.js';

type Props = {
  color?: string;
  badgeColor?: BadgeProps['color'];
  useMentions: (
    options?: { getUpdates?: boolean | undefined } | undefined,
  ) => UseQueryResult<ChatMention[]>;
  patchMentionFunction: (args: { id: string; status: string }) => void;
  deleteMentionFunction: (id: string) => void;
  clearAllMentionsFunction: () => void;
};

const MentionButton = ({
  color = 'white',
  badgeColor = 'primary',
  useMentions,
  patchMentionFunction,
  deleteMentionFunction,
  clearAllMentionsFunction,
}: Props): JSX.Element => {
  const { data: mentions } = useMentions();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        data-cy={mentionButtonCypress}
        onClick={(): void => setOpen(true)}
      >
        <Badge
          component="div"
          overlap="circular"
          color={badgeColor}
          badgeContent={
            mentions?.filter((m) => m.status === MentionStatus.Unread)
              ?.length || 0
          }
        >
          <BellIcon color={color} />
        </Badge>
      </IconButton>
      <MentionsDialog
        content={
          <MentionsTable
            mentions={mentions}
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
