import { DarkWebDescription } from "../constants/actionsDesc";
import {
  ClearCli,
  LazyText,
  Loading,
  StrictSize,
  errorMsg,
  write,
} from "../utils/textStyles";
import * as Colors from "cli-color";
import { Player } from "../modules/player";
import * as mainLine from "readline";
import { CmdType } from "./hack";
import { RenderMenu } from "../ui/menu";
import { domains } from "../constants/hack";
const middlewares = {
  setPrompt: (line: mainLine.Interface) => {
    line.setPrompt(Colors.bold.green(`Anonymous: `));
    line.prompt();
  },
};

const cmds: CmdType = {
  sellDB: {
    action: async () => {
      const stats = Player.readStats();
      const domainsValue = (): any => {
        return stats.dbs.reduce((acc, curr) => {
          const dom = `.${curr.split(".")[1]}`;
          const finded = domains.find(({ domain }) => dom === domain);
          return (acc += finded.dosPkg / 100);
        }, 0);
      };
      if (!domainsValue()) {
        errorMsg("You have nothing to sell.\n");
        return false;
      }
      await LazyText(Colors.greenBright(`Finding buyers...\n`), 100);
      await Loading(200);
      await LazyText(Colors.greenBright(`Selling dbs...\n`), 50);
      write(Colors.greenBright(`Dbs has been successfully sold.\n`));
      write(Colors.greenBright(`You have received $${domainsValue()}.\n`));

      const player = new Player(
        stats.nick,
        domainsValue(),
        stats.laptop,
        stats.network,
        undefined,
        undefined,
        []
      );
      player.save();
    },
  },
  showProducts: {
    action: () => {
      errorMsg("There are no items to buy.\n");
    },
  },
  exit: {
    action: () => {
      ClearCli();
      RenderMenu();
    },
  },
};

export default {
  title: "DarkWeb",
  desc: DarkWebDescription,
  action: darkWebInit,
};

async function darkWebInit() {
  ClearCli();
  write(Colors.bgBlack("Print 'exit' for DarkWeb exit\n\n\r"));
  write(
    Colors.bgGreenBright.bold(
      StrictSize(`Write the command 'sellDB' for selling dbs`)
    ) + "\n"
  );
  write(
    Colors.bgGreenBright.bold(
      StrictSize(
        `Please write the command 'showProducts' to see the available services`
      ) + "\n\n"
    )
  );
  await LazyText(Colors.greenBright(`Connecting to the darknet.\n`), 50);
  write(Colors.greenBright(`Connect successfyl.\n\n`));
  const line = mainLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  middlewares.setPrompt(line);

  line.on("line", async (question) => {
    if (!cmds[question.split(" ")[0]]) {
      errorMsg(`Command '${question}' not found!\n`);
      middlewares.setPrompt(line);
    } else if (question === "exit") {
      cmds[question.split(" ")[0]].action(question);
      line.close();
    } else {
      const cmd = cmds[question.split(" ")[0]];
      if (cmd.middleware && !cmd.middleware()) {
        errorMsg(`Command '${question}' not found!\n`);
        middlewares.setPrompt(line);
      } else {
        await cmd.action(question);
        middlewares.setPrompt(line);
      }
    }
  });
}
