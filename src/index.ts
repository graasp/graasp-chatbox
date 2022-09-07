export { default } from './components/Chatbox/Chatbox';

// Mention button providing dialog with member mentions table
// should be placed in the header next to the profile picture
export { default as MentionButton } from './components/Mentions/MentionButton';

// Admin tools to export and clear the chat
// should be used in the item settings
export { default as ClearChatButton } from './components/AdminTools/ClearChatButton';
export { default as DownloadChatButton } from './components/AdminTools/ExportChat';

export type { Member, ChatMessage, AvatarHookType } from './types';
export { ImmutableMember, ToolVariants } from './types';
export * from './utils/mentions';
