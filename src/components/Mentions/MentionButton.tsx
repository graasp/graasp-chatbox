import { useState } from 'react';
import { UseQueryResult } from 'react-query';

import { Notifications } from '@mui/icons-material';
import { Badge, BadgeProps, IconButton, SvgIconProps } from '@mui/material';

import { ChatMention, MentionStatus } from '@graasp/sdk';

import { mentionButtonCypress } from '@/config/selectors.js';

import MentionsDialog from './MentionsDialog.js';
import MentionsTable from './MentionsTable.js';

type Props = {
  color?: SvgIconProps['color'];
  badgeColor?: BadgeProps['color'];
  useMentions: (
    options?: { getUpdates?: boolean | undefined } | undefined,
  ) => UseQueryResult<ChatMention[]>;
  patchMentionFunction: (args: { id: string; status: string }) => void;
  deleteMentionFunction: (id: string) => void;
  clearAllMentionsFunction: () => void;
};

const MentionButton = ({
  color = 'secondary',
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
          <Notifications color={color} />
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
