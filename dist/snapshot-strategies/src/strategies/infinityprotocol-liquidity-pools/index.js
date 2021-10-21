"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const address_1 = require("@ethersproject/address");
const utils_1 = require("../../utils");
const INFINITYPROTOCOL_SUBGRAPH_URL = {
    '56': 'https://api.thegraph.com/subgraphs/name/infinitywallet/infinity-protocol'
};
exports.author = 'vfatouros';
exports.version = '0.1.0';
async function strategy(_space, network, _provider, addresses, options, snapshot) {
    const params = {
        users: {
            __args: {
                where: {
                    id_in: addresses.map((address) => address.toLowerCase())
                },
                first: 1000
            },
            id: true,
            liquidityPositions: {
                __args: {
                    where: {
                        liquidityTokenBalance_gt: 0
                    }
                },
                liquidityTokenBalance: true,
                pair: {
                    id: true,
                    token0: {
                        id: true
                    },
                    reserve0: true,
                    token1: {
                        id: true
                    },
                    reserve1: true,
                    totalSupply: true
                }
            }
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        params.users.liquidityPositions.__args.block = { number: snapshot };
    }
    const tokenAddress = options.address.toLowerCase();
    const result = await (0, utils_1.subgraphRequest)(options.subGraphURL
        ? options.subGraphURL
        : INFINITYPROTOCOL_SUBGRAPH_URL[network], params);
    const score = {};
    if (result && result.users) {
        result.users.forEach((u) => {
            u.liquidityPositions
                .filter((lp) => lp.pair.token0.id == tokenAddress ||
                lp.pair.token1.id == tokenAddress)
                .forEach((lp) => {
                const token0perShard = lp.pair.reserve0 / lp.pair.totalSupply;
                const token1perShard = lp.pair.reserve1 / lp.pair.totalSupply;
                let userScore = lp.pair.token0.id == tokenAddress
                    ? token0perShard * lp.liquidityTokenBalance
                    : token1perShard * lp.liquidityTokenBalance;
                if (options.scoreMultiplier) {
                    userScore = userScore * options.scoreMultiplier;
                }
                const userAddress = (0, address_1.getAddress)(u.id);
                if (!score[userAddress])
                    score[userAddress] = 0;
                score[userAddress] = score[userAddress] + userScore;
            });
        });
    }
    return score || {};
}
exports.strategy = strategy;
