import * as yup from 'yup';

export enum TemplatesFormFieldsNames {
  title = 'title',
  company = 'company',
  location = 'location',
  description = 'description',
  requirements = 'requirements',
  salary = 'salary',
}

export const templatesFormSchema = yup.object({
  [TemplatesFormFieldsNames.title]: yup.string().required(),
  [TemplatesFormFieldsNames.company]: yup.string().required(),
  [TemplatesFormFieldsNames.location]: yup.string().required(),
  [TemplatesFormFieldsNames.description]: yup.array().required(),
  [TemplatesFormFieldsNames.requirements]: yup.array().of(yup.string().min(2)).required(),
  [TemplatesFormFieldsNames.salary]: yup.string().required(),
});

export type TemplatesFormSchema = yup.InferType<typeof templatesFormSchema>;
