import { setNickname } from "../constants/questions";
import { Answer } from "../utils/textStyles";
import * as Colors from "cli-color";
import * as fse from "fs-extra";
export type LastHackType = { domain: string; code: number; data: string };
export interface IPlayer {
  nick: string;
  laptop: string;
  balance: number;
  network: string;
  lastHack?: LastHackType;
}
export class Player implements IPlayer {
  nick: string;
  laptop: string;
  balance: number;
  network: string;
  lastHack?: LastHackType;
  pathStats: string;
  constructor(
    nick: string,
    balance: number,
    laptop: string,
    network: string,
    lastHack: LastHackType = {
      domain: "none",
      code: NaN,
      data: "none",
    }
  ) {
    this.nick = nick;
    this.balance = balance;
    this.laptop = laptop;
    this.network = network;
    this.lastHack = lastHack;
    this.pathStats = process.cwd() + "/data/player.json";
  }
  updateStats(key: string, val: unknown) {
    // @ts-ignore
    if (!this[key]) {
      throw new Error(`Error: stats[${key}] is undefined`);
    }
    // @ts-ignore
    this[key] = val;
    this.save();
  }

  static setNick = () => {
    const nick = Answer(Colors.blue(setNickname));
    if (nick.length === 0) {
      return "Anonymous";
    } else return nick;
  };

  static checkPlayer() {
    return fse.existsSync(process.cwd() + "/data/player.json");
  }
  static readStats(): IPlayer {
    return JSON.parse(
      fse.readFileSync(process.cwd() + "/data/player.json").toString("utf8")
    );
  }
  getStats(): IPlayer {
    return { ...this };
  }
  save(): void {
    if (!fse.existsSync(this.pathStats)) {
      fse.createFileSync(this.pathStats);
    } else {
      fse.createFileSync(this.pathStats);
    }
    fse.writeFileSync(
      this.pathStats,
      JSON.stringify({
        nick: this.nick,
        balance: this.balance,
        laptop: this.laptop,
        network: this.network,
        lastHack: this.lastHack,
      })
    );
  }
}
