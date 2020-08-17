import path from "path";
import fs from "fs";
import { promisify } from "util";
import Listr from "listr";
import { createSchemaObject, schemaTop, schemaBottom } from "../template";

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

type schemaKeyValueType = {
  name: string;
  type: string;
  isRequired: boolean;
  defaultValue: string;
};

async function createSchema(
  schema: string,
  schemaKeyValues: schemaKeyValueType[]
) {
  const schemaOptions = {
    // ...options,
    dirPath: path.resolve(__dirname, "../template"),
    outPath: path.resolve(process.cwd(), `./${schema}.js`),
  };

  console.log();

  const tasks = new Listr([
    {
      title: "Creating Schema",
      task: async () =>
        await createObjects(schemaOptions.outPath, schemaKeyValues),
    },
  ]);

  await tasks.run();
  console.log("DONE! Schema Generated");
}

async function createObjects(
  outPath: string,
  schemaKeyValues: schemaKeyValueType[]
) {
  await writeFile(outPath, schemaTop());
  for (let i = 0; i < schemaKeyValues.length; i++) {
    await appendFile(outPath, createSchemaObject(schemaKeyValues[i]));
  }
  await appendFile(outPath, schemaBottom());
}

export default createSchema;
