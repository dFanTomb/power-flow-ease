export const ITEMS = {
  'item-1': {
    id: 'item-1',
    content: 'Text Field',
    index: 0,
  },
  'item-2': {
    id: 'item-2',
    content: 'Email',
    index: 1,
  },
  'item-3': {
    id: 'item-3',
    content: 'File',
    index: 2,
  },
  'item-4': {
    id: 'item-4',
    content: 'Radio',
    index: 3,
  },
  'item-5': {
    id: 'item-5',
    content: 'Select',
    index: 4,
  },
  'item-6': {
    id: 'item-6',
    content: 'Checkbox',
    index: 5,
  },
  'item-7': {
    id: 'item-7',
    content: 'Button',
    index: 6,
  },
  'item-8': {
    id: 'item-8',
    content: 'Number',
    index: 7,
  },
  'item-9': {
    id: 'item-9',
    content: 'Textarea',
    index: 8,
  },
};

export const ROWS = {
  'row-1': { id: 'row-1', items: [] },
};

const ROW_ORDER = ['row-1'];

export const INITIAL_ITEM_DATA = {
  items: ITEMS,
  rows: ROWS,
  rowOrder: ROW_ORDER,
};
