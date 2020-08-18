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
const arg_1 = __importDefault(require("arg"));
const inquirer_1 = __importDefault(require("inquirer"));
const main_1 = __importDefault(require("./main"));
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg_1.default({
        "--typescript": Boolean,
        "--filepath": String,
        // Aliases
        "-t": "--typescript",
        "-m": "--mongoose",
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        language: args["--typescript"] || false,
        filePath: args["--filepath"] || "/",
    };
}
function promptForMissingOptions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultOptions = {
            language: "Javascript",
            schema: "default",
        };
        const questions = [];
        //@TODO: Temporary Disabled, Uncomment after adding Typescript Schema
        // if (!options.language) {
        //   questions.push({
        //     type: "list",
        //     name: "language",
        //     message: "Please choose which language Schema to use",
        //     choices: ["JavaScript", "TypeScript"],
        //     default: defaultOptions.language,
        //   });
        // }
        questions.push({
            type: "input",
            name: "schema",
            message: "Please input Schema name",
            default: defaultOptions.schema,
        });
        const answers = yield inquirer_1.default.prompt(questions);
        return Object.assign(Object.assign({}, options), { language: options.language || answers.language, schema: answers.schema });
    });
}
function promptForSchemaObject() {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultOptions = {
            name: "default",
            type: "String",
            required: true,
            default: "",
        };
        const questions = [];
        questions.push({
            type: "input",
            name: "name",
            message: "Please input Schema Key name",
            default: defaultOptions.name,
        });
        questions.push({
            type: "list",
            name: "type",
            message: "Please input Schema Key type",
            choices: ["String", "Number", "Boolean"],
            default: defaultOptions.name,
        });
        questions.push({
            type: "confirm",
            name: "required",
            message: "Is this Schema Key Required",
            default: defaultOptions.required,
        });
        questions.push({
            type: "input",
            name: "default",
            message: "What is the default value?",
            default: defaultOptions.default,
        });
        const answers = yield inquirer_1.default.prompt(questions);
        return {
            name: answers.name,
            type: answers.type,
            isRequired: answers.required,
            defaultValue: answers.default,
        };
    });
}
function cli(args) {
    return __awaiter(this, void 0, void 0, function* () {
        var options = parseArgumentsIntoOptions(args);
        var missingOptions = yield promptForMissingOptions(options);
        const { schemaKeys } = yield inquirer_1.default.prompt({
            type: "input",
            name: "schemaKeys",
            message: "How many key this Schema has?",
            default: 0,
        });
        const schemaKeyValues = [];
        for (let i = 0; i < schemaKeys; i++) {
            const objectValues = yield promptForSchemaObject();
            schemaKeyValues.push(objectValues);
        }
        var schema = missingOptions.schema;
        yield main_1.default(schema, schemaKeyValues);
    });
}
exports.default = cli;
