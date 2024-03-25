import { Greeting } from "./ui/greeting";
import { RenderMenu } from "./ui/menu";
import { Player } from "./modules/player";
import { laptops, networks } from "./actions/Shop";

setInterval(() => {}, 100000);

async function main() {
  if (!Player.checkPlayer()) {
    await Greeting();
    const nick = Player.setNick();
    const player = new Player(
      nick,
      0,
      laptops[0],
      networks[0],
      undefined,
      "~/"
    );
    player.save();
  }
  RenderMenu();
}

main().catch((err) => {
  throw new Error(err);
});
