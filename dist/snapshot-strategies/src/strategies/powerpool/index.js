"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const units_1 = require("@ethersproject/units");
const web3_1 = require("../../../../snapshot.js/src/utils/web3");
const utils_1 = require("../../../../snapshot.js/src/utils");
exports.author = 'powerpool';
exports.version = '0.1.0';
const abi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "lastUpdateBlock",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "vestingBlock",
                "type": "uint32"
            },
            {
                "internalType": "uint96",
                "name": "pendedCvp",
                "type": "uint96"
            },
            {
                "internalType": "uint96",
                "name": "cvpAdjust",
                "type": "uint96"
            },
            {
                "internalType": "uint256",
                "name": "lptAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0xb9d02df4"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pools",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "lpToken",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "votesEnabled",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "poolType",
                "type": "uint8"
            },
            {
                "internalType": "uint32",
                "name": "allocPoint",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "lastUpdateBlock",
                "type": "uint32"
            },
            {
                "internalType": "uint256",
                "name": "accCvpPerLpt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0xac4afa38"
    },
    {
        "inputs": [],
        "name": "poolLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0x081e3eda"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "members",
        "outputs": [
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "transferred",
                "type": "bool"
            },
            {
                "internalType": "uint96",
                "name": "alreadyClaimedVotes",
                "type": "uint96"
            },
            {
                "internalType": "uint96",
                "name": "alreadyClaimedTokens",
                "type": "uint96"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0x08ae4b0c"
    },
    {
        "inputs": [],
        "name": "startV",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5cfa7d02"
    },
    {
        "inputs": [],
        "name": "durationV",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0x51771f40"
    },
    {
        "inputs": [],
        "name": "endT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0xa8b7d824"
    },
    {
        "inputs": [],
        "name": "amountPerMember",
        "outputs": [
            {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5e6a1dd8"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
        "name": "usersPoolBoost",
        "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }, {
                "internalType": "uint32",
                "name": "lastUpdateBlock",
                "type": "uint32"
            }],
        "stateMutability": "view",
        "type": "function"
    }
];
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : await (0, web3_1.getBlockNumber)(provider);
    const results = await Promise.all([
        // @ts-ignore
        cvpBalanceOf(network, provider, addresses, options, blockTag),
        cvpMiningLP(network, provider, addresses, options, blockTag),
        cvpVestingOf(network, provider, addresses, options, blockTag),
    ]);
    return results.reduce((balance, result) => {
        for (const [userAddress, userBalance] of Object.entries(result)) {
            balance[userAddress] = (balance[userAddress] || 0) + userBalance;
        }
        return balance;
    }, {});
}
exports.strategy = strategy;
async function cvpVestingOf(network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    let [startV, durationV, endT, amountPerMember] = await (0, utils_1.multicall)(network, provider, abi, [
        [options.vesting, 'startV', []],
        [options.vesting, 'durationV', []],
        [options.vesting, 'endT', []],
        [options.vesting, 'amountPerMember', []]
    ], { blockTag }).then(data => data.map(d => d.toString()));
    startV = parseInt(startV);
    durationV = parseInt(durationV);
    endT = parseInt(endT);
    amountPerMember = (0, units_1.formatUnits)(amountPerMember);
    const amountPerSecond = amountPerMember / durationV;
    const block = await provider.getBlock(snapshot);
    const currentVotesAmount = block.timestamp >= endT ? 0 : (block.timestamp - startV) * amountPerSecond;
    const calls = addresses.map((address) => [
        options.vesting,
        'members',
        [address]
    ]);
    const members = await (0, utils_1.multicall)(network, provider, abi, calls, { blockTag });
    return Object.fromEntries(addresses.map((address, i) => [address, members[i].active ? currentVotesAmount : 0]));
}
async function cvpBalanceOf(network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const calls = addresses.map((address) => [
        options.token,
        'balanceOf',
        [address]
    ]);
    const balances = await (0, utils_1.multicall)(network, provider, abi, calls, { blockTag });
    return Object.fromEntries(addresses.map((address, i) => {
        return [address, parseFloat((0, units_1.formatUnits)(balances[i].toString()))];
    }));
}
async function cvpMiningLP(network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const poolLength = await (0, utils_1.call)(provider, abi, [options.mining, 'poolLength', []]).then(l => parseInt(l.toString()));
    const poolsCalls = [];
    for (let i = 0; i < poolLength; i++) {
        if (i > 11) {
            break;
        }
        // @ts-ignore
        poolsCalls.push([options.mining, 'pools', [i]]);
    }
    const pools = await (0, utils_1.multicall)(network, provider, abi, poolsCalls, { blockTag });
    const votesByAddress = {};
    const votesPools = pools.map((p, i) => ({ pid: i, token: p.lpToken }));
    for (let i = 0; i < votesPools.length; i++) {
        const pool = votesPools[i];
        const response = await (0, utils_1.multicall)(network, provider, abi, [
            [options.token, 'balanceOf', [pool.token]],
            [pool.token, 'totalSupply'],
            ...addresses.map((address) => [
                pool.token,
                'balanceOf',
                [address]
            ]),
            ...addresses.map((address) => [
                options.mining,
                'users',
                [pool.pid, address]
            ]),
            ...addresses.map((address) => [
                options.mining,
                'usersPoolBoost',
                [pool.pid, address]
            ])
        ], { blockTag });
        const cvpPerLP = (0, units_1.parseUnits)(response[0][0].toString(), 18).div(response[1][0]);
        const lpBalances = response.slice(2, addresses.length + 2);
        const stakedUserInfo = response.slice(addresses.length + 2, addresses.length * 2 + 2);
        const boostUserInfo = response.slice(addresses.length * 2 + 2, addresses.length * 3 + 2);
        addresses.forEach((a, k) => {
            const lpBalance = lpBalances[k][0].add(stakedUserInfo[k]['lptAmount']);
            let cvpLpBalance = lpBalance
                .mul(cvpPerLP)
                .div((0, units_1.parseUnits)('1', 18));
            cvpLpBalance = cvpLpBalance.add(boostUserInfo[k]['balance']);
            if (!votesByAddress[a]) {
                votesByAddress[a] = 0;
            }
            votesByAddress[a] += parseFloat((0, units_1.formatUnits)(cvpLpBalance, 18));
        });
    }
    return votesByAddress;
}
