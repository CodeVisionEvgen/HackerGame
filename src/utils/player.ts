import * as fse from "fs-extra";
export interface IPlayer {
  nick: string;
  laptop: string;
  balance: number;
  network: string;
  lastHack?: Date | null;
}
export class Player implements IPlayer {
  nick: string;
  laptop: string;
  balance: number;
  network: string;
  lastHack?: Date | null;
  pathStats: string;
  constructor(
    nick: string,
    balance: number,
    laptop: string,
    network: string,
    lastHack: Date | null = null
  ) {
    this.nick = nick;
    this.balance = balance;
    this.laptop = laptop;
    this.network = network;
    this.lastHack = lastHack;
    this.pathStats = process.cwd() + "/stats/player.json";
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
