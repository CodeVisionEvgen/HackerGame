import { IPlayer } from "../utils/player";

export const HelpAction = `findUrls: Use this command to search URLs.
Upon execution, you will receive a list of all URLs found on the web.
Syntax: findUrls

grep: After using the findUrls command, you can utilize grep to search for specific words or phrases within the content of those URLs.
This command will filter the results and display only the lines containing the specified keyword.
Syntax: grep [keyword] [target_url]

scanPort: Use this command to scan ports on the specified web server.
It will help you find open ports and potential vulnerabilities for further exploitation.
Syntax: scanPort [website_url]

Purchase diverse software and guides to expand your list of commands.
`;
export const StatsAction = (player: IPlayer) =>
  `Player's statistics\n\n\rNickname: ${player.nick}\n\rBalance: ${player.balance}$\n\rLaptop: ${player.laptop}\n\rNetwork: ${player.network}\n\r`;
