import { FC, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import buildI18n, { langs, namespaces } from '@graasp/translations';

import { ClearChatButton } from '../..';
import {
  ClearChatHookType,
  ExportChatHookType,
  ToolVariants,
  ToolVariantsType,
} from '../../types';

type Prop = {
  variant?: ToolVariantsType;
  chatId: string;
  clearChatHook: ClearChatHookType;
  exportChatHook: ExportChatHookType;
  lang?: string;
};

const ClearChat: FC<Prop> = ({
  chatId,
  clearChatHook,
  exportChatHook,
  variant = ToolVariants.BUTTON,
  lang = langs.en,
}) => {
  const i18n = useMemo(() => {
    const i18nInstance = buildI18n(namespaces.chatbox);
    i18nInstance.changeLanguage(lang);
    return i18nInstance;
  }, [lang]);

  if (!clearChatHook) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ClearChatButton
        chatId={chatId}
        exportChatHook={exportChatHook}
        clearChatHook={clearChatHook}
        variant={variant}
      />
    </I18nextProvider>
  );
};

export default ClearChat;
