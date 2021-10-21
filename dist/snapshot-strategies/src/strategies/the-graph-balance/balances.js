"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceStrategy = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const utils_1 = require("../../utils");
const graphUtils_1 = require("../the-graph/graphUtils");
async function balanceStrategy(_space, network, _provider, addresses, _options, snapshot) {
    const balanceParams = {
        graphAccounts: {
            __args: {
                where: {
                    id_in: addresses
                },
                first: 1000
            },
            id: true,
            balance: true
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        balanceParams.graphAccounts.__args.block = { number: snapshot };
    }
    // If we want to limit sending too many addresses in the request, split up by
    // groups of 200 and batch. Something to consider for the future
    const result = await (0, utils_1.subgraphRequest)(graphUtils_1.GRAPH_NETWORK_SUBGRAPH_URL[network], balanceParams);
    // No normalization factor for balances. 1 GRT in wallet is the baseline to compare
    // Delegators and Indexers to.
    const score = {};
    if (result && result.graphAccounts) {
        // Must iterate on addresses since the query can return nothing for a beneficiary that has
        // only interacted through token lock wallets
        addresses.forEach((a) => {
            let balanceScore = 0;
            for (let i = 0; i < result.graphAccounts.length; i++) {
                if (result.graphAccounts[i].id == a) {
                    balanceScore = bignumber_1.BigNumber.from(result.graphAccounts[i].balance)
                        .div(graphUtils_1.bnWEI)
                        .toNumber();
                    break;
                }
            }
            score[a] = balanceScore;
        });
    }
    else {
        console.error('Subgraph request failed');
    }
    return score || {};
}
exports.balanceStrategy = balanceStrategy;
