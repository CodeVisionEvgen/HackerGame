import { HackDescription } from "../constants/actionsDesc";
import * as ReadLine from "readline-sync";
import { RenderMenu } from "../ui/menu";
import * as Colors from "cli-color";
import { Player } from "../utils/player";
import { ClearCli, LazyText, Loading, write } from "../utils/textStyles";
import * as crypto from "crypto";
import { domains } from "../constants/hack";

export type CmdType = {
  [key: string]: {
    action: () => unknown;
  };
};

const genUrls = (count: number = 10) => {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const random = crypto.generateKeySync("hmac", {
      length: 150 + Math.abs(+(Math.random() * 100).toFixed(0)),
    });
    result.push(
      (+Math.abs(Math.random() * 10).toFixed(0) % 2 ? "https://" : "http://") +
        random.export().toString("hex") +
        domains[Math.floor(Math.random() * domains.length)]
    );
  }
  return result;
};

const cmds: CmdType = {
  findUrls: {
    action: async () => {
      const urls = genUrls();
      await Loading();
      urls.forEach((url) => {
        write(url + "\n");
      });
      renderTerminal();
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
  title: "Try hack",
  desc: HackDescription,
  action: handleCmd,
};

function renderTerminal() {
  const player = Player.readStats();
  while (true) {
    let question = ReadLine.prompt({
      prompt:
        Colors.bold.greenBright(`${player.nick}@${player.laptop}`) +
        `:${Colors.blue("~")}$ `,
    });
    if (!cmds[question]) {
      write(Colors.bold.red(`Command '${question}' not found!\n\r`));
    } else {
      cmds[question].action();
      break;
    }
  }
}

async function handleCmd() {
  ClearCli();
  write(Colors.bgBlack("Print 'exit' for terminal exit\n\n\r"));
  renderTerminal();
}
