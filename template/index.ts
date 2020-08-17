export function createSchemaObject(options: {
  name: string;
  type: string;
  isRequired: boolean;
  defaultValue: string;
}) {
  const { name, type, isRequired, defaultValue } = options;
  return `
   ${name}: {
        type: ${type},
        required: ${isRequired},
        default: "${defaultValue}"
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

// module.exports = {
//   createSchemaObject,
//   schemaTop,
//   schemaBottom,
// };
