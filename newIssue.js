const puppeteer = require("puppeteer");
const loginModule = require("./modules/login.js");

(async () => {
  const browser = await require("./modules/browser.js");
  const page = await browser.newPage();

  await loginModule(page)

  // 新規問合せ画面へのリンクをクリック
  // 別タブに移動するので、開いた先のタブページを取得
  const [issue_page] = await Promise.all([
    new Promise(resolve => page.once('popup', resolve)),
    page.click('a[href^="/issues/new"]'),
  ]);

  // 新規問合せ画面のスクリーンショット
  await issue_page.screenshot({ path: "screen_shots/new_issue.png" });

  // Cookie利用の同意ボタンをクリック
  await issue_page.waitForSelector('input[id="issue_title"]');

  await issue_page.type('input[id="issue_title"]', "Test Issue");
  await issue_page.type('textarea[id="issue_description"]', "This is a TestIssue.No problem!");

  issue_page.select('#issuer_id', '4');
  await issue_page.waitFor(300) // ajax通信の完了待ち

  issue_page.select('#item_id', '204');
  await issue_page.waitFor(300) // ajax通信の完了待ち

  issue_page.select('#model_id', '17');
  await issue_page.waitFor(300) // ajax通信の完了待ち

  // 新規問合せ画面のスクリーンショット
  await issue_page.screenshot({ path: "screen_shots/new_issue_typed.png" });

  browser.close();
})();
