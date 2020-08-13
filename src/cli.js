import arg from "arg";
import inquirer from "inquirer";
import createSchema from "./createSchema";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--typescript": Boolean,
      "--mongoose": Boolean,
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
    language: args["--typescript"] || undefined,
    mongoose: args["--mongoose"] || false,
    filePath: args["--filepath"] || "/",
  };
}

async function promptForMissingOptions(options) {
  // Select these if user don't input
  const defaultChoices = {
    language: "Javascript",
    mongoose: false,
    schema: "default",
  };
  // if (options.skipPrompts) {
  //   return {
  //     ...options,
  //     template: options.template || defaultLanguage,
  //   };
  // }

  const questions = [];
  if (!options.language) {
    questions.push({
      type: "list",
      name: "language",
      message: "Please choose which language Schema to use",
      choices: ["JavaScript", "TypeScript"],
      default: defaultChoices.language,
    });
  }

  if (!options.mongoose) {
    questions.push({
      type: "confirm",
      name: "mongoose",
      message: "Do you want to have it in mongoose?",
      default: defaultChoices.mongoose,
    });
  }

  questions.push({
    type: "input",
    name: "schema",
    message: "Please input Schema name",
    default: defaultChoices.schema,
  });

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    language: options.language || answers.language,
    mongoose: options.mongoose || answers.mongoose,
    schema: answers.schema,
  };
}

export async function cli(args) {
  var options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  // console.log(options);
  await createSchema(options);
  console.log("Schema Created");
}
