import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

interface AddTemplateProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (value: string) => void;
}

export const AddTemplate = ({ open, handleClose, onSubmit }: AddTemplateProps) => {
  const [template, setTemplate] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(template);
    setTemplate('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Add Template</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} marginBottom={2} sx={{ py: 1 }}>
          <TextField
            label='Name'
            variant='outlined'
            value={template}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemplate(e.target.value)}
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
