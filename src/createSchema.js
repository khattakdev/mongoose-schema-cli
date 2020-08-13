const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const schema = require("../template");

// const readfile = promisify(fs.readfile);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

export default async function createSchema(options) {
  const schemaOptions = {
    ...options,
    dir: path.resolve(__dirname, "../template"),
    out: path.resolve(__dirname, "../out", `./${options.schema}.txt`),
  };

  console.log();
  console.log("<--------------------------------->");
  console.log("Creating File for Dynamic Values");

  await writeFile(schemaOptions.out, schema.schemaTop());

  await appendFile(
    schemaOptions.out,
    schema.createSchemaObject({
      schemaName: "users",
      type: "String",
      isRequired: true,
      isDefault: "Arsalan",
    })
  );

  await appendFile(schemaOptions.out, schema.schemaBottom());

  //   console.log(
  //     schemaObject({
  //       schemaName: "users",
  //       type: "String",
  //       isRequired: true,
  //       isDefault: "Arsalan",
  //     })
  //   );
}
