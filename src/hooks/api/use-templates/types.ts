import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { Descendant } from 'slate';

export interface Template {
  title: string;
  company: string;
  location: string;
  description: Descendant[];
  requirements: string[];
  salary: string;
  tags: string[];
}

interface TemplatesResponse {
  templates: Template[];
  totalPages: number;
  totalItems: number;
  page: number;
}

export type TemplatesType = UseSuspenseQueryResult<TemplatesResponse>;
