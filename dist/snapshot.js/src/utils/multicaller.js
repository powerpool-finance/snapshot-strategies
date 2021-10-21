"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_set_1 = __importDefault(require("lodash.set"));
const utils_1 = require("../utils");
class Multicaller {
    network;
    provider;
    abi;
    options = {};
    calls = [];
    paths = [];
    constructor(network, provider, abi, options) {
        this.network = network;
        this.provider = provider;
        this.abi = abi;
        this.options = options || {};
    }
    call(path, address, fn, params) {
        this.calls.push([address, fn, params]);
        this.paths.push(path);
        return this;
    }
    async execute(from) {
        const obj = from || {};
        const result = await (0, utils_1.multicall)(this.network, this.provider, this.abi, this.calls, this.options);
        result.forEach((r, i) => (0, lodash_set_1.default)(obj, this.paths[i], r.length > 1 ? r : r[0]));
        this.calls = [];
        this.paths = [];
        return obj;
    }
}
exports.default = Multicaller;
