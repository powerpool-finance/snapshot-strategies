"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const utils_1 = require("../../utils");
exports.author = 'pancake-swap';
exports.version = '0.0.1';
const MINIUM_VOTING_POWER = 0.01;
const SMART_CHEF_URL = 'https://api.thegraph.com/subgraphs/name/pancakeswap/smartchef';
const VOTING_API_URL = 'https://voting-api.pancakeswap.info/api/power';
/**
 * Fetches voting power of one address
 */
const fetchVotingPower = async (address, block, poolAddresses) => {
    const response = await (0, cross_fetch_1.default)(VOTING_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            block,
            address,
            poolAddresses
        })
    });
    const payload = await response.json();
    return payload.data;
};
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : await provider.getBlockNumber();
    const params = {
        smartChefs: {
            __args: {
                where: {
                    startBlock_lte: blockTag,
                    endBlock_gte: blockTag
                },
                first: 1000,
                orderBy: 'block',
                orderDirection: 'desc'
            },
            id: true,
            startBlock: true,
            endBlock: true
        }
    };
    const results = await (0, utils_1.subgraphRequest)(SMART_CHEF_URL, params);
    if (!results) {
        return;
    }
    try {
        const poolAddresses = results.smartChefs.map((pool) => pool.id);
        const promises = addresses.map((address) => {
            return fetchVotingPower(address, blockTag, poolAddresses);
        });
        const votingPowerResults = await Promise.all(promises);
        const calculatedPower = votingPowerResults.reduce((accum, response, index) => {
            const address = addresses[index];
            const total = parseFloat(response.total);
            return {
                ...accum,
                [address]: total <= MINIUM_VOTING_POWER ? MINIUM_VOTING_POWER : total
            };
        }, {});
        return calculatedPower;
    }
    catch {
        return [];
    }
}
exports.strategy = strategy;
