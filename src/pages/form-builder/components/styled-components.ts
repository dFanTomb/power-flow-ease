import { styled } from '@mui/material/styles';
import { numberInputClasses } from '@mui/base/Unstable_NumberInput';
import { grey } from '@mui/material/colors';

export const Content = styled('div')(() => ({
  marginRight: '200px',
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  columnGap: '20px',
}));

export const Item = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isdragging',
})<{ isdragging: boolean }>(({ isdragging }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  userSelect: 'none',
  padding: '0.5rem',
  margin: '2px 0',
  // lineHeight: 1.5,
  borderRadius: '3px',
  background: '#fff',
  border: `1px ${isdragging ? 'dashed #000' : 'solid #ddd'}`,
}));

export const Clone = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'isdragging',
})(() => ({
  '~ div': {
    transform: 'none !important',
  },
}));

export const Handle = styled('div')(() => ({
  display: 'flex',
  // alignItems: 'center',
  alignContent: 'center',
  userSelect: 'none',
  margin: '-0.5rem 0.5rem -0.5rem -0.5rem',
  padding: '0.5rem',
  lineHeight: 1.5,
  borderRadius: '3px 0 0 3px',
  background: '#fff',
  borderRight: '1px solid #ddd',
  color: '#000',
}));

export const List = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isdraggingover',
})<{ isdraggingover?: boolean }>(({ isdraggingover }) => ({
  border: `1px ${isdraggingover ? 'dashed #000' : 'solid #ddd'}`,
  background: '#fff',
  padding: '0.5rem 0.5rem 0',
  borderRadius: '3px',
  flex: '0 0 auto',
  fontFamily: 'sans-serif',
}));

export const Kiosk = styled(List)(() => ({
  width: '200px',
  height: 'fit-content',
}));

export const Row = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isdraggingover',
})<{ isdraggingover?: boolean }>(({ isdraggingover }) => ({
  border: `1px ${isdraggingover ? 'dashed #000' : 'solid #ddd'}`,
  // padding: '0.5rem 0.5rem 0',
  borderRadius: '3px',
  fontFamily: 'sans-serif',
  margin: '0.5rem 0.5rem 0.5rem',
  minHeight: '57px',
  height: 'fit-content',
  width: '700px',
  display: 'flex',
  flexDirection: 'row',
  columnGap: '10px',
}));

export const RowItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isdragging',
})<{ isdragging?: boolean }>(({ isdragging }) => ({
  display: 'flex',
  userSelect: 'none',
  padding: '0.5rem',
  margin: '0 0 0.5rem 0',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  lineHeight: 1.5,
  borderRadius: '3px',
  width: '100%',
  background: '#fff',
  border: `1px ${isdragging ? 'dashed #000' : 'solid #ddd'}`,
}));

export const ListContainer = styled(List)(() => ({
  margin: '0.5rem 0.5rem 1.5rem',
  minHeight: '400px',
  height: 'fit-content',
  width: '700px',
}));

export const Notice = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '0.5rem',
  margin: '0 0.5rem 0.5rem',
  border: '1px solid transparent',
  lineHeight: 1.5,
  color: '#aaa',
}));

export const IconButton = styled('div')(() => ({
  paddingRight: '10px',
  color: 'gray',
  '&:hover': {
    color: 'lightgray',
  },
}));

export const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${grey[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? grey[600] : grey[200]};
  }

  &:hover {
    border-color: ${grey[400]};
  }`,
);

export const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;`,
);

export const StyledButton = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    &:hover {
      cursor: pointer;
      background: ${grey[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    &:hover {
      cursor: pointer;
      background: ${grey[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  }
  & .arrow {
    transform: translateY(-1px);
  }`,
);
