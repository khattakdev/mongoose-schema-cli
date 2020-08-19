export type OptionsType = {
  isTypescript: boolean;
  filePath?: string;
};

export type MissingOptionsType = {
  isTypescript: boolean;
  schema: string;
  //   filePath?: string;
  //   schemaKeys?: number;
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
