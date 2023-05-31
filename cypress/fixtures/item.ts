import { Item, ItemType } from '@graasp/sdk';

import { CURRENT_MEMBER } from './members';

export const MOCK_ITEM: Item = {
  id: 'some-id',
  name: 'my mock item',
  description: 'a description',
  path: 'some-id',
  settings: {},
  creator: CURRENT_MEMBER,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: ItemType.FOLDER,
  extra: {},
};
