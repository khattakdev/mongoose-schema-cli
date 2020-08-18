"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaBottom = exports.schemaTop = exports.createSchemaObject = void 0;
function createSchemaObject(options) {
    const { name, type, isRequired, defaultValue } = options;
    return `
   ${name}: {
        type: ${type},
        required: ${isRequired},
        default: "${defaultValue}"
    },
    `;
}
exports.createSchemaObject = createSchemaObject;
function schemaTop() {
    return `
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  `;
}
exports.schemaTop = schemaTop;
function schemaBottom() {
    return `
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});
module.exports = userSchema;
  `;
}
exports.schemaBottom = schemaBottom;
// module.exports = {
//   createSchemaObject,
//   schemaTop,
//   schemaBottom,
// };
