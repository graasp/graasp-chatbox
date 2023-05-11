import { FC, useState } from 'react';
import { UseQueryResult } from 'react-query';

import Notifications from '@mui/icons-material/Notifications';
import { Badge, BadgeProps, IconButton, SvgIconProps } from '@mui/material';

import { MentionStatus } from '@graasp/sdk';
import { MemberMentionsRecord } from '@graasp/sdk/frontend';

import { mentionButtonCypress } from '@/config/selectors';

import MentionsDialog from './MentionsDialog';
import MentionsTable from './MentionsTable';

type Props = {
  color?: SvgIconProps['color'];
  badgeColor?: BadgeProps['color'];
  useMentions: (
    options?: { getUpdates?: boolean | undefined } | undefined,
  ) => UseQueryResult<MemberMentionsRecord>;
  patchMentionFunction: (args: { id: string; status: string }) => void;
  deleteMentionFunction: (id: string) => void;
  clearAllMentionsFunction: () => void;
};

const MentionButton: FC<Props> = ({
  color = 'secondary',
  badgeColor = 'primary',
  useMentions,
  patchMentionFunction,
  deleteMentionFunction,
  clearAllMentionsFunction,
}) => {
  const { data: memberMentions } = useMentions();
  const mentions = memberMentions?.mentions;

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
