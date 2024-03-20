"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var fse = require("fs-extra");
var Player = (function () {
    function Player(nick, balance) {
        this.nick = nick;
        this.balance = balance;
        this.pathStats = process.cwd() + "/stats/player.json";
    }
    Player.checkPlayer = function () {
        return fse.existsSync(process.cwd() + "/stats/player.json");
    };
    Player.readStats = function () {
        return JSON.parse(fse.readFileSync(process.cwd() + "/stats/player.json").toString("utf8"));
    };
    Player.prototype.getStats = function () {
        return __assign({}, this);
    };
    Player.prototype.save = function () {
        if (!fse.existsSync(this.pathStats)) {
            fse.createFileSync(this.pathStats);
        }
        else {
            fse.createFileSync(this.pathStats);
        }
        fse.writeFileSync(this.pathStats, JSON.stringify({
            nick: this.nick,
            balance: this.balance,
        }));
    };
    return Player;
}());
exports.Player = Player;
