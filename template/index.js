export function createSchemaObject(options) {
  const { schemaName, type, isRequired, isDefault } = options;
  return `
   ${schemaName}: {
        type: ${type},
        required: ${isRequired},
        default: ${isDefault}
    }
    `;
}

export function schemaTop() {
  return `
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  `;
}

export function schemaBottom() {
  return `
});
module.exports = userSchema;
  `;
}
