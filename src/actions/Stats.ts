import { StatsDescription } from "../constants/actionsDesc";
import { StatsAction } from "../constants/actions";
import { RenderMenu } from "../ui/menu";
import { Player } from "../modules/player";
import { ClearCli, pressBToBack, write } from "../utils/textStyles";

export default {
  title: "Stats",
  desc: StatsDescription,
  action: () => {
    const PlayerStats = Player.readStats();
    write(StatsAction(PlayerStats));
    pressBToBack().then(() => {
      RenderMenu();
    });
  },
};
