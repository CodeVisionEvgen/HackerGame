import { ShopDescription } from "../constants/actionsDesc";
import { Player } from "../modules/player";
import { RenderMenu } from "../ui/menu";
import { ClearCli, write } from "../utils/textStyles";
import * as Colors from "cli-color";
import * as ReadLine from "readline-sync";
type shopItem = {
  name: string;
  cost?: number;
};

export type laptopType = {
  chanceOfSuccess: number;
} & shopItem;

export type networkType = {
  speed: number;
} & shopItem;

export const laptops: laptopType[] = [
  {
    name: "Emachines-E525",
    cost: 0,
    chanceOfSuccess: 2,
  },
  {
    name: "HP-Stream-14",
    cost: 3077,
    chanceOfSuccess: 3,
  },
  {
    name: "Dell-Inspiron-15-3000",
    cost: 3846,
    chanceOfSuccess: 4,
  },
  {
    name: "Acer-Aspire-5",
    cost: 4615,
    chanceOfSuccess: 5,
  },
  {
    name: "Lenovo-Ideapad-3",
    cost: 5385,
    chanceOfSuccess: 6,
  },
  {
    name: "HP-Pavilion-15",
    cost: 6154,
    chanceOfSuccess: 7,
  },
  {
    name: "Dell XPS 13",
    cost: 9231,
    chanceOfSuccess: 8,
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    cost: 10769,
    chanceOfSuccess: 9,
  },
  {
    name: "MacBook Air",
    cost: 11538,
    chanceOfSuccess: 10,
  },
  {
    name: "Microsoft Surface Laptop 4",
    cost: 13077,
    chanceOfSuccess: 11,
  },
  {
    name: "MacBook Pro",
    cost: 16923,
    chanceOfSuccess: 12,
  },
  {
    name: "Hackbook",
    cost: 59430,
    chanceOfSuccess: 50,
  },
];

export const networks: networkType[] = [
  {
    name: "2G",
    cost: 0,
    speed: 1,
  },
  {
    name: "3G",
    cost: 14320,
    speed: 2,
  },
  {
    name: "4G",
    cost: 18724,
    speed: 5,
  },
  {
    name: "5G",
    cost: 23244,
    speed: 10,
  },
];

export default {
  title: "Shop",
  desc: ShopDescription,
  action: renderShop,
};

async function renderShop() {
  ClearCli();
  const stats = Player.readStats();
  write(Colors.bgBlack("Shop menu select your action\n\n"));
  const actions = [
    {
      title: "Exit",
      action: () => {
        RenderMenu();
      },
    },
    {
      title: "Upgrage laptop",
      alias: laptops,
      key: "laptop",
      action: function () {
        // @ts-ignore
        const upgradeKey: laptopType = stats[this.key];
        const item = this.alias[
          this.alias.findIndex(
            (val: laptopType) => val.name == upgradeKey.name
          ) + 1
        ] as laptopType;
        if (item && stats.balance >= item.cost) {
          const player = new Player(
            stats.nick,
            stats.balance - item.cost,
            item,
            stats.network,
            stats.lastHack,
            stats.location,
            stats.dbs
          );
          player.save();
        }
        renderShop();
      },
    },
    {
      title: "Upgrade network",
      alias: networks,
      key: "network",
      action: function () {
        // @ts-ignore
        const upgradeKey: networkType = stats[this.key];
        const item = this.alias[
          this.alias.findIndex(
            (val: networkType) => val.name == upgradeKey.name
          ) + 1
        ] as networkType;
        if (item && stats.balance >= item.cost) {
          const player = new Player(
            stats.nick,
            stats.balance - item.cost,
            stats.laptop,
            item,
            stats.lastHack,
            stats.location,
            stats.dbs
          );
          player.save();
        }
        renderShop();
      },
    },
  ];
  actions.forEach((el, i) => {
    if (el.alias) {
      // @ts-ignore
      const key = stats[el.key];
      const item =
        el.alias[el.alias.findIndex((val) => val.name == key.name) + 1];
      if (item) {
        write(`[${i}] ${el.title} to ${item.name} $${item.cost}\n`);
      } else {
        write(`[${i}] ${el.title} MAXIMUM\n`);
      }
    } else {
      write(`[${i}] ${el.title}\n`);
    }
  });
  const key = ReadLine.keyIn(
    `Select your action [0-${actions.length - 1}]\n\r`
  );
  if (+key <= actions.length - 1 || +key == 0) {
    ClearCli();
    actions[+key].action();
  } else {
    renderShop();
  }
}
