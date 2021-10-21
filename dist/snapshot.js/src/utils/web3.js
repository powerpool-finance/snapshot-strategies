"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockNumber = exports.signMessage = void 0;
const bytes_1 = require("@ethersproject/bytes");
async function signMessage(web3, msg, address) {
    msg = (0, bytes_1.hexlify)(new Buffer(msg, 'utf8'));
    return await web3.send('personal_sign', [msg, address]);
}
exports.signMessage = signMessage;
async function getBlockNumber(provider) {
    try {
        const blockNumber = await provider.getBlockNumber();
        return parseInt(blockNumber);
    }
    catch (e) {
        return Promise.reject();
    }
}
exports.getBlockNumber = getBlockNumber;
