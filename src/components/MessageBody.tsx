import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import vsLight from 'prism-react-renderer/themes/vsLight';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  messageParagraphs: {
    '& .prism-code': {
      fontFamily:
        'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
      // margin: theme.spacing(1),
      backgroundColor: 'transparent !important',
      fontSize: '0.9rem',
      padding: theme.spacing(1),
    },
    '& :last-child': {
      marginBottom: 0,
    },
    '& div.token-line': {
      marginBlockStart: 0,
      fontFamily:
        'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
    },
    // set margins for all elements
    '& *': {
      marginBlockStart: theme.spacing(1),
      marginBlockEnd: theme.spacing(1),
      fontFamily: theme.typography.fontFamily,
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
      margin: theme.spacing(1, 2),
      backgroundColor: 'rgba(197, 197, 197, 0.37)',
      // border: 'solid 1px silver',
      borderRadius: theme.spacing(1),
    },
    '& blockquote': {
      borderLeft: 'solid darkgray 4px',
      color: 'darkgray',
      marginLeft: '0',
      paddingLeft: theme.spacing(2),
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

const renderCode = ({
  inline,
  className: classNameInit,
  children: codeContent,
  ...props
}: CodeProps): ReactElement => {
  const match = /language-(\w+)/.exec(classNameInit || '');
  return !inline && match ? (
    <Highlight
      {...defaultProps}
      theme={vsLight}
      code={String(codeContent).replace(/\n$/, '')}
      language={match[1] as Language}
      {...props}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }): ReactElement => (
        <div className={className} style={style}>
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

const MessageBody: FC<Props> = ({ messageBody }) => {
  const classes = useStyles();
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
