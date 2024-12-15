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
  FormGroup,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Unstable_NumberInput as BaseNumberInput, NumberInputProps } from '@mui/base/Unstable_NumberInput';
import { RowItemType, RowItemProps } from '../../types';
import { Handle, StyledButton, StyledInputElement, StyledInputRoot, RowContent } from './styled-components';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

export const RowItem = ({ item, handleProps, isDragging }: RowItemProps) => {
  const [name, setName] = useState<string>('');
  const [radioValue, setRadioValue] = useState<string>('a');
  const [numberValue, setNumberValue] = useState<number | null>(null);
  const [selectValue, setSelectValue] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
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

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const renderItem = (item: RowItemType) => {
    switch (item.content) {
      case 'Text Field':
        return (
          <FormControl fullWidth>
            <TextField
              type='text'
              id='text-field'
              label='Text Field'
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </FormControl>
        );
      case 'Email':
        return (
          <FormControl fullWidth>
            <TextField label='Email' id='email' />
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
          <FormControl fullWidth>
            <RadioGroup
              row
              id='radio-group'
              value={radioValue}
              onChange={handleChangeRadio}
              sx={{ padding: '5px 10px' }}
            >
              <FormControlLabel value='a' control={<Radio />} label='True' />
              <FormControlLabel value='b' control={<Radio />} label='False' />
            </RadioGroup>
          </FormControl>
        );
      case 'Select':
        return (
          <FormControl fullWidth>
            <InputLabel id='select-label'>Select</InputLabel>
            <Select
              labelId='select-label'
              id='select'
              value={selectValue}
              label='Select'
              onChange={handleChangeSelect}
              variant={'outlined'}
            >
              <MenuItem value={'1'}>Option one</MenuItem>
              <MenuItem value={'2'}>Option two</MenuItem>
              <MenuItem value={'3'}>Option three</MenuItem>
              <MenuItem value={'4'}>Option four</MenuItem>
            </Select>
          </FormControl>
        );

      case 'Checkbox':
        return (
          <FormGroup sx={{ display: 'flex', alignContent: 'center' }}>
            <FormControlLabel
              control={<Checkbox id='checkbox' />}
              label='Checkbox'
              sx={{ marginLeft: '2px', padding: '5px 0' }}
            />
          </FormGroup>
        );
      case 'Button':
        return (
          <Button
            fullWidth
            variant='outlined'
            id='button'
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
        return (
          <NumberInput
            aria-label='number-input'
            placeholder='Type a number…'
            id='number-input'
            value={numberValue}
            onChange={(_event, val) => setNumberValue(val)}
          />
        );
      case 'Textarea':
        return (
          <FormControl sx={{ display: 'flex' }} fullWidth>
            <TextField label='Textarea' type='text' id='text-area' multiline />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <RowContent
      {...handleProps}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {(isHovered || isDragging) && (
        <Handle {...handleProps}>
          <DragIndicatorOutlinedIcon
            sx={{
              fontSize: '36px',
              margin: '0 auto',
              color: 'gray',
              height: '53px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px lightgray',
            }}
          />
        </Handle>
      )}
      {renderItem(item)}
    </RowContent>
  );
};
