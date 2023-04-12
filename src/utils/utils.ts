import { useTranslation } from 'react-i18next';

import { namespaces } from '@graasp/translations';

export const useChatboxTranslation = () => useTranslation(namespaces.chatbox);
