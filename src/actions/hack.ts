import { HackDescription } from "../constants/actionsDesc";
import * as ReadLine from "readline-sync";
import { RenderMenu } from "../ui/menu";
import * as Colors from "cli-color";
import { Player } from "../modules/player";
import { ClearCli, Loading, errorMsg, write } from "../utils/textStyles";
import { Urls } from "../modules/urls";

export type CmdType = {
  [key: string]: {
    action: (question: string) => unknown;
  };
};

const cmds: CmdType = {
  findUrls: {
    action: async () => {
      const Url = new Urls();
      if (Url.checkSizeUrls()) {
        write(`Your have cache ${Url.checkSizeUrls()} urls.\n`);
        Url.genUrls().urls.forEach((url) => {
          write(url.url + "\n");
        });
      } else {
        await Loading(10);
        Url.genUrls().urls.forEach((url) => {
          write(url.url + "\n");
        });
      }
      renderTerminal();
    },
  },
  dropUrls: {
    action: async () => {
      const Url = new Urls();
      await Loading(1);
      Url.dropUrls();
      write(`Your droped ${Url.checkSizeUrls()} urls.\n`);
      renderTerminal();
    },
  },
  checker: {
    action: async (question) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: checker command must have an argument!\n");
        renderTerminal();
        return false;
      }
      if (
        !(arg.includes("http://") || arg.includes("https://")) &&
        !arg.match(/\.[A-za-z]*/g)?.length
      ) {
        errorMsg("Syntax error: checker argument is not url!\n");
        renderTerminal();
        return false;
      }
      const Url = new Urls();
      const { urls } = Url.genUrls();
      const urlIsExist = urls.filter(({ url }) => url === arg)[0];
      if (!urlIsExist) {
        errorMsg("Fatal error: url not exists!\n");
        renderTerminal();
        return false;
      }
      write(`Request to: ${arg}\n`);
      await Loading(30);
      write(
        `Response from: ${arg} save in lastResponse.txt\nTry 'cat lastResponse.txt' to see response.\n`
      );
      const stats = Player.readStats();
      const code = [200, 401][Math.floor(Math.random() * 2)];
      const player = new Player(
        stats.nick,
        stats.balance,
        stats.laptop,
        stats.network,
        {
          domain: arg,
          code,
          ip: (() => {
            Url.deleteUrl(arg);
            if (code === 401) {
              return "Checker failed";
            } else {
              return urlIsExist.ip;
            }
          })(),
        }
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
        write(JSON.stringify(stats.lastHack) + "\n");
      }
      renderTerminal();
    },
  },
  scanPort: {
    action: (question: string) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: scanPort command must have an argument!\n");
        renderTerminal();
        return () => false;
      }
      if (
        !(arg.includes("http://") || arg.includes("https://")) &&
        !arg.match(/\.[A-za-z]*/g)?.length
      ) {
        errorMsg("Syntax error: scanPort argument is not url!\n");
        renderTerminal();
        return () => false;
      }
      RenderMenu();
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
