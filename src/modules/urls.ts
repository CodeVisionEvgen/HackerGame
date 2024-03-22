import * as crypto from "crypto";
import * as fse from "fs-extra";
import { uniqueNamesGenerator, starWars, colors } from "unique-names-generator";
import { domains } from "../constants/hack";
export type UrlType = {
  url: string;
  ip: string;
  successPort: number;
  ports: number[];
  adminNick: string;
  attempts: number;
  impressibility: boolean;
};
export type UrlsType = {
  urls: UrlType[];
};
export type FieldsUrlType =
  | "url"
  | "ip"
  | "ports"
  | "attempts"
  | "impressibility";

export class Urls {
  pathUrls: "data/urls.json";
  urlObj: UrlsType;
  constructor() {
    this.pathUrls = "data/urls.json";
    if (fse.existsSync(this.pathUrls))
      this.urlObj = fse.readJsonSync(this.pathUrls);
    else this.urlObj = { urls: [] };
  }
  protected genIp() {
    const a = () => Math.floor(Math.random() * 255);
    return `${a()}.${a()}.${a()}.${a()}`;
  }
  getDosPkg(url: string): number {
    const domen = "." + url.split(".")[1];
    return domains.filter(({ domain }) => domain == domen)[0].dosPkg;
  }
  updateUrl(updUrl: string, field: FieldsUrlType, data: unknown): void {
    fse.writeFileSync(
      this.pathUrls,
      JSON.stringify({
        urls: this.urlObj.urls.map((url) => {
          if (url.url == updUrl) {
            // @ts-ignore
            url[field] = data;
          }
          return url;
        }),
      })
    );
  }
  deleteUrl(delUrl: string): void {
    fse.writeFileSync(
      this.pathUrls,
      JSON.stringify({
        urls: this.urlObj.urls.filter(({ url }) => url !== delUrl),
      })
    );
  }
  dropUrls = (): void => {
    if (fse.existsSync(this.pathUrls)) {
      fse.createFileSync(this.pathUrls);
      fse.removeSync(this.pathUrls);
    }
  };
  readUrls = (): null | UrlsType => {
    if (fse.existsSync(this.pathUrls)) return fse.readJsonSync(this.pathUrls);
    else return null;
  };
  checkSizeUrls = () => {
    return this.urlObj.urls.length;
  };

  genUrls = (count: number = 10): UrlsType => {
    let result: UrlsType = { urls: [] };
    if (this.checkSizeUrls() === 0) {
      for (let i = 0; i < count; i++) {
        let ports: number[] = [];
        let iterationPorts: number = Math.floor(Math.random() * 5) || 1;

        while (iterationPorts) {
          --iterationPorts;
          ports.push(Math.floor(Math.random() * 28000) + 2000);
        }
        const random = crypto.generateKeySync("hmac", {
          length: 150 + Math.abs(+(Math.random() * 100).toFixed(0)),
        });
        result.urls.push({
          url:
            (+Math.abs(Math.random() * 10).toFixed(0) % 2
              ? "https://"
              : "http://") +
            random.export().toString("hex") +
            domains[Math.floor(Math.random() * domains.length)].domain,
          ip: this.genIp(),
          successPort: ports[Math.floor(Math.random() * ports.length)],
          ports: ports,
          attempts: 3,
          impressibility: false,
          adminNick: uniqueNamesGenerator({
            separator: "-",
            style: "capital",
            dictionaries: [colors, starWars],
          }).replace(/ /g, "-"),
        });
      }
      this.urlObj = result;
      this.saveUrls();
    } else result = this.urlObj;
    return result;
  };
  saveUrls(): void {
    if (!fse.existsSync(this.pathUrls)) {
      fse.createFileSync(this.pathUrls);
    }
    fse.writeFileSync(this.pathUrls, JSON.stringify(this.urlObj));
  }
}
