import arg from "arg";
import inquirer from "inquirer";
import createSchema from "./main";

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
      "-m": "--mongoose",
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

type optionsType = {
  language: boolean;
  filePath?: string;
};

type missingOptionsType = {
  language: any;
  schema: any;
  filePath?: string;
  schemaKeys?: number;
};

type questionType = {
  type: string;
  name: string;
  message: string;
  default: string | boolean | number;
  choices?: string[] | number[];
};

async function promptForMissingOptions(
  options: optionsType
): Promise<{
  language: any;
  schema: any;
  filePath?: string | undefined;
  schemaKeys?: number | undefined;
}> {
  const defaultOptions = {
    language: "Javascript",
    schema: "default",
  };

  const questions: questionType[] = [];
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

async function promptForSchemaObject() {
  const defaultOptions = {
    name: "default",
    type: "String",
    required: true,
    default: "",
  };
  const questions: questionType[] = [];

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

async function cli(args: string[]) {
  var options: optionsType = parseArgumentsIntoOptions(args);
  var missingOptions: missingOptionsType = await promptForMissingOptions(
    options
  );

  const { schemaKeys } = await inquirer.prompt({
    type: "input",
    name: "schemaKeys",
    message: "How many key this Schema has?",
    default: 0,
  });

  const schemaKeyValues: {
    name: string;
    type: string;
    isRequired: boolean;
    defaultValue: string;
  }[] = [];
  for (let i = 0; i < schemaKeys; i++) {
    const objectValues = await promptForSchemaObject();
    schemaKeyValues.push(objectValues);
  }

  var schema = missingOptions.schema;
  await createSchema(schema, schemaKeyValues);
}

export default cli;
