import { List } from 'immutable';

import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';

import { Notifications } from '@mui/icons-material';
import { Badge, BadgeProps, IconButton, SvgIconProps } from '@mui/material';

import { MentionStatus } from '@graasp/sdk';
import { MemberMentionsRecord, MemberRecord } from '@graasp/sdk/frontend';
import { CHATBOX, namespaces } from '@graasp/translations';

import { mentionButtonCypress } from '../../config/selectors';
import MentionsDialog from './MentionsDialog';
import MentionsTable from './MentionsTable';

type Props = {
  color?: SvgIconProps['color'] | string;
  badgeColor?: BadgeProps['color'];
  useMentions: (
    options?: { getUpdates?: boolean | undefined } | undefined,
  ) => UseQueryResult<MemberMentionsRecord>;
  useMembers: (memberIds: string[]) => UseQueryResult<List<MemberRecord>>;
  patchMentionFunction: (args: { id: string; status: string }) => void;
  deleteMentionFunction: (id: string) => void;
  clearAllMentionsFunction: () => void;
};

const MentionButton: FC<Props> = ({
  color = 'primary',
  badgeColor = 'warning',
  useMentions,
  useMembers,
  patchMentionFunction,
  deleteMentionFunction,
  clearAllMentionsFunction,
}) => {
  const { t } = useTranslation(namespaces.chatbox);

  const { data: memberMentions } = useMentions();
  const mentions = memberMentions?.mentions;

  // get member ids from the mentions
  const memberIds = Array.from(new Set(mentions?.map((m) => m.creator)));
  const { data: members = List<MemberRecord>() } = useMembers(memberIds);

  // add member names to mentions
  const mentionsWithMembers = mentions?.map((m) => {
    return m.update(
      'creator',
      () =>
        members.find((u) => u.id === m.creator)?.name ||
        t(CHATBOX.ANONYMOUS_USER),
    );
  });

  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        data-cy={mentionButtonCypress}
        onClick={(): void => setOpen(true)}
      >
        <Badge
          overlap="circular"
          color={badgeColor}
          badgeContent={
            mentions?.filter((m) => m.status === MentionStatus.UNREAD)?.size ||
            0
          }
        >
          <Notifications htmlColor={color} />
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
