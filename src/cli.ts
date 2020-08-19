import arg from "arg";
import inquirer from "inquirer";
import createSchema from "./main";
import * as dataType from "./types";

/**
 * Run the main program
 * @param args User Arguments
 *
 */
async function cli(args: string[]) {
  var options: dataType.OptionsType = parseArgumentsIntoOptions(args);
  var missingOptions: dataType.MissingOptionsType = await promptForMissingOptions(
    options
  );

  const { schemaKeys } = await inquirer.prompt({
    type: "input",
    name: "schemaKeys",
    message: "How many key this Schema has?",
    default: 0,
  });

  const schemaKeyValues: dataType.SchemaKeyValuesType[] = [];
  for (let i = 0; i < schemaKeys; i++) {
    const objectValues = await promptForSchemaObject();
    schemaKeyValues.push(objectValues);
  }

  var schema = missingOptions.schema;
  await createSchema(schema, schemaKeyValues);
}

/**
 * Take Raw Arguments from user and filter them
 * @param rawArgs Raw Arguments
 */
function parseArgumentsIntoOptions(
  rawArgs: any[]
): {
  language: boolean;
  filePath: string;
} {
  const args = arg(
    {
      "--typescript": Boolean,
      "--filepath": String,
      // Aliases
      "-t": "--typescript",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    language: args["--typescript"] || false,
    filePath: args["--filepath"] || "/",
  };
}

/**
 * Ask for schema related data e.g. Schema's Name
 * @param options Filtered Arguments provided by User
 */
async function promptForMissingOptions(
  options: dataType.OptionsType
): Promise<{
  language: string;
  schema: string;
  filePath?: string;
  schemaKeys?: number;
}> {
  const defaultOptions = {
    language: "Javascript",
    schema: "default",
  };

  const questions: dataType.QuestionType[] = [];
  //@TODO: Temporary Disabled, Uncomment after adding Typescript Schema
  // if (!options.language) {
  //   questions.push({
  //     type: "list",
  //     name: "language",
  //     message: "Please choose which language Schema to use",
  //     choices: ["JavaScript", "TypeScript"],
  //     default: defaultOptions.language,
  //   });
  // }

  questions.push({
    type: "input",
    name: "schema",
    message: "Please input Schema name",
    default: defaultOptions.schema,
  });

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    language: options.language || answers.language,
    schema: answers.schema,
  };
}

/**
 * Take User Input for Schema's Key
 *
 * This include data such as
 * Schema Key's name, type, default Value etc
 */
async function promptForSchemaObject() {
  const defaultOptions = {
    name: "default",
    type: "String",
    required: true,
    default: "",
  };
  const questions: dataType.QuestionType[] = [];

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

export default cli;
