import { List } from 'immutable';

import { FC, useMemo, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { UseQueryResult } from 'react-query';

import { Notifications } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';

import { MentionStatus } from '@graasp/sdk';
import { MemberMentionsRecord, MemberRecord } from '@graasp/sdk/frontend';
import buildI18n, { CHATBOX, langs, namespaces } from '@graasp/translations';

import { mentionButtonCypress } from '../../config/selectors';
import MentionsDialog from './MentionsDialog';
import MentionsTable from './MentionsTable';

type Props = {
  color?: 'primary' | 'secondary';
  lang?: string;
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
  lang = langs.en,
  useMentions,
  useMembers,
  patchMentionFunction,
  deleteMentionFunction,
  clearAllMentionsFunction,
}) => {
  const i18n = useMemo(() => {
    const i18nInstance = buildI18n(namespaces.chatbox);
    i18nInstance.changeLanguage(lang);
    return i18nInstance;
  }, [lang]);
  const t = i18n.t;

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
      <I18nextProvider i18n={i18n}>
        <IconButton
          data-cy={mentionButtonCypress}
          onClick={(): void => setOpen(true)}
        >
          <Badge
            overlap="circular"
            color={color === 'secondary' ? 'primary' : color}
            badgeContent={
              mentions?.filter((m) => m.status === MentionStatus.UNREAD)
                ?.size || 0
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
      </I18nextProvider>
    </div>
  );
};

export default MentionButton;
