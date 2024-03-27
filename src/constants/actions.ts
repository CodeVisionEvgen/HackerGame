import { IPlayer } from "../modules/player";

export const HelpAction = `findUrls: Use this command to search URLs.
Upon execution, you will receive a list of all URLs found on the web.
Syntax: findUrls

checker: Use this command to scan for ip addresses in a domain name.
Syntax: checker [website_url]

scanPort: Use this command to scan ports on the specified web server.
It will help you find open ports and potential vulnerabilities for further exploitation.
Syntax: scanPort [website_ip]

dos: Use this command to create a new vulnerability on the server.
Syntax: dos [website_ip:port]

bruteForce: Use this command to brute force login as an administrator.
Syntax: bruteForce [admin_nick]

Other cmds: dropUrls, downloadDB, coverTracks.
`;
export const StatsAction = (player: IPlayer) =>
  `Player's statistics\n\n\rNickname: ${player.nick}\n\rBalance: ${player.balance}$\n\rLaptop: ${player.laptop.name}\n\rNetwork: ${player.network.name}\n\r`;
