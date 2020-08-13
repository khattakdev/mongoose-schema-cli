const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

export default async function createSchema(options) {
  const schemaOptions = {
    ...options,
    dir: path.resolve(__dirname, "../template"),
    out: path.resolve(__dirname, "../out", `./${options.schema}.js`),
  };

  console.log();
  console.log("<--------------------------------->");
  console.log("Creating File for Dynamic Values");
  console.log(schemaOptions.out);
  await writeFile(schemaOptions.out, `console.log("Hello World!")`);
  // Generate Schema
  console.log("Generating Schema");
  // Start Copying
  console.log("Copying Schema");

  console.log("Schema Created Successfully");
  //   console.log(schemaOptions);
}
