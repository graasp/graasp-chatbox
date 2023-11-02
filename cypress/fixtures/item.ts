import { DiscriminatedItem,  ItemType } from '@graasp/sdk';

import { CURRENT_MEMBER } from './members';

export const MOCK_ITEM: DiscriminatedItem = {
  id: 'some-id',
  name: 'my mock item',
  description: 'a description',
  path: 'some-id',
  settings: {},
  creator: CURRENT_MEMBER,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: ItemType.FOLDER,
  extra: {
    folder:{childrenOrder:[]}
  },
};
