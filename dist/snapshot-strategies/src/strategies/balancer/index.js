"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const address_1 = require("@ethersproject/address");
const utils_1 = require("../../utils");
exports.author = 'bonustrack';
exports.version = '0.1.0';
const BALANCER_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
    '42': 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-kovan'
};
async function strategy(space, network, provider, addresses, options, snapshot) {
    const params = {
        poolShares: {
            __args: {
                where: {
                    userAddress_in: addresses.map((address) => address.toLowerCase()),
                    balance_gt: 0
                },
                first: 1000,
                orderBy: 'balance',
                orderDirection: 'desc'
            },
            userAddress: {
                id: true
            },
            balance: true,
            poolId: {
                totalShares: true,
                tokens: {
                    id: true,
                    balance: true
                }
            }
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        params.poolShares.__args.block = { number: snapshot };
    }
    // iterate through Balancer V1 & V2 Subgraphs
    const score = {};
    for (let version = 1; version <= 2; version++) {
        let versionString = '';
        if (version == 2) {
            versionString = '-v2';
        }
        const result = await (0, utils_1.subgraphRequest)(BALANCER_SUBGRAPH_URL[network] + versionString, params);
        if (result && result.poolShares) {
            result.poolShares.forEach((poolShare) => poolShare.poolId.tokens.map((poolToken) => {
                const [, tokenAddress] = poolToken.id.split('-');
                if (tokenAddress === options.address.toLowerCase()) {
                    const userAddress = (0, address_1.getAddress)(poolShare.userAddress.id);
                    if (!score[userAddress])
                        score[userAddress] = 0;
                    score[userAddress] =
                        score[userAddress] +
                            (poolToken.balance / poolShare.poolId.totalShares) *
                                poolShare.balance;
                }
            }));
        }
    }
    return score || {};
}
exports.strategy = strategy;
