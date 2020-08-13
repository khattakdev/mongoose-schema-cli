const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const Listr = require("listr");
const schema = require("../template");

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

export async function createSchema(options, schemaKeyValues) {
  const schemaOptions = {
    ...options,
    dirPath: path.resolve(__dirname, "../template"),
    outPath: path.resolve(__dirname, "../out", `./${options.schema}.js`),
  };

  console.log();

  // initializeSchema(schemaOptions.outPath);
  // await createObjects(schemaOptions.outPath, schemaKeyValues);
  // exportSchema(schemaOptions.outPath, schema.schemaBottom());

  const tasks = new Listr([
    {
      title: "Creating File and Adding Imports",
      task: () => initializeSchema(schemaOptions.outPath),
    },
    {
      title: "Adding Schema Keys",
      task: async () =>
        await createObjects(schemaOptions.outPath, schemaKeyValues),
    },
    {
      title: "Making Schema Exportable",
      task: () => exportSchema(schemaOptions.outPath, schema.schemaBottom()),
    },
  ]);

  await tasks.run();

  // Append Objects to the Schema

  // Close the Schema and Add Export

  // await appendFile(schemaOptions.out, schema.schemaBottom(true));
}

async function initializeSchema(outPath) {
  await writeFile(outPath, schema.schemaTop());
}

async function createObjects(outPath, schemaKeyValues) {
  for (let i = 0; i < schemaKeyValues.length; i++) {
    await appendFile(outPath, schema.createSchemaObject(schemaKeyValues[i]));
  }
}

async function exportSchema(outPath) {
  await appendFile(outPath, schema.schemaBottom());
}
