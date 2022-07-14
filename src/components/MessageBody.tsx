import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import vsLight from 'prism-react-renderer/themes/vsLight';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';

import { makeStyles } from '@material-ui/core/styles';

import { ALL_MEMBERS_ID } from '../constants';
import { useCurrentMemberContext } from '../context/CurrentMemberContext';
import { getMention } from '../utils/mentions';

const useStyles = makeStyles((theme) => ({
  messageParagraphs: {
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
    '& tr:nth-child(even)': {
      backgroundColor: 'lightgray',
    },
    '& img': {
      maxWidth: '100%',
    },
  },
}));

type Props = {
  messageBody: string;
};

const MessageBody: FC<Props> = ({ messageBody }) => {
  const classes = useStyles();
  const { id: currentMemberId } = useCurrentMemberContext();

  const renderCode = ({
    inline,
    className: classNameInit,
    children: codeContent,
    ...props
  }: CodeProps): ReactElement => {
    const match = (classNameInit || '').match(/language-(\w+)/);
    const mention = getMention(codeContent.join(''));
    if (inline && mention && mention.groups) {
      return (
        <span
          style={{
            ...((mention.groups.id === currentMemberId ||
              mention.groups.id === ALL_MEMBERS_ID) && {
              backgroundColor: '#e3c980',
            }),
            fontWeight: 'bold',
          }}
        >
          @{mention[1]}
        </span>
      );
    }
    return !inline && match ? (
      <Highlight
        {...defaultProps}
        theme={vsLight}
        code={String(codeContent).replace(/\n$/, '')}
        language={match[1] as Language}
        {...props}
      >
        {({ className, tokens, getLineProps, getTokenProps }): ReactElement => (
          <div className={className}>
            {tokens.map((line, i) => (
              // eslint-disable-next-line react/jsx-key
              <div
                {...getLineProps({
                  line,
                  key: i,
                })}
              >
                {line.map((token, key) => (
                  // eslint-disable-next-line react/jsx-key
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
      <code className={classNameInit} {...props}>
        {codeContent}
      </code>
    );
  };

  return (
    <ReactMarkdown
      linkTarget="_blank"
      className={classes.messageParagraphs}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        code: renderCode,
      }}
    >
      {messageBody}
    </ReactMarkdown>
  );
};

export default MessageBody;
