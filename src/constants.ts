import { SuggestionDataItem } from 'react-mentions';

import { PartialMemberDisplay } from './types.js';

export const SCROLL_SAFETY_MARGIN = 64;
export const CONTAINER_HEIGHT_SAFETY_MARGIN = 16;
export const DEFAULT_USER_NAME = 'Anonymous';
export const UNKNOWN_USER_NAME = 'Unknown';
export const MAX_USERNAME_LENGTH = 30;
export const HARD_MAX_MESSAGE_LENGTH = 400;
export const DEFAULT_DATE_FORMAT = 'dd MMMM yyyy';
export const LIST_ICON_MIN_WIDTH = 30;
export const MAX_AVATAR_SIZE = 30;
export const INITIAL_EDITING_PROPS = {
  open: false,
  id: '',
  body: '',
};

export const GRAASP_MENTION_COLOR = '#b9b9ed';

export const SIDE_PANE_WIDTH = 290;
export const SIDE_PANE_HEIGHT = 800;

export const ICON_VARIANT = 'icon';
export const BUTTON_VARIANT = 'button';

export const ALL_MEMBERS_ID = '00000000-0000-4000-8000-000000000000';
export const ALL_MEMBERS_DISPLAY = 'all';
export const ALL_MEMBERS_SUGGESTION: SuggestionDataItem = {
  id: ALL_MEMBERS_ID,
  display: ALL_MEMBERS_DISPLAY,
};
export const ALL_MEMBERS_MEMBER: PartialMemberDisplay = {
  id: ALL_MEMBERS_ID,
  name: ALL_MEMBERS_DISPLAY,
};
