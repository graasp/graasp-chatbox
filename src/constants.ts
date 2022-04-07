export const DEFAULT_CHATBOX_HEIGHT = 600;
export const INPUT_HEIGHT = 120;
export const EDIT_BANNER_HEIGHT = 58;
export const MAX_ROWS_INPUT = 4;
export const BIG_NUMBER = 9999;
export const MESSAGE_CONTAINER_GROW_FACTOR = 10;
export const DEFAULT_USER_NAME = 'Anonymous';
export const MAX_USERNAME_LENGTH = 30;
export const DEFAULT_DATE_FORMAT = 'DD MMM YYYY';
export const EXPORT_DATE_FORMAT = 'YYYY-MM-DD';
export const HEADER_HEIGHT = 64;
export const LIST_ICON_MIN_WIDTH = 30;
export const INITIAL_EDITING_PROPS = {
  open: false,
  id: '',
  body: '',
};

export const EXPORT_CSV_HEADERS = [
  { label: 'message_id', key: 'id' },
  { label: 'item_id', key: 'chatId' },
  { label: 'created_at', key: 'createdAt' },
  { label: 'updated_at', key: 'updatedAt' },
  { label: 'creator_id', key: 'creator' },
  { label: 'creator_name', key: 'creatorName' },
  { label: 'message_content', key: 'body' },
];
