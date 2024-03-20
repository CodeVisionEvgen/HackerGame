import { PressToContinue } from "../constants/other";
import { DoYouReady } from "../constants/questions";
import { StartGreeting } from "../constants/start";
import { Answer, ClearCli, LazyText, write } from "../utils/textStyles";
import * as Colors from "cli-color";

export async function Greeting() {
  return new Promise((res) => {
    async function ready() {
      ClearCli();
      const isReady = Answer(Colors.green(DoYouReady));
      switch (isReady.toLowerCase()) {
        case "yes":
          ClearCli();
          await LazyText(Colors.red(StartGreeting));
          Answer(Colors.bgYellow.white.bold(PressToContinue));
          ClearCli();
          res(true);
          break;
        case "no":
          ClearCli();
          write(Colors.redBright.underline("Bye bye noob.\n\r"));
          process.exit(1);
          break;
        default:
          ready();
          break;
      }
    }
    ready();
  });
}
