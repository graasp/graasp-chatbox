import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  messageParagraphs: {
    // set margins for all elements
    '& *': {
      marginBlockStart: '4px',
      marginBlockEnd: '4px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    '& p': {
      lineHeight: '1.5',
      fontSize: '1rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    '& ul': {
      // define offset for list
      paddingInlineStart: '20px',
    },
    '& code': {
      padding: '0.2em 0.4em',
      borderRadius: '6px',
      backgroundColor: 'silver',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      fontSize: '90%',
    },
    '& blockquote': {
      borderLeft: 'solid darkgray 4px',
      color: 'darkgray',
      marginLeft: '0',
      paddingLeft: '16px',
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
