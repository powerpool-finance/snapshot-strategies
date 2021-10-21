"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function validate(author, space, proposal, options) {
    const strategies = options.strategies || space.strategies;
    const onlyMembers = options.onlyMembers || space.filters?.onlyMembers;
    const minScore = options.minScore || space.filters?.minScore;
    const members = (space.members || []).map((address) => address.toLowerCase());
    if (members.includes(author.toLowerCase()))
        return true;
    if (onlyMembers)
        return false;
    if (minScore) {
        const scores = await (0, utils_1.getScores)(space.id || space.key, strategies, space.network, '', [author]);
        const totalScore = scores
            .map((score) => Object.values(score).reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0);
        if (totalScore < minScore)
            return false;
    }
    return true;
}
exports.default = validate;
