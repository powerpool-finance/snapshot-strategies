"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const units_1 = require("@ethersproject/units");
const utils_1 = require("../../utils");
exports.author = 'dievardump';
exports.version = '0.1.0';
const abi = [
    'function balanceOf(address account) external view returns (uint256)'
];
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const calls = [];
    options.registries.forEach((registry) => {
        addresses.forEach((address) => {
            calls.push([registry, 'balanceOf', [address]]);
        });
    });
    const response = await (0, utils_1.multicall)(network, provider, abi, calls, { blockTag });
    const merged = {};
    response.map((value, i) => {
        const address = calls[i][2][0];
        merged[address] = (merged[address] || 0);
        merged[address] += parseFloat((0, units_1.formatUnits)(value.toString(), 0));
    });
    return merged;
}
exports.strategy = strategy;
