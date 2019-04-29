const puppeteer = require("puppeteer");

const createBrowser = async () => await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  defaultViewport: { width: 1600, height: 900 }
});

module.exports = createBrowser();
