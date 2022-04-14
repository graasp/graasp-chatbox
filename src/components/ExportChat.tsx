import { FC, ReactElement, useState } from 'react';
import { CSVLink as CsvLink } from 'react-csv';
import { useMessagesContext } from '../context/MessagesContext';
import {
  DEFAULT_USER_NAME,
  EXPORT_CSV_HEADERS,
  EXPORT_DATE_FORMAT,
} from '../constants';
import { ExportedChatMessage, ToolVariants, ToolVariantsType } from '../types';
import { IconButton } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { exportChatButtonCypress } from '../config/selectors';
import { Button } from '@graasp/ui';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    width: 'fit-content',
  },
});

type Props = {
  variant?: ToolVariantsType;
};

const ExportChat: FC<Props> = ({ variant = ToolVariants.ICON }) => {
  const { messages, chatId, members } = useMessagesContext();
  const [filename, setFilename] = useState('');
  const { t } = useTranslation();
  const classes = useStyles();

  // if any of the used values is falsy we should not display the button
  if (!messages || !chatId || !members) {
    return null;
  }

  const csvMessages: ExportedChatMessage[] = messages
    .toArray()
    .map((message) => {
      const creatorName =
        members.find((m) => m.id === message.creator)?.name ||
        DEFAULT_USER_NAME;
      return { ...message, creatorName };
    });
  // render nothing if there is no data
  if (!csvMessages.length) {
    return null;
  }

  // generate file name when user clicks on the button
  const onClick = (): void => {
    const currentDate = moment().format(EXPORT_DATE_FORMAT);
    setFilename(`${currentDate}_chat_${chatId}.csv`);
  };

  const getContent = (variant: ToolVariantsType): ReactElement | null => {
    switch (variant) {
      case ToolVariants.ICON:
        return (
          <IconButton>
            <GetApp color="secondary" />
          </IconButton>
        );
      case ToolVariants.BUTTON:
        return <Button>{t('Download Chat')}</Button>;
      default:
        return null;
    }
  };

  return (
    <CsvLink
      data-cy={exportChatButtonCypress}
      className={classes.link}
      headers={EXPORT_CSV_HEADERS}
      data={csvMessages}
      filename={filename}
      onClick={onClick}
    >
      {getContent(variant)}
    </CsvLink>
  );
};

export default ExportChat;
