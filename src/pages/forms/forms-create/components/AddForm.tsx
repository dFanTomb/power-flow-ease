import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

interface AddFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (value: string) => void;
}

export const AddForm = ({ open, handleClose, onSubmit }: AddFormProps) => {
  const [form, setForm] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(form);
    setForm('');
    handleClose();
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(e.target.value)}
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
