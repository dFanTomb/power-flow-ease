import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, Paper, Stack, TextField } from '@mui/material';
import { FieldErrorText } from '../../../components/field-error-text/FieldErrorText.tsx';
import { SlateEditor } from '../../../components/slate-editor/SlateEditor.tsx';
import { TemplatesFormSchema, TemplatesFormFieldsNames, templatesFormSchema } from './formSchema.ts';

interface TemplatesFormProps {
  defaultValues?: TemplatesFormSchema;
  formRef?: React.MutableRefObject<HTMLFormElement | null>;
  onSubmit: (data: TemplatesFormSchema) => void;
}

export const TemplatesForm = ({ defaultValues, formRef, onSubmit }: TemplatesFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TemplatesFormSchema>({
    resolver: yupResolver(templatesFormSchema),
    defaultValues,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ padding: 4 }}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <TextField label={'Title'} {...register(TemplatesFormFieldsNames.title)} />
            {errors.title && <FieldErrorText>{errors.title.message}</FieldErrorText>}
          </FormControl>
          <FormControl fullWidth>
            <TextField label={'Company'} {...register(TemplatesFormFieldsNames.company)} />
            {errors.company && <FieldErrorText>{errors.company.message}</FieldErrorText>}
          </FormControl>
          <FormControl fullWidth>
            <TextField label={'Location'} {...register(TemplatesFormFieldsNames.location)} />
            {errors.location && <FieldErrorText>{errors.location.message}</FieldErrorText>}
          </FormControl>
          <Controller
            render={({ fieldState, field }) => (
              <>
                <SlateEditor onChange={field.onChange} placeholder={'Description'} />
                {fieldState.error && <FieldErrorText>{fieldState.error.message}</FieldErrorText>}
              </>
            )}
            name={TemplatesFormFieldsNames.description}
            control={control}
          />
          <FormControl fullWidth>
            <TextField label={'Requirements'} {...register(TemplatesFormFieldsNames.requirements)} />
            {errors.requirements && <FieldErrorText>{errors.requirements.message}</FieldErrorText>}
          </FormControl>
          <FormControl fullWidth>
            <TextField label={'Salary'} {...register(TemplatesFormFieldsNames.salary)} />
            {errors.salary && <FieldErrorText>{errors.salary.message}</FieldErrorText>}
          </FormControl>
        </Stack>
      </Paper>
    </form>
  );
};
