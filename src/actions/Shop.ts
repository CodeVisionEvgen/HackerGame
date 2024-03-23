import { ShopDescription } from "../constants/actionsDesc";
import { RenderMenu } from "../ui/menu";
import { write } from "../utils/textStyles";
import * as Colors from "cli-color";

type shopItem = {
  name: string;
  cost: number;
};

type laptopType = {
  chanceOfSuccess: number;
} & shopItem;

type networkType = {
  speed: number;
} & shopItem;

interface IProduct {
  laptop: laptopType[];
  network: networkType[];
}

const laptops: laptopType[] = [];
const networks: networkType[] = [];

export const GameProducts: IProduct = {
  laptop: laptops,
  network: networks,
};

export default {
  title: "Shop",
  desc: ShopDescription,
  action: renderShop,
};

async function renderShop() {
  write(Colors.bgBlack("Shop menu select your action\n\n"));
}
