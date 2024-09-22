import { styled } from '@mui/material/styles';

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
  padding: '0.5rem 0.5rem 0',
  borderRadius: '3px',
  fontFamily: 'sans-serif',
  margin: '0.5rem 0.5rem 1.5rem',
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
