export { default } from './components/Chatbox/Chatbox';

// Mention button providing dialog with member mentions table
// should be placed in the header next to the profile picture
export { default as MentionButton } from './components/Mentions/MentionButton';

export type { Member, ChatMessage, AvatarHookType } from './types';
export { ImmutableMember, ToolVariants } from './types';
export * from './utils/mentions';
