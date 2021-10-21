"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = __importDefault(require("./basic"));
const aave_1 = __importDefault(require("./aave"));
exports.default = {
    basic: basic_1.default,
    aave: aave_1.default
};
