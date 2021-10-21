"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const units_1 = require("@ethersproject/units");
const utils_1 = require("../../utils");
const bignumber_1 = require("@ethersproject/bignumber");
exports.author = 'drop-out-dev';
exports.version = '0.1.0';
const FARM_ADDRESS = '0x15dEd15fE32EBac0b6cFb08cdAB112cca8380423';
const MCN_ADDRESS = '0xD91E9a0fEf7C0fa4EBdAF4d0aCF55888949A2a9b';
const MCN_LP_ADDRESS = '0x2Ef2cb6af83de4171A69EE2f7C677079fFD9BcD0';
const abi = [
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address account) view returns (uint256)',
    'function getPoolList() view returns (address[])',
    'function getPool(address _lpToken) view returns (tuple(tuple(address bonusTokenAddr, uint48 startTime, uint48 endTime, uint256 weeklyRewards, uint256 accRewardsPerToken, uint256 remBonus)[] bonuses, uint256 lastUpdatedAt, uint256 amount))',
    'function getUser(address _lpToken, address _account) view returns (tuple(uint256 amount, uint256[] rewardsWriteoffs) user, uint256[] rewards)'
];
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const lpAddress = options.lpAddress || MCN_LP_ADDRESS;
    const tokenAddress = options.tokenAddress || MCN_ADDRESS;
    const farmAddress = options.stakingAddress || FARM_ADDRESS;
    const pools = await (0, utils_1.call)(provider, abi, [farmAddress, 'getPoolList', []]);
    const flatten = (arr) => [].concat.apply([], arr);
    const product = (...sets) => {
        return sets.reduce((acc, set) => flatten(acc.map((x) => set.map((y) => [...x, y]))), [[]]);
    };
    const params = product(pools, addresses);
    const res = await (0, utils_1.multicall)(network, provider, abi, [
        [lpAddress, 'totalSupply', []],
        [tokenAddress, 'balanceOf', [lpAddress]]
    ]
        .concat(pools.map((p) => [farmAddress, 'getPool', [p]]))
        .concat(params.map((p) => [farmAddress, 'getUser', p])), { blockTag });
    const [totalSupply] = res[0];
    const [tokenBalanceInLP] = res[1];
    const tokensPerLP = tokenBalanceInLP.div(totalSupply);
    const poolInfo = res.slice(2, 2 + pools.length);
    // rewardToken_i maps pool index => pool bonus token index matching tokenAddress (if applicable)
    let rewardToken_i = {};
    for (let i = 0; i < pools.length; i++) {
        let bonuses = poolInfo[i][0].bonuses;
        if (bonuses === undefined)
            continue;
        for (let j = 0; j < bonuses.length; j++) {
            if (bonuses[j].bonusTokenAddr == tokenAddress) {
                rewardToken_i[i] = j;
                continue;
            }
        }
    }
    const response = res.slice(2 + pools.length);
    let values = {};
    Object.values(addresses).forEach((address) => (values[address] = bignumber_1.BigNumber.from(0)));
    response.forEach(([userInfo, rewards], i) => {
        let address_i = i % addresses.length;
        let address = addresses[address_i];
        let pool_i = Math.floor(i / addresses.length);
        let bonus_i = rewardToken_i[pool_i];
        if (bonus_i && rewards.length > bonus_i) {
            values[address].add(rewards[bonus_i]);
        }
        if (pool_i === 0) {
            // this is the MCN staking pool
            values[address] = values[address].add(userInfo.amount); // add staked amount
        }
        else if (pool_i === 1) {
            // this is the MCN-USDC staking pool
            values[address] = values[address].add(userInfo.amount.mul(tokensPerLP));
        }
    });
    for (let address in values) {
        if (values.hasOwnProperty(address)) {
            let value = parseFloat((0, units_1.formatUnits)(values[address], 18));
            values[address] = value;
        }
    }
    return values;
}
exports.strategy = strategy;