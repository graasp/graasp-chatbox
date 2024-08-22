import ReactMarkdown, { ExtraProps } from 'react-markdown';

import { styled } from '@mui/material';

import { Highlight, Language, themes } from 'prism-react-renderer';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import {
  ALL_MEMBERS_ID,
  ALL_MEMBERS_MEMBER,
  UNKNOWN_USER_NAME,
} from '@/constants.js';
import { useCurrentMemberContext } from '@/context/CurrentMemberContext.js';
import { useMessagesContext } from '@/context/MessagesContext.js';
import { getIdMention, getMention } from '@/utils/mentions.js';

const StyledReactMarkdown = styled(ReactMarkdown)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  '& *': {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  '& div.prism-code': {
    fontFamily:
      'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    fontSize: '0.8rem',
    padding: theme.spacing(1, 0),
  },
  // set margins for all elements
  '& h1, p': {
    marginTop: theme.spacing(1),
  },
  '& p': {
    lineHeight: '1.5',
    fontSize: '1rem',
  },
  '& ul, ol': {
    // define offset for list
    paddingInlineStart: theme.spacing(2),
  },
  '& code': {
    padding: '0.2em 0.4em',
    borderRadius: theme.spacing(1),
    backgroundColor: 'silver',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontSize: '90%',
    fontFamily:
      'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
  },
  '& pre': {
    margin: theme.spacing(1, 1),
    backgroundColor: 'rgba(197, 197, 197, 0.37)',
    // border: 'solid 1px silver',
    borderRadius: theme.spacing(1),
  },
  '& blockquote': {
    borderLeft: 'solid darkgray 4px',
    color: 'darkgray',
    marginLeft: '0',
    paddingLeft: theme.spacing(2),
    marginInlineEnd: theme.spacing(1),
  },
  '& table, th, td, tr': {
    border: 'solid black 1px ',
  },
  '& table': {
    borderCollapse: 'collapse',
  },
  // alternate background colors in table rows
  '& tr:nth-of-type(even)': {
    backgroundColor: 'lightgray',
  },
  '& img': {
    maxWidth: '100%',
  },
}));

type Props = {
  messageBody: string;
};

const MessageBody = ({ messageBody }: Props): JSX.Element => {
  const currentMember = useCurrentMemberContext();
  const { members = [] } = useMessagesContext();

  function code(
    props: JSX.IntrinsicElements['code'] & ExtraProps,
  ): JSX.Element {
    const { className: language, children, ...rest } = props;

    const match = /language-(\w+)/.exec(language || '');
    const mentionText = String(children).replace(/\n$/, '');
    // try to match a legacy mention
    const legacyMention = getMention(mentionText);
    const mention = getIdMention(mentionText);
    if (
      (legacyMention && legacyMention.groups) ||
      (mention && mention.groups)
    ) {
      const userId = mention?.groups?.id || legacyMention?.groups?.id;
      const userName =
        [...members, ALL_MEMBERS_MEMBER].find((m) => m.id === userId)?.name ||
        UNKNOWN_USER_NAME;

      return (
        <span
          style={{
            ...((userId === currentMember?.id || userId === ALL_MEMBERS_ID) && {
              backgroundColor: '#e3c980',
            }),
            fontWeight: 'bold',
          }}
        >
          @{userName}
        </span>
      );
    }
    return match ? (
      <Highlight
        theme={themes.vsLight}
        code={String(children).replace(/\n$/, '')}
        language={match[1] as Language}
        {...props}
      >
        {({ className, tokens, getLineProps, getTokenProps }): JSX.Element => (
          <div className={className}>
            {tokens.map((line, i) => (
              <div
                {...getLineProps({
                  line,
                  key: i,
                })}
              >
                {line.map((token, key) => (
                  <span
                    {...getTokenProps({
                      token,
                      key,
                    })}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </Highlight>
    ) : (
      <code className={language} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <StyledReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{ code }}
    >
      {messageBody}
    </StyledReactMarkdown>
  );
};

export default MessageBody;
