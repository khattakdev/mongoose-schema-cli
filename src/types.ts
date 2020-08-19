export type OptionsType = {
  language: boolean;
  filePath?: string;
};

export type MissingOptionsType = {
  language: any;
  schema: any;
  filePath?: string;
  schemaKeys?: number;
};

export type QuestionType = {
  type: string;
  name: string;
  message: string;
  default: string | boolean | number;
  choices?: string[] | number[];
};

export type SchemaKeyValuesType = {
  name: string;
  type: string;
  isRequired: boolean;
  defaultValue: string;
};
