import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Form } from '../../pages/forms/types';

type InitialState = {
  currentFormId: string;
  forms: Form[];
};

const initialState: InitialState = {
  currentFormId: '',
  forms: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Form>) => {
      return { ...state, forms: [...state.forms, action.payload] };
    },
    editForm: (state, action: PayloadAction<Form>) => {
      const formIndex = state.forms.findIndex((form) => form.id === action.payload.id);
      state.forms[formIndex] = action.payload;
    },
    addCurrentFormId: (state, action: PayloadAction<string>) => {
      return { ...state, currentFormId: action.payload };
    },
  },
});

export const selectCurrentForm = createSelector(
  (state: { form: InitialState }) => state.form.forms,
  (state: { form: InitialState }) => state.form.currentFormId,
  (forms, currentFormId) => forms.find((form) => form.id === currentFormId),
);

export const { addForm, addCurrentFormId, editForm } = formSlice.actions;
export const { reducer: formReducer } = formSlice;
