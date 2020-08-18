"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const listr_1 = __importDefault(require("listr"));
const template_1 = require("../template");
const writeFile = util_1.promisify(fs_1.default.writeFile);
const appendFile = util_1.promisify(fs_1.default.appendFile);
function createSchema(schema, schemaKeyValues) {
    return __awaiter(this, void 0, void 0, function* () {
        const schemaOptions = {
            // ...options,
            dirPath: path_1.default.resolve(__dirname, "../template"),
            outPath: path_1.default.resolve(process.cwd(), `./${schema}.js`),
        };
        console.log();
        const tasks = new listr_1.default([
            {
                title: "Creating Schema",
                task: () => __awaiter(this, void 0, void 0, function* () { return yield createObjects(schemaOptions.outPath, schemaKeyValues); }),
            },
        ]);
        yield tasks.run();
        console.log("DONE! Schema Generated");
    });
}
function createObjects(outPath, schemaKeyValues) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(outPath);
        yield writeFile(outPath, template_1.schemaTop());
        for (let i = 0; i < schemaKeyValues.length; i++) {
            yield appendFile(outPath, template_1.createSchemaObject(schemaKeyValues[i]));
        }
        yield appendFile(outPath, template_1.schemaBottom());
    });
}
exports.default = createSchema;
