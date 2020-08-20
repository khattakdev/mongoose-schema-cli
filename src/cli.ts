import arg from "arg";
import inquirer from "inquirer";
import createSchema from "./main";
import { promptForMissingOptions, promptForSchemaObject } from "./prompts";
import * as dataType from "./types";

/**
 * Run the main program
 * @param args User Arguments
 *
 */
async function cli(args: string[]) {
  let options: dataType.OptionsType = parseArgumentsIntoOptions(args);
  let missingOptions: dataType.MissingOptionsType = await promptForMissingOptions(
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

  let schema = { ...missingOptions };
  await createSchema(schema, schemaKeyValues);
}

/**
 * Take Raw Arguments from user, filter them and convert them into an Object
 * @param rawArgs Raw Arguments
 */
function parseArgumentsIntoOptions(rawArgs: any[]) {
  try {
    const args = arg(
      {
        "--folder": String,
        // Aliases
        "--ts": "--typescript",
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      folderName: args["--folder"] || "",
    };
  } catch (err) {
    if (err.code === "ARG_UNKNOWN_OPTION") {
      console.log(err.message);
      process.exit(1);
    }
    return {
      folderName: "",
    };
  }
}

export default cli;
