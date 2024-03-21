import { IPlayer } from "../modules/player";
import { Answer, ClearCli, pressBToBack, write } from "../utils/textStyles";
import * as fse from "fs-extra";
import * as Colors from "cli-color";
import * as ReadLine from "readline-sync";

export interface IAction {
  title: string;
  desc: string;
  action: () => any;
}

export const RenderMenu = async () => {
  ClearCli();
  const actions: IAction[] = [];
  write(Colors.bgBlack("Main menu select your action\n\r\n"));
  const actionFiles = fse.readdirSync("src/actions");
  await Promise.all(
    actionFiles.map(async (action, i) => {
      const module: { default: IAction } = await import(
        `${process.cwd()}/src/actions/${action}`
      );
      actions.push(module.default);
      write(`[${i}] ${module.default.title}: ${module.default.desc}`);
    })
  );
  const key = ReadLine.keyIn(
    `Select your action [0-${actions.length - 1}]\n\r`
  );
  if (+key <= actions.length - 1 || +key == 0) {
    ClearCli();
    actions[+key].action();
  } else {
    RenderMenu();
  }
};
