import {
  TextFields,
  Email,
  AttachFile,
  RadioButtonChecked,
  SelectAll,
  CheckBox,
  Circle,
  FormatBold,
  TextSnippet,
  QuestionMark,
} from '@mui/icons-material';

export const IconResolver = (iconName: string) => {
  switch (iconName) {
    case 'Text Field':
      return <TextFields />;
    case 'Email':
      return <Email />;
    case 'File':
      return <AttachFile />;
    case 'Radio':
      return <RadioButtonChecked />;
    case 'Select':
      return <SelectAll />;
    case 'Checkbox':
      return <CheckBox />;
    case 'Button':
      return <Circle />;
    case 'Number':
      return <FormatBold />;
    case 'Textarea':
      return <TextSnippet />;

    default:
      return <QuestionMark />;
  }
};
