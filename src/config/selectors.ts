export const sendButtonCypress = 'sendButton';
export const inputTextFieldCypress = 'inputTextField';

export const messageIdCyWrapper = (id: string): string => `message-${id}`;

export const dataCyWrapper = (cypressSelector: string): string =>
  `[data-cy=${cypressSelector}]`;
