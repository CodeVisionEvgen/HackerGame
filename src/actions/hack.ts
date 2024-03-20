import { HackDescription } from "../constants/actionsDesc";
import * as ReadLine from "readline-sync";
import { RenderMenu } from "../ui/menu";
import * as Colors from "cli-color";
import { Player } from "../utils/player";
import { ClearCli, Loading, errorMsg, write } from "../utils/textStyles";
import * as crypto from "crypto";
import { domains } from "../constants/hack";

export type CmdType = {
  [key: string]: {
    action: (question: string) => unknown;
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
        domains[Math.floor(Math.random() * domains.length)].domain
    );
  }
  return result;
};

const cmds: CmdType = {
  findUrls: {
    action: async () => {
      const urls = genUrls();
      await Loading(10);
      urls.forEach((url) => {
        write(url + "\n");
      });
      renderTerminal();
    },
  },
  curl: {
    action: async (question) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: curl command must have an argument!\n");
        renderTerminal();
        return false;
      }
      if (
        !(arg.includes("http://") || arg.includes("https://")) &&
        !arg.match(/\.[A-za-z]*/g)?.length
      ) {
        errorMsg("Syntax error: curl argument is not url!\n");
        renderTerminal();
        return false;
      }
      write(`Request to: ${arg}\n`);
      await Loading(30);
      write(
        `Response from: ${arg} save in lastResponse.txt\nTry 'cat lastResponse.txt' to see response.\n`
      );
      const stats = Player.readStats();
      const player = new Player(
        stats.nick,
        stats.balance,
        stats.laptop,
        stats.network,
        arg
      );
      player.save();
      renderTerminal();
    },
  },
  cat: {
    action: (question) => {
      const arg = question.split(" ")[1];
      // const operation = question.split(/\|/)[1];
      if (!arg) {
        errorMsg("Syntax error: cat command must have an argument!\n");
        renderTerminal();
        return false;
      }
      if (arg !== "lastResponse.txt") {
        errorMsg("File does not exist!\n");
        renderTerminal();
        return false;
      }
      const stats = Player.readStats();
      if (!stats.lastHack) {
        write(`File ${arg} is empty.\n`);
      } else {
        // if(operation.includes('grep')) {
        // stats.lastHack.match()
        // }
        // else
        write(stats.lastHack + "\n");
      }
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
    if (!cmds[question.split(" ")[0]]) {
      errorMsg(`Command '${question}' not found!\n\r`);
    } else {
      cmds[question.split(" ")[0]].action(question);
      break;
    }
  }
}

async function handleCmd() {
  ClearCli();
  write(Colors.bgBlack("Print 'exit' for terminal exit\n\n\r"));
  renderTerminal();
}
