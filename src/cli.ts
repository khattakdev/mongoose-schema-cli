// const arg = require("arg");
import arg from "arg";
// import inquirer from 'inquirer';
// import schema from
const inquirer = require("inquirer");
const schema = require("./main");

function parseArgumentsIntoOptions(rawArgs: any[]) {
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
  schemaKeys?: number | 0;
};

async function promptForMissingOptions(options: optionsType) {
  const defaultOptions = {
    language: "Javascript",
    schema: "default",
  };
  // if (options.skipPrompts) {
  //   return {
  //     ...options,
  //     template: options.template || defaultLanguage,
  //   };
  // }

  const questions: object[] = [];
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
    // mongoose: options.mongoose || answers.mongoose,
    schema: answers.schema,
  };
}

async function promptForSchemaObject() {
  console.log();
  const defaultOptions = {
    name: "default",
    type: "String",
    required: true,
    default: "",
  };
  const questions = [];

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

  const answers = await inquirer.prompt(questions);

  return {
    schemaName: answers.name,
    type: answers.type,
    isRequired: answers.required,
    defaultValue: answers.default,
  };
}

async function cli(args: string[]) {
  var options: optionsType = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  /*
  language: any
  schema: any,
  filePath: string | undefined
  schemaKeys?: number | undefined

  */
  const { schemaKeys } = await inquirer.prompt({
    type: "input",
    name: "schemaKeys",
    message: "How many key this Schema has?",
    default: 0,
  });

  // Get Schema Keys' Input
  const schemaKeyValues = [];
  for (let i = 0; i < schemaKeys; i++) {
    const objectValues = await promptForSchemaObject();
    schemaKeyValues.push(objectValues);
  }

  options = {
    ...options,
    schemaKeys,
  };

  await schema(options, schemaKeyValues);
}

module.exports = cli;
