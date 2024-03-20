"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNick = void 0;
var questions_1 = require("../constants/questions");
var textStyles_1 = require("./textStyles");
var Colors = require("cli-color");
var setNick = function () {
    var nick = (0, textStyles_1.Answer)(Colors.blue(questions_1.setNickname));
    if (nick.length === 0) {
        return "Anonymous";
    }
    else
        return nick;
};
exports.setNick = setNick;
