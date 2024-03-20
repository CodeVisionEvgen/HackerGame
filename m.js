async function loading() {
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
        res(true);
        break;
      }
    }
  });
}
async function initialize() {
  await loading();
  await loading();
}
initialize();
