import * as crypto from "crypto";
import * as fse from "fs-extra";
import { domains } from "../constants/hack";
export type UrlsType = {
  urls: string[];
};

export class Urls {
  pathUrls: "data/urls.json";
  urlObj: UrlsType;
  constructor() {
    this.pathUrls = "data/urls.json";
    if (fse.existsSync(this.pathUrls))
      this.urlObj = fse.readJsonSync(this.pathUrls);
    else this.urlObj = { urls: [] };
  }
  dropUrls = (): void => {
    fse.removeSync(this.pathUrls);
  };
  readUrls = (): null | UrlsType[] => {
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
        const random = crypto.generateKeySync("hmac", {
          length: 150 + Math.abs(+(Math.random() * 100).toFixed(0)),
        });
        result.urls.push(
          (+Math.abs(Math.random() * 10).toFixed(0) % 2
            ? "https://"
            : "http://") +
            random.export().toString("hex") +
            domains[Math.floor(Math.random() * domains.length)].domain
        );
      }
      this.urlObj = result;
      this.saveUrls();
    } else result = this.urlObj;
    return result;
  };
  saveUrls(): void {
    if (!fse.existsSync(this.pathUrls)) {
      fse.createFileSync(this.pathUrls);
    } else {
      fse.createFileSync(this.pathUrls);
    }
    fse.writeFileSync(this.pathUrls, JSON.stringify(this.urlObj));
  }
}
