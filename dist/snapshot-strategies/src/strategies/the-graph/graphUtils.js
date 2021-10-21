"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResults = exports.calcNonStakedTokens = exports.bdMulBn = exports.bnWEI = exports.GRAPH_NETWORK_SUBGRAPH_URL = void 0;
const units_1 = require("@ethersproject/units");
const bignumber_1 = require("@ethersproject/bignumber");
exports.GRAPH_NETWORK_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet',
    '4': 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-testnet'
};
exports.bnWEI = bignumber_1.BigNumber.from('1000000000000000000');
// Pass in a BigDecimal and BigNumber from a subgraph query, and return the multiplication of
// them as a BigNumber
function bdMulBn(bd, bn) {
    const splitDecimal = bd.split('.');
    let split;
    // Truncate the BD so it can be converted to a BN (no decimals) when multiplied by WEI
    if (splitDecimal.length > 1) {
        split = `${splitDecimal[0]}.${splitDecimal[1].slice(0, 18)}`;
    }
    else {
        // Didn't have decimals, even though it was BigDecimal (i.e. "2")
        return bignumber_1.BigNumber.from(bn).mul(bignumber_1.BigNumber.from(bd));
    }
    // Convert it to BN
    const bdWithWEI = (0, units_1.parseUnits)(split, 18);
    // Multiple, then divide by WEI to have it back in BN
    return bignumber_1.BigNumber.from(bn).mul(bdWithWEI).div(exports.bnWEI);
}
exports.bdMulBn = bdMulBn;
function calcNonStakedTokens(totalSupply, totalTokensStaked, totalDelegatedTokens) {
    return bignumber_1.BigNumber.from(totalSupply)
        .sub(bignumber_1.BigNumber.from(totalTokensStaked))
        .sub(bignumber_1.BigNumber.from(totalDelegatedTokens))
        .div(exports.bnWEI)
        .toNumber();
}
exports.calcNonStakedTokens = calcNonStakedTokens;
function verifyResults(result, expectedResults, type) {
    result === expectedResults
        ? console.log(`>>> SUCCESS: ${type} match expected results`)
        : console.error(`>>> ERROR: ${type} do not match expected results`);
}
exports.verifyResults = verifyResults;
