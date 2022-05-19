export const sendButtonCypress = 'sendButton';
export const inputTextFieldCypress = 'inputTextField';
export const messageActionsButtonCypress = 'messageActionsButtonCypress';
export const editMenuItemCypress = 'editMenuItemCypress';
export const deleteMenuItemCypress = 'deleteMenuItemCypress';
export const editBannerCypress = 'editBannerCypress';
export const editBannerOldTextCypress = 'editBannerOldTextCypress';
export const editBannerCloseButtonCypress = 'editBannerCloseButtonCypress';
export const adminToolsContainerCypress = 'adminToolsContainerCypress';
export const exportChatButtonCypress = 'exportChatButtonCypress';
export const clearChatButtonCypress = 'clearChatButtonCypress';
export const cancelDialogButtonCypress = 'cancelDialogButtonCypress';
export const confirmDialogButtonCypress = 'confirmDialogButtonCypress';
export const messagesContainerCypress = 'messagesContainerCypress';
export const inputTextFieldTextAreaCypress = 'inputTextFieldTextArea';
export const charCounterCypress = 'charCounterCypress';

export const messageIdCyWrapper = (id: string): string => `message-${id}`;

export const dataCyWrapper = (cypressSelector: string): string =>
  `[data-cy=${cypressSelector}]`;
