import { useSuspenseQuery } from '@tanstack/react-query';
import templates from '../../../mocks/templates/templates.json';
import { TemplatesType } from './types';

export const useTemplates = (): TemplatesType => {
  return useSuspenseQuery({ queryKey: ['templates'], queryFn: () => templates });
};
