import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { AddFormProps } from '../../types';

export const AddForm = ({ open, handleClose, onSubmit }: AddFormProps) => {
  const [form, setForm] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (form === '') {
      setError(true);
    } else {
      onSubmit(form);
      setForm('');
      setError(false);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Add Form</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} marginBottom={2} sx={{ py: 1 }}>
          <TextField
            label='Name'
            variant='outlined'
            value={form}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm(e.target.value);
              if (error) setError(false);
            }}
            error={error}
            helperText={error ? 'Name is required' : ''}
            sx={{ flexGrow: 1 }}
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
