const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const Listr = require("listr");
const schema = require("../template");
const chalk = require("chalk");

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

async function createSchema(options, schemaKeyValues) {
  const schemaOptions = {
    ...options,
    dirPath: path.resolve(__dirname, "../template"),
    outPath: path.resolve(process.cwd(), "./models/"`./${options.schema}.js`),
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
  console.log(chalk.green("DONE!"), "Schema Generated");
}

async function createObjects(outPath, schemaKeyValues) {
  await writeFile(outPath, schema.schemaTop());
  for (let i = 0; i < schemaKeyValues.length; i++) {
    await appendFile(outPath, schema.createSchemaObject(schemaKeyValues[i]));
  }
  await appendFile(outPath, schema.schemaBottom());
}

module.exports = createSchema;
