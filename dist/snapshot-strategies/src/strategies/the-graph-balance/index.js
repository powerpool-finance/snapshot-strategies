"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const baseStrategy_1 = require("../the-graph/baseStrategy");
exports.author = 'davekaj';
exports.version = '0.1.0';
async function strategy(_space, network, _provider, addresses, _options, snapshot) {
    return await (0, baseStrategy_1.baseStrategy)(_space, network, _provider, addresses, _options, snapshot);
}
exports.strategy = strategy;
