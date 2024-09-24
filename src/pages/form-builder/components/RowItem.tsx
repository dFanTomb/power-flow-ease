import { forwardRef, useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';
import { Unstable_NumberInput as BaseNumberInput, NumberInputProps } from '@mui/base/Unstable_NumberInput';
import { RowItemType } from '../types';
import { StyledButton, StyledInputElement, StyledInputRoot } from './styled-components';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

interface RowItemProps {
  item: RowItemType;
  handleProps: DraggableProvidedDragHandleProps | null;
}

export const RowItem = ({ item, handleProps }: RowItemProps) => {
  const [name, setName] = useState('Text Field');
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const NumberInput = forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInputElement,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: '▴',
          },
          decrementButton: {
            children: '▾',
          },
        }}
        {...props}
        ref={ref}
      />
    );
  });

  const [value, setValue] = useState<number | null>(null);

  const renderItem = (item: RowItemType) => {
    switch (item.content) {
      case 'Text Field':
        return (
          <FormControl>
            <TextField
              type='text'
              id='text-field'
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </FormControl>
        );
      case 'Email':
        return (
          <FormControl>
            <TextField label='Email' id='email' fullWidth />
          </FormControl>
        );
      case 'File':
        return (
          <FormControl fullWidth>
            <TextField
              id='file'
              type='file'
              label='File'
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: { display: 'flex', alignItems: 'center' } }}
              sx={{
                '& input[type="file"]': {
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  '&::file-selector-button': {
                    marginRight: '8px',
                  },
                },
              }}
            />
          </FormControl>
        );
      case 'Radio':
        return (
          <FormControl>
            <RadioGroup row id='radio-group'>
              <Radio checked={selectedValue === 'a'} onChange={handleChange} value='a' name='radio-buttons' />
              <Radio checked={selectedValue === 'b'} onChange={handleChange} value='b' name='radio-buttons' />
            </RadioGroup>
          </FormControl>
        );
      case 'Select':
        return (
          <FormControl sx={{ display: 'flex' }}>
            <InputLabel id='select-label'>Select</InputLabel>
            <Select labelId='select-label' id='select' value={value} label='Select' variant={'outlined'}>
              <MenuItem value={'1'}>Option one</MenuItem>
              <MenuItem value={'2'}>Option two</MenuItem>
              <MenuItem value={'3'}>Option three</MenuItem>
              <MenuItem value={'4'}>Option four</MenuItem>
            </Select>
          </FormControl>
        );
      case 'Checkbox':
        return (
          <FormControl>
            <Checkbox inputProps={{ 'aria-label': 'checkbox' }} id='checkbox' />
          </FormControl>
        );
      case 'Button':
        return (
          <Button
            fullWidth
            variant='outlined'
            id='button'
            {...handleProps}
            onClick={(e) => {
              console.log('handleProps', handleProps);
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Button
          </Button>
        );
      case 'Number':
        return (
          <NumberInput
            aria-label='number-input'
            placeholder='Type a number…'
            id='number-input'
            value={value}
            onChange={(_event, val) => setValue(val)}
          />
        );
      case 'Textarea':
        return (
          <FormControl sx={{ display: 'flex' }}>
            <TextField label='Textarea' type='text' id='text-area' multiline fullWidth />
          </FormControl>
        );
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
