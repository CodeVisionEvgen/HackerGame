import { DarkWebDescription } from "../constants/actionsDesc";
import { ClearCli, StrictSize, errorMsg, write } from "../utils/textStyles";
import * as Colors from "cli-color";
import { Player } from "../modules/player";
import * as mainLine from "readline";
import { CmdType } from "./hack";
import { RenderMenu } from "../ui/menu";
const middlewares = {
  setPrompt: (line: mainLine.Interface) => {
    line.setPrompt(Colors.bold.green(`Anonymous: `));
    line.prompt();
  },
};

const cmds: CmdType = {
  sellDB: {
    action: () => {},
  },
  showProducts: {
    action: () => {},
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

function darkWebInit() {
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
