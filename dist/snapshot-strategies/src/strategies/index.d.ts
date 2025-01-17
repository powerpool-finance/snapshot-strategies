import * as antiWhale from './anti-whale';
import * as balancer from './balancer';
import * as balancerErc20InternalBalanceOf from './balancer-erc20-internal-balance-of';
import * as sunder from './sunder';
import * as balancerSmartPool from './balancer-smart-pool';
import * as contractCall from './contract-call';
import * as dextfVaults from './dextf-staked-in-vaults';
import * as dfynFarms from './dfyn-staked-in-farms';
import * as dfynVaults from './dfyn-staked-in-vaults';
import * as vDfynVault from './balance-in-vdfyn-vault';
import * as ensDomainsOwned from './ens-domains-owned';
import * as ensReverseRecord from './ens-reverse-record';
import * as erc20BalanceOf from './erc20-balance-of';
import * as erc20BalanceOfCoeff from './erc20-balance-of-coeff';
import * as erc20BalanceOfFixedTotal from './erc20-balance-of-fixed-total';
import * as erc20BalanceOfCv from './erc20-balance-of-cv';
import * as erc20WithBalance from './erc20-with-balance';
import * as erc20BalanceOfDelegation from './erc20-balance-of-delegation';
import * as erc20BalanceOfQuadraticDelegation from './erc20-balance-of-quadratic-delegation';
import * as erc20Price from './erc20-price';
import * as balanceOfWithMin from './balance-of-with-min';
import * as balanceOfWithThresholds from './balance-of-with-thresholds';
import * as ethBalance from './eth-balance';
import * as ethWithBalance from './eth-with-balance';
import * as ethWalletAge from './eth-wallet-age';
import * as multichain from './multichain';
import * as makerDsChief from './maker-ds-chief';
import * as uni from './uni';
import * as yearnVault from './yearn-vault';
import * as fraxFinance from './frax-finance';
import * as moloch from './moloch';
import * as uniswap from './uniswap';
import * as faralandStaking from './faraland-staking';
import * as flashstake from './flashstake';
import * as pancake from './pancake';
import * as synthetix from './synthetix';
import * as synthetixQuadratic from './synthetix-quadratic';
import * as synthetixNonQuadratic from './synthetix-non-quadratic';
import * as ctoken from './ctoken';
import * as cream from './cream';
import * as esd from './esd';
import * as esdDelegation from './esd-delegation';
import * as stakedUniswap from './staked-uniswap';
import * as piedao from './piedao';
import * as ethReceived from './eth-received';
import * as erc20Received from './erc20-received';
import * as ethPhilanthropy from './eth-philanthropy';
import * as xDaiEasyStaking from './xdai-easy-staking';
import * as xDaiPOSDAOStaking from './xdai-posdao-staking';
import * as xDaiStakeHolders from './xdai-stake-holders';
import * as xDaiStakeDelegation from './xdai-stake-delegation';
import * as defidollar from './defidollar';
import * as aavegotchi from './aavegotchi';
import * as aavegotchiAgip from './aavegotchi-agip';
import * as mithcash from './mithcash';
import * as dittomoney from './dittomoney';
import * as balancerUnipool from './balancer-unipool';
import * as sushiswap from './sushiswap';
import * as masterchef from './masterchef';
import * as stablexswap from './stablexswap';
import * as stakedKeep from './staked-keep';
import * as typhoon from './typhoon';
import * as delegation from './delegation';
import * as ticket from './ticket';
import * as work from './work';
import * as ticketValidity from './ticket-validity';
import * as opium from './opium';
import * as ocean from './ocean-marketplace';
import * as theGraphBalance from './the-graph-balance';
import * as theGraphDelegation from './the-graph-delegation';
import * as theGraphIndexing from './the-graph-indexing';
import * as whitelist from './whitelist';
import * as tokenlon from './tokenlon';
import * as rebased from './rebased';
import * as pobHash from './pob-hash';
import * as totalAxionShares from './total-axion-shares';
import * as erc1155BalanceOf from './erc1155-balance-of';
import * as erc1155BalanceOfCv from './erc1155-balance-of-cv';
import * as compLikeVotes from './comp-like-votes';
import * as governorAlpha from './governor-alpha';
import * as pagination from './pagination';
import * as rulerStakedToken from './ruler-staked-token';
import * as rulerStakedLP from './ruler-staked-lp';
import * as xcover from './xcover';
import * as niuStaked from './niu-staked';
import * as mushrooms from './mushrooms';
import * as curioCardsErc20Weighted from './curio-cards-erc20-weighted';
import * as saffronFinance from './saffron-finance';
import * as renNodes from './ren-nodes';
import * as multisigOwners from './multisig-owners';
import * as trancheStaking from './tranche-staking';
import * as pepemon from './pepemon';
import * as erc1155AllBalancesOf from './erc1155-all-balances-of';
import * as trancheStakingLP from './tranche-staking-lp';
import * as masterchefPoolBalance from './masterchef-pool-balance';
import * as masterchefPoolBalancePrice from './masterchef-pool-balance-price';
import * as avnBalanceOfStaked from './avn-balance-of-staked';
import * as badgeth from './badgeth';
import * as api from './api';
import * as xseen from './xseen';
import * as molochAll from './moloch-all';
import * as molochLoot from './moloch-loot';
import * as erc721Enumerable from './erc721-enumerable';
import * as erc721WithMultiplier from './erc721-with-multiplier';
import * as erc721WithTokenId from './erc721-with-tokenid';
import * as hoprUniLpFarm from './hopr-uni-lp-farm';
import * as erc721 from './erc721';
import * as erc721MultiRegistry from './erc721-multi-registry';
import * as apescape from './apescape';
import * as liftkitchen from './liftkitchen';
import * as coordinape from './coordinape';
import * as decentralandEstateSize from './decentraland-estate-size';
import * as iotexBalance from './iotex-balance';
import * as iotexStakedBalance from './iotex-staked-balance';
import * as xrc20BalanceOf from './xrc20-balance-of';
import * as brightid from './brightid';
import * as inverseXINV from './inverse-xinv';
import * as modefi from './modefi';
import * as modefiStaking from './modefi-staking';
import * as spookyswap from './spookyswap';
import * as rnbwBalance from './rnbw-balance';
import * as celerSgnDelegation from './celer-sgn-delegation';
import * as balancerDelegation from './balancer-delegation';
import * as infinityProtocolPools from './infinityprotocol-liquidity-pools';
import * as aaveGovernancePower from './aave-governance-power';
import * as cake from './cake';
import * as planetFinance from './planet-finance';
import * as impossibleFinance from './impossible-finance';
import * as ogn from './ogn';
import * as zrxVotingPower from './zrx-voting-power';
import * as tombFinance from './tomb-finance';
import * as trancheStakingSLICE from './tranche-staking-slice';
import * as unipoolSameToken from './unipool-same-token';
import * as unipoolUniv2Lp from './unipool-univ2-lp';
import * as poapWithWeight from './poap-with-weight';
import * as uniswapV3 from './uniswap-v3';
import * as uniswapV3Staking from './uniswap-v3-staking';
import * as l2Deversifi from './l2-deversifi';
import * as vestedDeversifi from './vested-deversifi';
import * as biswap from './biswap';
import * as honeyswap from './honeyswap';
import * as eglVote from './egl-vote';
import * as mcnFarm from './mcn-farm';
import * as snowswap from './snowswap';
import * as meebitsdao from './meebitsdao';
import * as holdsTokens from './holds-tokens';
import * as crucibleERC20BalanceOf from './crucible-erc20-balance-of';
import * as hasrock from './has-rock';
import * as flexaCapacityStaking from './flexa-capacity-staking';
import * as sunriseGamingUniv2Lp from './sunrisegaming-univ2-lp';
import * as sunriseGamingStaking from './sunrisegaming-staking';
import * as singleStakingPoolsBalanceOf from './single-staking-pools-balanceof';
import * as occStakeOf from './occ-stake-of';
import * as hoprStaking from './hopr-staking';
import * as hoprBridgedBalance from './hopr-bridged-balance';
import * as lootCharacterGuilds from './loot-character-guilds';
import * as cyberkongz from './cyberkongz';
import * as compLikeVotesInclusive from './comp-like-votes-inclusive';
import * as mstable from './mstable';
import * as hashesVoting from './hashes-voting';
import * as podLeader from './pod-leader';
import * as aavegotchiWagmiGuild from './aavegotchi-wagmi-guild';
import * as polisBalance from './polis-balance';
import * as mutantCatsStakersAndHolders from './mutant-cats-stakers-and-holders';
import * as vaultTokenLpBalance from './vault-token-lp-balance';
import * as singleStakingVaultBalanceOf from './single-staking-vault-balanceof';
declare const strategies: {
    coordinape: typeof coordinape;
    'anti-whale': typeof antiWhale;
    balancer: typeof balancer;
    sunder: typeof sunder;
    'balancer-smart-pool': typeof balancerSmartPool;
    'balancer-erc20-internal-balance-of': typeof balancerErc20InternalBalanceOf;
    'balance-in-vdfyn-vault': typeof vDfynVault;
    'erc20-received': typeof erc20Received;
    'contract-call': typeof contractCall;
    'dextf-staked-in-vaults': typeof dextfVaults;
    'dfyn-staked-in-farms': typeof dfynFarms;
    'dfyn-staked-in-vaults': typeof dfynVaults;
    'eth-received': typeof ethReceived;
    'eth-philanthropy': typeof ethPhilanthropy;
    'ens-domains-owned': typeof ensDomainsOwned;
    'ens-reverse-record': typeof ensReverseRecord;
    'erc20-balance-of': typeof erc20BalanceOf;
    'erc20-balance-of-fixed-total': typeof erc20BalanceOfFixedTotal;
    'erc20-balance-of-cv': typeof erc20BalanceOfCv;
    'erc20-balance-of-coeff': typeof erc20BalanceOfCoeff;
    'erc20-with-balance': typeof erc20WithBalance;
    'erc20-balance-of-delegation': typeof erc20BalanceOfDelegation;
    'erc20-balance-of-quadratic-delegation': typeof erc20BalanceOfQuadraticDelegation;
    'erc20-price': typeof erc20Price;
    'balance-of-with-min': typeof balanceOfWithMin;
    'balance-of-with-thresholds': typeof balanceOfWithThresholds;
    'eth-balance': typeof ethBalance;
    'eth-with-balance': typeof ethWithBalance;
    'eth-wallet-age': typeof ethWalletAge;
    'maker-ds-chief': typeof makerDsChief;
    erc721: typeof erc721;
    'erc721-enumerable': typeof erc721Enumerable;
    'erc721-with-multiplier': typeof erc721WithMultiplier;
    'erc721-with-tokenid': typeof erc721WithTokenId;
    'erc721-multi-registry': typeof erc721MultiRegistry;
    'erc1155-balance-of': typeof erc1155BalanceOf;
    'erc1155-balance-of-cv': typeof erc1155BalanceOfCv;
    multichain: typeof multichain;
    uni: typeof uni;
    'frax-finance': typeof fraxFinance;
    'yearn-vault': typeof yearnVault;
    moloch: typeof moloch;
    masterchef: typeof masterchef;
    sushiswap: typeof sushiswap;
    uniswap: typeof uniswap;
    'faraland-staking': typeof faralandStaking;
    flashstake: typeof flashstake;
    pancake: typeof pancake;
    synthetix: typeof synthetix;
    'synthetix-quadratic': typeof synthetixQuadratic;
    'synthetix-non-quadratic': typeof synthetixNonQuadratic;
    ctoken: typeof ctoken;
    cream: typeof cream;
    'staked-uniswap': typeof stakedUniswap;
    esd: typeof esd;
    'esd-delegation': typeof esdDelegation;
    piedao: typeof piedao;
    'xdai-easy-staking': typeof xDaiEasyStaking;
    'xdai-posdao-staking': typeof xDaiPOSDAOStaking;
    'xdai-stake-holders': typeof xDaiStakeHolders;
    'xdai-stake-delegation': typeof xDaiStakeDelegation;
    defidollar: typeof defidollar;
    aavegotchi: typeof aavegotchi;
    'aavegotchi-agip': typeof aavegotchiAgip;
    mithcash: typeof mithcash;
    stablexswap: typeof stablexswap;
    dittomoney: typeof dittomoney;
    'staked-keep': typeof stakedKeep;
    'balancer-unipool': typeof balancerUnipool;
    typhoon: typeof typhoon;
    delegation: typeof delegation;
    ticket: typeof ticket;
    work: typeof work;
    'ticket-validity': typeof ticketValidity;
    opium: typeof opium;
    'ocean-marketplace': typeof ocean;
    'the-graph-balance': typeof theGraphBalance;
    'the-graph-delegation': typeof theGraphDelegation;
    'the-graph-indexing': typeof theGraphIndexing;
    whitelist: typeof whitelist;
    tokenlon: typeof tokenlon;
    rebased: typeof rebased;
    'pob-hash': typeof pobHash;
    'total-axion-shares': typeof totalAxionShares;
    'comp-like-votes': typeof compLikeVotes;
    'governor-alpha': typeof governorAlpha;
    pagination: typeof pagination;
    'ruler-staked-token': typeof rulerStakedToken;
    'ruler-staked-lp': typeof rulerStakedLP;
    xcover: typeof xcover;
    'niu-staked': typeof niuStaked;
    mushrooms: typeof mushrooms;
    'curio-cards-erc20-weighted': typeof curioCardsErc20Weighted;
    'ren-nodes': typeof renNodes;
    'multisig-owners': typeof multisigOwners;
    'tranche-staking': typeof trancheStaking;
    pepemon: typeof pepemon;
    'erc1155-all-balances-of': typeof erc1155AllBalancesOf;
    'saffron-finance': typeof saffronFinance;
    'tranche-staking-lp': typeof trancheStakingLP;
    'masterchef-pool-balance': typeof masterchefPoolBalance;
    'masterchef-pool-balance-price': typeof masterchefPoolBalancePrice;
    'avn-balance-of-staked': typeof avnBalanceOfStaked;
    api: typeof api;
    xseen: typeof xseen;
    'moloch-all': typeof molochAll;
    'moloch-loot': typeof molochLoot;
    'hopr-uni-lp-farm': typeof hoprUniLpFarm;
    apescape: typeof apescape;
    liftkitchen: typeof liftkitchen;
    'decentraland-estate-size': typeof decentralandEstateSize;
    brightid: typeof brightid;
    'inverse-xinv': typeof inverseXINV;
    modefi: typeof modefi;
    'modefi-staking': typeof modefiStaking;
    'iotex-balance': typeof iotexBalance;
    'iotex-staked-balance': typeof iotexStakedBalance;
    'xrc20-balance-of': typeof xrc20BalanceOf;
    spookyswap: typeof spookyswap;
    'rnbw-balance': typeof rnbwBalance;
    'celer-sgn-delegation': typeof celerSgnDelegation;
    'balancer-delegation': typeof balancerDelegation;
    'infinityprotocol-liquidity-pools': typeof infinityProtocolPools;
    'aave-governance-power': typeof aaveGovernancePower;
    cake: typeof cake;
    'planet-finance': typeof planetFinance;
    ogn: typeof ogn;
    'impossible-finance': typeof impossibleFinance;
    badgeth: typeof badgeth;
    'zrx-voting-power': typeof zrxVotingPower;
    'tomb-finance': typeof tombFinance;
    'tranche-staking-slice': typeof trancheStakingSLICE;
    'unipool-same-token': typeof unipoolSameToken;
    'unipool-univ2-lp': typeof unipoolUniv2Lp;
    'poap-with-weight': typeof poapWithWeight;
    'uniswap-v3': typeof uniswapV3;
    'uniswap-v3-staking': typeof uniswapV3Staking;
    'l2-deversifi': typeof l2Deversifi;
    'vested-deversifi': typeof vestedDeversifi;
    biswap: typeof biswap;
    honeyswap: typeof honeyswap;
    'egl-vote': typeof eglVote;
    'mcn-farm': typeof mcnFarm;
    snowswap: typeof snowswap;
    meebitsdao: typeof meebitsdao;
    'crucible-erc20-balance-of': typeof crucibleERC20BalanceOf;
    'has-rock': typeof hasrock;
    'flexa-capacity-staking': typeof flexaCapacityStaking;
    'sunrisegaming-univ2-lp': typeof sunriseGamingUniv2Lp;
    'sunrisegaming-staking': typeof sunriseGamingStaking;
    'single-staking-pools-balanceof': typeof singleStakingPoolsBalanceOf;
    'hopr-staking': typeof hoprStaking;
    'hopr-bridged-balance': typeof hoprBridgedBalance;
    'occ-stake-of': typeof occStakeOf;
    'holds-tokens': typeof holdsTokens;
    'loot-character-guilds': typeof lootCharacterGuilds;
    cyberkongz: typeof cyberkongz;
    'comp-like-votes-inclusive': typeof compLikeVotesInclusive;
    mstable: typeof mstable;
    'hashes-voting': typeof hashesVoting;
    'pod-leader': typeof podLeader;
    'aavegotchi-wagmi-guild': typeof aavegotchiWagmiGuild;
    'polis-balance': typeof polisBalance;
    'vault-token-lp-balance': typeof vaultTokenLpBalance;
    'single-staking-vault-balanceof': typeof singleStakingVaultBalanceOf;
    'mutant-cats-stakers-and-holders': typeof mutantCatsStakersAndHolders;
};
export default strategies;
