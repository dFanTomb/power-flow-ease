import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { RowItemType } from '../types';

interface RowItemProps {
  item: RowItemType;
  handleProps: any;
}

export const RowItem = ({ item, handleProps }: RowItemProps) => {
  const renderItem = (item: RowItemType) => {
    switch (item.content) {
      case 'Text Field':
        return <TextField label='Text Field' type='text' fullWidth />;
      case 'Email':
        return <TextField label='Email' type='email' fullWidth />;
      case 'File':
        return <TextField label='File' type='file' fullWidth />;
      case 'Radio':
        return <TextField label='Radio' type='radio' fullWidth />;
      case 'Select':
        return (
          <FormControl>
            <InputLabel id='select-label'>Select</InputLabel>
            <Select labelId='select-label' id='select' value={'1'} label='Select' variant={'outlined'}>
              <MenuItem value={'1'}>Option one</MenuItem>
              <MenuItem value={'2'}>Option two</MenuItem>
              <MenuItem value={'3'}>Option three</MenuItem>
              <MenuItem value={'4'}>Option four</MenuItem>
            </Select>
          </FormControl>
        );
      case 'Checkbox':
        return <TextField label='Checkbox' type='checkbox' fullWidth />;
      case 'Button':
        return (
          <Button
            variant='outlined'
            fullWidth
            {...handleProps}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Button
          </Button>
        );
      case 'Number':
        return <TextField label='Number' type='number' fullWidth />;
      case 'Textarea':
        return <TextField label='Textarea' type='text' multiline fullWidth />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid grey' }} {...handleProps}>
      {renderItem(item)}
    </div>
  );
};
