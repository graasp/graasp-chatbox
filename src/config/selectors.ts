export const sendButtonCypress = 'sendButton';
export const inputTextFieldCypress = 'inputTextField';
export const messageActionsButtonCypress = 'messageActionsButton';
export const editMenuItemCypress = 'editMenuItem';
export const deleteMenuItemCypress = 'deleteMenuItem';
export const editBannerCypress = 'editBanner';
export const editBannerOldTextCypress = 'editBannerOldText';
export const editBannerCloseButtonCypress = 'editBannerCloseButton';
export const adminToolsContainerCypress = 'adminToolsContainer';
export const exportChatButtonCypress = 'exportChatButton';
export const clearChatButtonCypress = 'clearChatButton';
export const cancelDialogButtonCypress = 'cancelDialogButton';
export const confirmDialogButtonCypress = 'confirmDialogButton';
export const messagesContainerCypress = 'messagesContainer';
export const inputTextFieldTextAreaCypress = 'inputTextFieldTextArea';
export const charCounterCypress = 'charCounter';

export const mentionButtonCypress = 'mentionButton';

export const messageIdCyWrapper = (id: string): string => `message-${id}`;

export const dataCyWrapper = (cypressSelector: string): string =>
  `[data-cy=${cypressSelector}]`;
