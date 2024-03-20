import { ExitDescription } from "../constants/actionsDesc";
import { ClearCli, write } from "../utils/textStyles";

export default {
  title: "Exit",
  desc: ExitDescription,
  action: () => {
    ClearCli();
    write("Exit...\n\r");
    process.exit(1);
  },
};
