"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchedProvider = void 0;
const providers_1 = require("@ethersproject/providers");
const networks_json_1 = __importDefault(require("../networks.json"));
const providers = {};
function getProvider(network) {
    const url = networks_json_1.default[network].rpc[0];
    if (!providers[network])
        providers[network] = new providers_1.StaticJsonRpcProvider(url);
    return providers[network];
}
exports.default = getProvider;
function getBatchedProvider(network) {
    const url = networks_json_1.default[network].rpc[0];
    if (!providers[network])
        providers[network] = new providers_1.JsonRpcBatchProvider(url);
    return providers[network];
}
exports.getBatchedProvider = getBatchedProvider;
