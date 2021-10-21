"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.getScores = exports.sendTransaction = exports.ipfsGet = exports.getUrl = exports.subgraphRequest = exports.multicall = exports.call = exports.SNAPSHOT_SCORE_API = exports.SNAPSHOT_SUBGRAPH_URL = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const abi_1 = require("@ethersproject/abi");
const contracts_1 = require("@ethersproject/contracts");
const json_to_graphql_query_1 = require("json-to-graphql-query");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const multicaller_1 = __importDefault(require("./utils/multicaller"));
const provider_1 = __importDefault(require("./utils/provider"));
const validations_1 = __importDefault(require("./validations"));
const web3_1 = require("./utils/web3");
const utils_1 = require("./sign/utils");
const gateways_json_1 = __importDefault(require("./gateways.json"));
const networks_json_1 = __importDefault(require("./networks.json"));
exports.SNAPSHOT_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot',
    '4': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-rinkeby',
    '42': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-kovan'
};
exports.SNAPSHOT_SCORE_API = 'http://localhost:3000/api/scores';
async function call(provider, abi, call, options) {
    const contract = new contracts_1.Contract(call[0], abi, provider);
    try {
        const params = call[2] || [];
        return await contract[call[1]](...params, options || {});
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.call = call;
async function multicall(network, provider, abi, calls, options) {
    const multicallAbi = [
        'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)'
    ];
    const multi = new contracts_1.Contract(networks_json_1.default[network].multicall, multicallAbi, provider);
    const itf = new abi_1.Interface(abi);
    try {
        const [, res] = await multi.aggregate(calls.map((call) => [
            call[0].toLowerCase(),
            itf.encodeFunctionData(call[1], call[2])
        ]), options || {});
        return res.map((call, i) => itf.decodeFunctionResult(calls[i][1], call));
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.multicall = multicall;
async function subgraphRequest(url, query, options = {}) {
    const res = await (0, cross_fetch_1.default)(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options?.headers
        },
        body: JSON.stringify({ query: (0, json_to_graphql_query_1.jsonToGraphQLQuery)({ query }) })
    });
    const { data } = await res.json();
    return data || {};
}
exports.subgraphRequest = subgraphRequest;
function getUrl(uri, gateway = gateways_json_1.default[0]) {
    const ipfsGateway = `https://${gateway}`;
    if (!uri)
        return null;
    if (!uri.includes('ipfs') && !uri.includes('ipns') && !uri.includes('http'))
        return `${ipfsGateway}/ipfs/${uri}`;
    const uriScheme = uri.split('://')[0];
    if (uriScheme === 'ipfs')
        return uri.replace('ipfs://', `${ipfsGateway}/ipfs/`);
    if (uriScheme === 'ipns')
        return uri.replace('ipns://', `${ipfsGateway}/ipns/`);
    return uri;
}
exports.getUrl = getUrl;
async function ipfsGet(gateway, ipfsHash, protocolType = 'ipfs') {
    const url = `https://${gateway}/${protocolType}/${ipfsHash}`;
    return (0, cross_fetch_1.default)(url).then((res) => res.json());
}
exports.ipfsGet = ipfsGet;
async function sendTransaction(web3, contractAddress, abi, action, params, overrides = {}) {
    const signer = web3.getSigner();
    const contract = new contracts_1.Contract(contractAddress, abi, web3);
    const contractWithSigner = contract.connect(signer);
    // overrides.gasLimit = 12e6;
    return await contractWithSigner[action](...params, overrides);
}
exports.sendTransaction = sendTransaction;
async function getScores(space, strategies, network, provider, addresses, snapshot = 'latest') {
    try {
        const params = {
            space,
            network,
            snapshot,
            strategies,
            addresses
        };
        const res = await (0, cross_fetch_1.default)(exports.SNAPSHOT_SCORE_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ params })
        });
        const obj = await res.json();
        return obj.result.scores;
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.getScores = getScores;
function validateSchema(schema, data) {
    const ajv = new ajv_1.default({ allErrors: true, allowUnionTypes: true, $data: true });
    // @ts-ignore
    (0, ajv_formats_1.default)(ajv);
    const validate = ajv.compile(schema);
    const valid = validate(data);
    return valid ? valid : validate.errors;
}
exports.validateSchema = validateSchema;
exports.default = {
    call,
    multicall,
    subgraphRequest,
    ipfsGet,
    getUrl,
    sendTransaction,
    getScores,
    validateSchema,
    getProvider: provider_1.default,
    signMessage: web3_1.signMessage,
    getBlockNumber: web3_1.getBlockNumber,
    Multicaller: multicaller_1.default,
    validations: validations_1.default,
    getHash: utils_1.getHash,
    verify: utils_1.verify
};
