"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionsDesc_1 = require("../constants/actionsDesc");
var player_1 = require("../utils/player");
exports.default = {
    title: "Stats",
    desc: actionsDesc_1.StatsDescription,
    action: function (stats) {
        var PlayerStats = player_1.Player.readStats();
        return (0, actionsDesc_1.Stats)(PlayerStats);
    },
};
