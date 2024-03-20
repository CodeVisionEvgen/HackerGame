import { HelpAction } from "../constants/actions";
import { HelpDescription } from "../constants/actionsDesc";
import { RenderMenu } from "../ui/menu";
import { ClearCli, LazyText, pressBToBack, write } from "../utils/textStyles";
export default {
  title: "Help",
  desc: HelpDescription,
  action: () => {
    ClearCli();
    write(HelpAction);
    pressBToBack().then(() => {
      RenderMenu();
    });
  },
};
