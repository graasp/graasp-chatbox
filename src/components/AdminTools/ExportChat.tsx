import moment from 'moment';

import { FC, ReactElement, useState } from 'react';
import { CSVLink as CsvLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GetApp } from '@material-ui/icons';

import { Button } from '@graasp/ui';

import { exportChatButtonCypress } from '../../config/selectors';
import { EXPORT_CSV_HEADERS, EXPORT_DATE_FORMAT } from '../../constants';
import {
  ExportChatHookType,
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
  chatId: string;
  variant?: ToolVariantsType;
  text?: string;
  exportChatHook: ExportChatHookType;
};

// todo: convert this into a backend call
const ExportChat: FC<Props> = ({
  chatId,
  variant = ToolVariants.ICON,
  text,
  exportChatHook,
}) => {
  const [filename, setFilename] = useState('');
  const [data, setData] = useState<ExportedChatMessage[]>([]);
  const { t } = useTranslation();
  const classes = useStyles();

  const { refetch } = exportChatHook(chatId, { enabled: false });

  if (!chatId) {
    return null;
  }

  // generate file name when user clicks on the button
  const onClick = async (): Promise<void> => {
    const currentDate = moment().format(EXPORT_DATE_FORMAT);
    setFilename(`${currentDate}_chat_${chatId}.csv`);

    // fetch the data
    const { data: exportedChat, isSuccess } = await refetch();
    // if any of the used values is falsy we should not display the button
    if (!exportedChat || !isSuccess) {
      setData([]);
      return;
    }

    const csvMessages: ExportedChatMessage[] = exportedChat.messages
      ?.map((message) => ({
        ...(message.toJS() as ExportedChatMessage),
        body: normalizeMentions(message.body),
      }))
      .toArray();
    // render nothing if there is no data
    if (!csvMessages.length) {
      setData([]);
      return;
    }
    setData(csvMessages);
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
      data={data}
      filename={filename}
      asyncOnClick
      onClick={onClick}
      // this removes the BOM for better parsing
      uFEFF={false}
    >
      {getContent(variant)}
    </CsvLink>
  );
};

export default ExportChat;
