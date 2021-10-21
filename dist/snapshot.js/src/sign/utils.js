"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.getHash = void 0;
const wallet_1 = require("@ethersproject/wallet");
const hash_1 = require("@ethersproject/hash");
const eip1271_1 = require("./eip1271");
function getHash(data) {
    const { domain, types, message } = data;
    return hash_1._TypedDataEncoder.hash(domain, types, message);
}
exports.getHash = getHash;
async function verify(address, sig, data) {
    const { domain, types, message } = data;
    const recoverAddress = (0, wallet_1.verifyTypedData)(domain, types, message, sig);
    const hash = getHash(data);
    console.log('Hash', hash);
    console.log('Address', address);
    console.log('Recover address', recoverAddress);
    if (address === recoverAddress)
        return true;
    console.log('Check EIP1271 signature');
    return await (0, eip1271_1.verify)(address, sig, hash);
}
exports.verify = verify;
