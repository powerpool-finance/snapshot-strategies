"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const utils_1 = require("../../utils");
exports.author = 'vfatouros';
exports.version = '0.1.0';
const tokenAbi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
async function strategy(_space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const res = await (0, utils_1.multicall)(network, provider, tokenAbi, [
        [options.uniswapAddress, 'totalSupply', []],
        [options.tokenAddress, 'balanceOf', [options.uniswapAddress]]
    ].concat(addresses.map((address) => [
        options.stakingAddress,
        'balanceOf',
        [address]
    ])), { blockTag });
    const totalSupply = res[0];
    const tokenBalanceInUni = res[1];
    const tokensPerUni = tokenBalanceInUni / 10 ** options.decimals / (totalSupply / 1e18);
    const response = res.slice(2);
    return Object.fromEntries(response.map((value, i) => [
        addresses[i],
        (value / 10 ** options.decimals) * tokensPerUni
    ]));
}
exports.strategy = strategy;
