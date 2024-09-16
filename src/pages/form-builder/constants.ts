import { v4 as uuid } from 'uuid';

export const ITEMS = [
  {
    id: uuid(),
    content: 'Text Field',
  },
  {
    id: uuid(),
    content: 'Email',
  },
  {
    id: uuid(),
    content: 'File',
  },
  {
    id: uuid(),
    content: 'Radio',
  },
  {
    id: uuid(),
    content: 'Select',
  },
  {
    id: uuid(),
    content: 'Checkbox',
  },
  {
    id: uuid(),
    content: 'Button',
  },
  {
    id: uuid(),
    content: 'Number',
  },
  {
    id: uuid(),
    content: 'Textarea',
  },
] as const;
