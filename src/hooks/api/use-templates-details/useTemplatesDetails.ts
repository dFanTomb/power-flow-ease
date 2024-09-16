import { useSuspenseQuery } from '@tanstack/react-query';
import templatesDetails from '../../../mocks/templates/templates-details.json';
import { TemplatesDetailsType } from './types';

export const useTemplatesDetails = (): TemplatesDetailsType => {
  return useSuspenseQuery({ queryKey: ['template-details'], queryFn: () => templatesDetails });
};
