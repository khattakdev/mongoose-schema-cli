export type OptionsType = {
  folderName?: string;
};

export type MissingOptionsType = {
  schema: string;
  folderName: string;
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
