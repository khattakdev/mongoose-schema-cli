import inquirer from "inquirer";
import { OptionsType, QuestionType } from "./types";
/**
 * Ask for schema related data e.g. Schema's Name
 * @param options Filtered Arguments provided by User
 */
export async function promptForMissingOptions(options: OptionsType) {
  const defaultOptions = {
    schema: "default",
    folderName: options.folderName ? options.folderName : "models",
  };

  const questions: QuestionType[] = [];

  questions.push({
    type: "input",
    name: "schema",
    message: "Please input Schema name",
    default: defaultOptions.schema,
  });

  if (!options.folderName) {
    questions.push({
      type: "input",
      name: "folderName",
      message: "Please input Folder Name",
      default: defaultOptions.folderName,
    });
  }

  const answers: {
    schema: string;
    folderName: string;
  } = await inquirer.prompt(questions);
  return {
    ...options,
    schema: answers.schema,
    folderName: answers.folderName || defaultOptions.folderName,
  };
}

/**
 * Take User Input for Schema's Key
 *
 * This include data such as
 * Schema Key's name, type, default Value etc
 */
export async function promptForSchemaObject() {
  const defaultOptions = {
    name: "default",
    type: "String",
    required: true,
    default: "",
  };
  const questions: QuestionType[] = [];

  questions.push({
    type: "input",
    name: "name",
    message: "Please input Schema Key name",
    default: defaultOptions.name,
  });

  questions.push({
    type: "list",
    name: "type",
    message: "Please input Schema Key type",
    choices: ["String", "Number", "Boolean"],
    default: defaultOptions.name,
  });

  questions.push({
    type: "confirm",
    name: "required",
    message: "Is this Schema Key Required",
    default: defaultOptions.required,
  });

  questions.push({
    type: "input",
    name: "default",
    message: "What is the default value?",
    default: defaultOptions.default,
  });

  const answers: {
    name: string;
    type: string;
    required: boolean;
    default: string;
  } = await inquirer.prompt(questions);

  return {
    name: answers.name,
    type: answers.type,
    isRequired: answers.required,
    defaultValue: answers.default,
  };
}
