export function createSchemaObject(options) {
  const { schemaName, type, isRequired, defaultValue } = options;
  return `
   ${schemaName}: {
        type: ${type},
        required: ${isRequired},
        default: ${defaultValue}
    },
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
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});
module.exports = userSchema;
  `;
}
