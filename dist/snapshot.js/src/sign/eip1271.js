"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.verifyOldVersion = exports.verifyDefault = void 0;
const bytes_1 = require("@ethersproject/bytes");
const provider_1 = __importDefault(require("../utils/provider"));
const utils_1 = require("../utils");
async function verifyDefault(address, sig, hash, provider) {
    let returnValue;
    const magicValue = '0x1626ba7e';
    const abi = 'function isValidSignature(bytes32 _hash, bytes memory _signature) public view returns (bytes4 magicValue)';
    try {
        returnValue = await (0, utils_1.call)(provider, [abi], [address, 'isValidSignature', [(0, bytes_1.arrayify)(hash), sig]]);
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return returnValue.toLowerCase() === magicValue.toLowerCase();
}
exports.verifyDefault = verifyDefault;
async function verifyOldVersion(address, sig, hash, provider) {
    let returnValue;
    const magicValue = '0x20c13b0b';
    const abi = 'function isValidSignature(bytes _hash, bytes memory _signature) public view returns (bytes4 magicValue)';
    try {
        returnValue = await (0, utils_1.call)(provider, [abi], [address, 'isValidSignature', [(0, bytes_1.arrayify)(hash), sig]]);
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return returnValue.toLowerCase() === magicValue.toLowerCase();
}
exports.verifyOldVersion = verifyOldVersion;
async function verify(address, sig, hash, network = '1') {
    const provider = (0, provider_1.default)(network);
    if (await verifyDefault(address, sig, hash, provider))
        return true;
    return await verifyOldVersion(address, sig, hash, provider);
}
exports.verify = verify;
