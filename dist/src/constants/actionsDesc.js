"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = exports.StatsDescription = exports.ShopDescription = void 0;
exports.ShopDescription = "A laptop and Wi-Fi store offers a wide selection of portable computers and wireless networking solutions.\n\r";
exports.StatsDescription = "The player's statistics\n\r";
var Stats = function (player) {
    return "Player's statistics\n\n\rNickname: ".concat(player.nick, "\n\rBalance: ").concat(player.balance, "$\n\r");
};
exports.Stats = Stats;
