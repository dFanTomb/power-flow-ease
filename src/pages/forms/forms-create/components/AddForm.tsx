import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { AddFormProps } from '../../types';

export const AddForm = ({ open, handleClose, onSubmit, errorMessage }: AddFormProps) => {
  const [formName, setFormName] = useState('');

  const handleSubmit = () => {
    onSubmit(formName);
    setFormName('');
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Add Form</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} marginBottom={2} sx={{ py: 1 }}>
          <TextField
            label='Name'
            variant='outlined'
            value={formName}
            onChange={(e) => {
              setFormName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            error={!!errorMessage}
            helperText={errorMessage}
            sx={{ flexGrow: 1 }}
            size='medium'
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant={'contained'} color={'primary'} onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
