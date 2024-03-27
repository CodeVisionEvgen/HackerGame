const readline = require("readline");
export function animateNews(news: string) {
  let i = 0;
  const interval = setInterval(() => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(news.substring(i) + news.substring(0, i));
    i++;
    if (i > news.length) {
      i = 0;
    }
  }, 100);
  return interval;
}
