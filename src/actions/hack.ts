import { HackDescription } from "../constants/actionsDesc";
import * as mainLine from "readline";
import { RenderMenu } from "../ui/menu";
import * as Colors from "cli-color";
import { Player } from "../modules/player";
import { ClearCli, Loading, errorMsg, write } from "../utils/textStyles";
import { Urls } from "../modules/urls";

export type CmdType = {
  [key: string]: {
    action: (question: string) => unknown;
    middleware?: (arg?: unknown) => unknown;
  };
};

const middlewares = {
  isDefLocation: (): boolean => {
    return Player.isDefaultLocation();
  },
  setPrompt: (line: mainLine.Interface) => {
    let player = Player.readStats();
    line.setPrompt(
      Colors.bold.greenBright(`${player.nick}@${player.laptop}`) +
        `:${Colors.bold.blue(`${player.location}`)}$ `
    );
    line.prompt();
  },
};

const cmds: CmdType = {
  findUrls: {
    middleware: middlewares.isDefLocation,
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
    },
  },
  dropUrls: {
    action: async () => {
      const Url = new Urls();
      await Loading(5);
      Url.dropUrls();
      write(`Your droped ${Url.checkSizeUrls()} urls.\n`);
    },
  },
  checker: {
    action: async (question) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: checker command must have an argument!\n");
        return false;
      }
      if (
        !(arg.includes("http://") || arg.includes("https://")) &&
        !arg.match(/\.[A-za-z]*/g)?.length
      ) {
        errorMsg("Syntax error: checker argument is not url!\n");
        return false;
      }
      const Url = new Urls();
      const { urls } = Url.genUrls();
      const urlIsExist = urls.filter(({ url }) => url === arg)[0];
      if (!urlIsExist) {
        errorMsg("Fatal error: url not exists!\n");
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
            if (code === 401) {
              Url.deleteUrl(arg);
              return "Checker failed";
            } else {
              return urlIsExist.ip;
            }
          })(),
        }
      );
      player.save();
    },
  },
  dos: {
    action: async (question: string) => {
      const [arg, port] = question.split(" ")[1].split(":");
      if (!arg) {
        errorMsg("Syntax error: dos command must have an argument!\n");
        return false;
      }
      if (!arg.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g)) {
        errorMsg("Syntax error: dos argument is not ip!\n");
        return false;
      }
      if (!port) {
        errorMsg(
          "Syntax error: the argument of the dos command should have a port.\n"
        );
        return false;
      }
      const Url = new Urls();
      const url = Url.genUrls().urls.filter(({ ip }) => ip == arg)[0];
      if (!url) {
        errorMsg("Fatal error: ip is not exits!\n");
        return false;
      }
      if (!url.ports.filter((Urlport) => Urlport == +port)[0]) {
        errorMsg("Fatal error: port is not exits!\n");
        return false;
      }
      let packages = 0;
      await new Promise(async (res) => {
        let i = 0;
        while (true) {
          await new Promise((res) => setTimeout(res, 30));
          i++;
          let pkg = Math.floor(Math.random() * 16000);
          packages += pkg;
          write(`Sent ${pkg} packages\n`);
          if (i == 20) break;
        }
        res(true);
      });
      const dosPkg = Url.getDosPkg(url.url);
      if (packages >= dosPkg) {
        Url.updateUrl(url.url, "impressibility", true);
        setTimeout(() => {
          Url.updateUrl(url.url, "impressibility", false);
        }, 30000);
        write(
          `The dos attack has been successfully completed.\nYou have 30 seconds for illegal actions\n`
        );
      } else {
        Url.updateUrl(url.url, "attempts", --url.attempts);
        write(
          `In total, ${packages} packages have been sent. To succeed, need ${dosPkg} packages.\nYou have ${url.attempts} attempts!\n`
        );
        if (!url.attempts) Url.deleteUrl(url.url);
      }
    },
  },
  cat: {
    action: (question) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: cat command must have an argument!\n");
        return false;
      }
      if (arg !== "lastResponse.txt") {
        errorMsg("File does not exist!\n");
        return false;
      }
      const stats = Player.readStats();
      if (!stats.lastHack) {
        write(`File ${arg} is empty.\n`);
      } else {
        write(JSON.stringify(stats.lastHack) + "\n");
      }
    },
  },
  coverTracks: {
    action: async () => {
      ClearCli();
      const stats = Player.readStats();
      if (stats.location !== "~/") {
        write("Start coverTracks\n");
        await Loading(30);
        write(`Covering tracks\n`);
        await Loading(80);
        write(`Cover-up complete\n`);
        new Player(
          stats.nick,
          stats.balance,
          stats.laptop,
          stats.network,
          stats.lastHack,
          "~/",
          stats.dbs
        ).save();
      } else {
        errorMsg("Cover-up unnecessary\n");
        return false;
      }
    },
  },
  downloadDB: {
    action: async () => {
      const stats = Player.readStats();
      if (stats.location !== "~/") {
        write("Start download...\n");
        await Loading(80);
        write("Download finish\n");
        new Player(
          stats.nick,
          stats.balance,
          stats.laptop,
          stats.network,
          stats.lastHack,
          stats.location,
          [...stats.dbs, stats.location]
        ).save();
      } else {
        errorMsg("Fatal error: Database not found.\n");
        return false;
      }
    },
  },
  bruteForce: {
    action: async (question: string) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: bruteForce command must have an argument!\n");
        return false;
      }
      const Url = new Urls();
      const { urls } = Url.readUrls();
      const currentUrl = urls.filter(({ adminNick }) => arg === adminNick)[0];
      if (!currentUrl) {
        errorMsg(`Fatal error: ${arg} is not exists!\n`);
        return false;
      }
      if (!currentUrl.impressibility) {
        errorMsg(`Fatal error: ${currentUrl.url} is not impressibility!\n`);
        return false;
      }
      await Loading(50);
      const stats = Player.readStats();
      const player = new Player(
        stats.nick,
        stats.balance,
        stats.laptop,
        stats.network,
        stats.lastHack,
        currentUrl.url
      );
      player.save();
    },
  },
  scanPort: {
    action: (question: string) => {
      const arg = question.split(" ")[1];
      if (!arg) {
        errorMsg("Syntax error: scanPort command must have an argument!\n");
        return false;
      }
      if (!arg.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g)) {
        errorMsg("Syntax error: scanPort argument is not ip!\n");
        return false;
      }
      const Url = new Urls();
      const url = Url.genUrls().urls.filter(({ ip }) => ip == arg)[0];
      if (!url) {
        errorMsg("Fatal error: ip is not exits!\n");
        return false;
      }
      write(`Open ports: [${url.ports}]\n`);
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

async function handleCmd() {
  ClearCli();
  write(Colors.bgBlack("Print 'exit' for terminal exit\n\n\r"));
  renderTerminal();
}
