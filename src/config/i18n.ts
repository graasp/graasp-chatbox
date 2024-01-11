import { useTranslation } from 'react-i18next';

import { namespaces } from '@graasp/translations';

import { Locale, ar, de, enGB, es, fr, it } from 'date-fns/locale';

export const dateLocales: { [key: string]: Locale } = {
  en: enGB,
  es,
  it,
  fr,
  ar,
  de,
};

export const getDateLocale = (locale: string) => {
  if (locale in dateLocales) {
    return dateLocales[locale];
  } else {
    dateLocales.en;
  }
};

export const useChatboxTranslation = () => useTranslation(namespaces.chatbox);
