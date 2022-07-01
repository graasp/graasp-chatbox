import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  messageParagraphs: {
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

const MessageBody: FC<Props> = ({ messageBody }) => {
  const classes = useStyles();
  return (
    <ReactMarkdown
      linkTarget="_blank"
      className={classes.messageParagraphs}
      remarkPlugins={[remarkGfm, remarkBreaks]}
    >
      {messageBody}
    </ReactMarkdown>
  );
};

export default MessageBody;
