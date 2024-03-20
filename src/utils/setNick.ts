import { setNickname } from "../constants/questions";
import { Answer } from "./textStyles";
import * as Colors from "cli-color";

export const setNick = () => {
  const nick = Answer(Colors.blue(setNickname));
  if (nick.length === 0) {
    return "Anonymous";
  } else return nick;
};
