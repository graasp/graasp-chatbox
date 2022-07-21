import moment from 'moment';

import { FC, ReactElement, useState } from 'react';
import { CSVLink as CsvLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GetApp } from '@material-ui/icons';

import { Button } from '@graasp/ui';

import { exportChatButtonCypress } from '../../config/selectors';
import {
  DEFAULT_USER_NAME,
  EXPORT_CSV_HEADERS,
  EXPORT_DATE_FORMAT,
} from '../../constants';
import { useMessagesContext } from '../../context/MessagesContext';
import {
  ExportedChatMessage,
  ToolVariants,
  ToolVariantsType,
} from '../../types';
import { normalizeMentions } from '../../utils/mentions';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    width: 'fit-content',
  },
});

type Props = {
  variant?: ToolVariantsType;
  text?: string;
};

const ExportChat: FC<Props> = ({ variant = ToolVariants.ICON, text }) => {
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
      return {
        ...message,
        body: normalizeMentions(message.body)!,
        creatorName,
      };
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
    const contentText: string = text || t('Download Chat');
    switch (variant) {
      case ToolVariants.ICON:
        return (
          <Tooltip title={contentText}>
            <IconButton>
              <GetApp color="primary" />
            </IconButton>
          </Tooltip>
        );
      case ToolVariants.BUTTON:
        return <Button variant="outlined">{contentText}</Button>;
      default:
        return null;
    }
  };

  return (
    <CsvLink
      data-cy={exportChatButtonCypress}
      // add a property to pass the fileName
      // this property will have a value after clicking the button
      data-cy-filename={filename}
      className={classes.link}
      headers={EXPORT_CSV_HEADERS}
      data={csvMessages}
      filename={filename}
      onClick={onClick}
      // this removes the BOM for better parsing
      uFEFF={false}
    >
      {getContent(variant)}
    </CsvLink>
  );
};

export default ExportChat;
