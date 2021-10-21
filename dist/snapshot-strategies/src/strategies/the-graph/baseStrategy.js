"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseStrategy = void 0;
const address_1 = require("@ethersproject/address");
const tokenLockWallets_1 = require("./tokenLockWallets");
const balances_1 = require("../the-graph-balance/balances");
const indexers_1 = require("../the-graph-indexing/indexers");
const delegators_1 = require("../the-graph-delegation/delegators");
const graphUtils_1 = require("./graphUtils");
async function baseStrategy(_space, network, _provider, addresses, options, snapshot) {
    addresses = addresses.map((address) => address.toLowerCase());
    const tokenLockWallets = await (0, tokenLockWallets_1.getTokenLockWallets)(_space, network, _provider, addresses, options, snapshot);
    // Take the token lock wallets object and turn it into an array, pass it into the other strategies
    const allAccounts = [...addresses];
    for (const beneficiary in tokenLockWallets) {
        tokenLockWallets[beneficiary].forEach((tw) => {
            allAccounts.push(tw);
        });
    }
    let scores = {};
    if (options.strategyType == 'balance') {
        scores = await (0, balances_1.balanceStrategy)(_space, network, _provider, allAccounts, options, snapshot);
    }
    else if (options.strategyType == 'delegation') {
        scores = await (0, delegators_1.delegatorsStrategy)(_space, network, _provider, allAccounts, options, snapshot);
    }
    else if (options.strategyType == 'indexing') {
        scores = await (0, indexers_1.indexersStrategy)(_space, network, _provider, allAccounts, options, snapshot);
    }
    else {
        console.error('ERROR: Strategy does not exist');
    }
    if (options.expectedResults) {
        (0, graphUtils_1.verifyResults)(JSON.stringify(scores), JSON.stringify(options.expectedResults.scores), 'Scores');
    }
    // Combine the Token lock votes into the beneficiaries votes
    const combinedScores = {};
    for (const account of addresses) {
        let accountScore = scores[account];
        // It was found that this beneficiary has token lock wallets, lets add them
        if (tokenLockWallets[account] != null) {
            tokenLockWallets[account].forEach((tw) => {
                accountScore = accountScore + scores[tw];
            });
        }
        combinedScores[account] = accountScore;
    }
    if (options.expectedResults) {
        (0, graphUtils_1.verifyResults)(JSON.stringify(combinedScores), JSON.stringify(options.expectedResults.combinedScores), 'Combined scores');
    }
    return Object.fromEntries(Object.entries(combinedScores).map((score) => [
        (0, address_1.getAddress)(score[0]),
        score[1]
    ]));
}
exports.baseStrategy = baseStrategy;
