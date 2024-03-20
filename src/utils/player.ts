import * as fse from "fs-extra";
export interface IPlayer {
  nick: string;
  laptop: string;
  balance: number;
  network: string;
  lastHack?: string;
}
export class Player implements IPlayer {
  nick: string;
  laptop: string;
  balance: number;
  network: string;
  lastHack?: string;
  pathStats: string;
  constructor(
    nick: string,
    balance: number,
    laptop: string,
    network: string,
    lastHack: string = ""
  ) {
    this.nick = nick;
    this.balance = balance;
    this.laptop = laptop;
    this.network = network;
    this.lastHack = lastHack;
    this.pathStats = process.cwd() + "/stats/player.json";
  }
  updateStats(key: string, val: unknown) {
    // @ts-ignore
    if (!this[key]) {
      throw new Error(`Error: stats[${key}] is undefined`);
    }
    // @ts-ignore
    this[key] = val;
    console.log(this);
    this.save();
  }
  static checkPlayer() {
    return fse.existsSync(process.cwd() + "/stats/player.json");
  }
  static readStats(): IPlayer {
    return JSON.parse(
      fse.readFileSync(process.cwd() + "/stats/player.json").toString("utf8")
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
