import * as ReadLine from "readline-sync";
import { PressToBack } from "../constants/other";
import * as Colors from "cli-color";
export const LazyText = async (str: string, time = 10): Promise<void> => {
  return new Promise((res) => {
    let i = 0;
    str = str.replace(/\. /g, ". \n\r");
    const printInterval = setInterval(() => {
      process.stdin.write(str[i++] || "\n\r");
      if (i == str.length) res(clearInterval(printInterval));
    }, time);
  });
};
export const Answer = (str: string) => {
  return ReadLine.question(str);
};
export const ClearCli = (): void => {
  console.clear();
};
export async function Loading(): Promise<string> {
  return new Promise(async (res) => {
    let percent = 0;
    let line = "______________________________";
    const totalSymbols = 30;
    while (true) {
      await new Promise((res) => setTimeout(res, 50));
      percent++;
      const completedSymbols = Math.floor((percent / 100) * totalSymbols);
      const remainingSymbols = totalSymbols - completedSymbols;
      line = "#".repeat(completedSymbols) + "_".repeat(remainingSymbols);
      process.stdout.write(`\r${line} (${percent}%)`);
      if (percent === 100) {
        process.stdout.write("\n");
        res(`\r${line} (${percent}%)`);
        break;
      }
    }
  });
}
export const write = (str: string): void => {
  process.stdin.write(str);
};
export const pressBToBack = () => {
  return new Promise((res) => {
    write("\n" + Colors.bgYellow(PressToBack));
    while (true) {
      const key = ReadLine.keyIn("", {
        hideEchoBack: true,
        mask: "",
      });
      // @ts-ignore
      if (key.toUpperCase() === "B") {
        res(1);
        break;
      }
    }
  });
};
