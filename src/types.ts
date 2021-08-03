export type PartialChatMessage = {
  chatId: string;
  body: string;
};

export type ChatMessage = {
  chatId: string;
  creator: string;
  createdAt: string;
  body: string;
};
