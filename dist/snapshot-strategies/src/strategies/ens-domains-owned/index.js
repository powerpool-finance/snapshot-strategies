"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const address_1 = require("@ethersproject/address");
const utils_1 = require("../../utils");
const ENS_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    '3': 'https://api.thegraph.com/subgraphs/name/ensdomains/ensropsten',
    '4': 'https://api.thegraph.com/subgraphs/name/ensdomains/ensrinkeby',
    '5': 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli'
};
exports.author = 'makoto';
exports.version = '0.1.0';
async function strategy(_space, network, provider, addresses, options, snapshot) {
    const params = {
        domains: {
            __args: {
                where: {
                    name: options.domain
                },
                first: 1000
            },
            id: true,
            labelName: true,
            subdomains: {
                __args: {
                    where: {
                        owner_in: addresses.map((address) => address.toLowerCase())
                    }
                },
                owner: {
                    id: true
                }
            }
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        params.domains.__args.block = { number: snapshot };
    }
    const result = await (0, utils_1.subgraphRequest)(ENS_SUBGRAPH_URL[network], params);
    const score = {};
    if (result && result.domains) {
        result.domains.forEach((u) => {
            u.subdomains.forEach((domain) => {
                const userAddress = (0, address_1.getAddress)(domain.owner.id);
                if (!score[userAddress])
                    score[userAddress] = 0;
                score[userAddress] = score[userAddress] + 1;
            });
        });
    }
    return score || {};
}
exports.strategy = strategy;
