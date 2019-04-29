const puppeteer = require("puppeteer");
const loginModule = require("./modules/login.js");

(async () => {
  const browser = await require("./modules/browser.js");
  const page = await browser.newPage();

  // ログイン処理
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // ID・パスワードの入力
  await page.type('input[data-testid="login-email"]', "sample_user");
  await page.type('input[data-testid="login-password"]', "password");
  page.click('input[name="commit"]'); // waitForNavigationがタイムアウトになる場合があるので、awaitなし

  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // ダッシュボードのスクリーンショット
  await page.screenshot({ path: "screen_shots/dashboard_before.png" });

  // Cookie利用の同意ボタンをクリック
  await page.waitForSelector('div[data-testid="cookie-agreement"]');
  page.click('div[data-testid="cookie-agreement"]');

  // 同意ボタンが消えるまで待つ
  await page.waitFor(500)

  // ダッシュボードのスクリーンショット
  await page.screenshot({ path: "screen_shots/dashboard_after.png" });

  browser.close();
})();
