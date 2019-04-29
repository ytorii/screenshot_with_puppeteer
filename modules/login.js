const puppeteer = require("puppeteer");

// ログイン処理
const login = async loginPage => {
  await loginPage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

  // ID・パスワードの入力
  await loginPage.type('input[data-testid="login-email"]', "sample_user");
  await loginPage.type('input[data-testid="login-password"]', "password");
  loginPage.click('input[name="commit"]'); // waitForNavigationがタイムアウトになる場合があるので、awaitなし

  await loginPage.waitForNavigation({ waitUntil: "domcontentloaded" });

  // Cookie利用の同意ボタンをクリック
  await loginPage.waitForSelector('div[data-testid="cookie-agreement"]');
  loginPage.click('div[data-testid="cookie-agreement"]');

  // 同意ボタンが消えるまで待つ
  await loginPage.waitFor(500)
}

module.exports = login;
