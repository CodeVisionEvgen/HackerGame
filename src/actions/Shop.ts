import { ShopDescription } from "../constants/actionsDesc";
import { RenderMenu } from "../ui/menu";
import { pressBToBack, write } from "../utils/textStyles";

export default {
  title: "Shop",
  desc: ShopDescription,
  action: () => {
    write("Hello sgop");
    pressBToBack().then(() => {
      RenderMenu();
    });
  },
};
