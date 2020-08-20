import path from "path";
import fs from "fs";
import { promisify } from "util";
import Listr from "listr";
import { createSchemaObject, schemaTop, schemaBottom } from "../template";

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const createFolder = promisify(fs.mkdir);
const doesFolderExist = promisify(fs.exists);

type schemaKeyValueType = {
  name: string;
  type: string;
  isRequired: boolean;
  defaultValue: string;
};

async function createSchema(
  schemaObj: {
    folderName: string;
    schema: string;
  },
  schemaKeyValues: schemaKeyValueType[]
) {
  const schemaOptions = {
    dirPath: path.resolve(__dirname, "../template"),
    outPath: path.normalize(
      path.resolve(
        process.cwd(),
        `./${schemaObj.folderName}`,
        `./${schemaObj.schema}.js`
      )
    ),
  };

  // Create a Folder, if doesn't exist
  if (!(await doesFolderExist(schemaObj.folderName))) {
    createFolder(schemaObj.folderName);
  }
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
