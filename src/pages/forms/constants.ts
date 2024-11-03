export const ITEMS = {
  'item-1': {
    id: 'item-1',
    content: 'Text Field',
  },
  'item-2': {
    id: 'item-2',
    content: 'Email',
  },
  'item-3': {
    id: 'item-3',
    content: 'File',
  },
  'item-4': {
    id: 'item-4',
    content: 'Radio',
  },
  'item-5': {
    id: 'item-5',
    content: 'Select',
  },
  'item-6': {
    id: 'item-6',
    content: 'Checkbox',
  },
  'item-7': {
    id: 'item-7',
    content: 'Button',
  },
  'item-8': {
    id: 'item-8',
    content: 'Number',
  },
  'item-9': {
    id: 'item-9',
    content: 'Textarea',
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
