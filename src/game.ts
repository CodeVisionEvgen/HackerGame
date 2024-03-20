import { setNick } from "./utils/setNick";
import { Greeting } from "./ui/greeting";
import { RenderMenu } from "./ui/menu";
import { Player } from "./utils/player";

setInterval(() => {}, 100000);

async function main() {
  if (!Player.checkPlayer()) {
    await Greeting();
    const nick = setNick();
    const player = new Player(nick, 0, "Dell-Latitude-E6400", "2G");
    player.save();
  }
  RenderMenu();
}

main().catch((err) => {
  throw new Error(err);
});
