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
  console.log("<--------------------------------->");
  console.log("Creating File for Dynamic Values");

  await writeFile(schemaOptions.outPath, schema.schemaTop());
  for (let i = 0; i < options.schemaKeys; i++) {
    await appendFile(
      schemaOptions.outPath,
      schema.createSchemaObject(schemaKeyValues[i])
    );
  }
  await appendFile(schemaOptions.outPath, schema.schemaBottom());

  // const tasks = new Listr([
  //   {
  //     title: "Creating File and Adding Imports",
  //     task: () => initializeSchema(schemaOptions.outPath, schema.schemaTop),
  //   },
  //   {
  //     title: "Adding Schema Keys",
  //     task: () =>
  //       createSchemaObjects(schemaOptions.out, schema.schemaBottom(true)),
  //   },
  //   // {
  //   //   title: "Making Schema Exportable",
  //   //   task: () => exportSchema(),
  //   // },
  // ]);

  // await tasks.run();

  // Append Objects to the Schema

  // Close the Schema and Add Export

  // await appendFile(schemaOptions.out, schema.schemaBottom(true));
}

async function initializeSchema(outPath, content) {
  await writeFile(outPath, content);
}

async function createSchemaObjects(outPath, content) {
  await appendFile(outPath, content);
  // promptForSchemaObject;
  // await appendFile(
  //   schemaOptions.out,
  //   schema.createSchemaObject({
  //     schemaName: "users",
  //     type: "String",
  //     isRequired: true,
  //     isDefault: "Arsalan",
  //   })
  // );
}

async function exportSchema() {
  await appendFile(schemaOptions.out, schema.schemaBottom(true));
}
