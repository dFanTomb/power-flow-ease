import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form } from '../../pages/forms/types';

type InitialState = {
  forms: Form[];
};

const initialState: InitialState = {
  forms: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Form>) => {
      return { ...state, forms: [...state.forms, action.payload] };
    },
  },
});

export const { addForm } = formSlice.actions;
export const { reducer: formReducer } = formSlice;
