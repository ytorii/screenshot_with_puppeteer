const puppeteer = require("puppeteer");
const loginModule = require("./modules/login.js");
const waitForDownloaded = require("./modules/fileDownload.js");

(async () => {
  const browser = await require("./modules/browser.js");
  const page = await browser.newPage();

  await loginModule(page)

  // 商品番号205番の画面に移動
  await page.goto("http://localhost:3000/items/205", { waitUntil: "domcontentloaded" });

  // 新規問合せ画面へのリンクをクリック
  // 別タブに移動するので、開いた先のタブページを取得
  const [batchDownloadPage] = await Promise.all([
    new Promise(resolve => page.once('popup', resolve)),
    page.click('a[href^="/items/205/batch_data"]'),
  ]);

  // click関数は条件に一致する最初の要素をクリックする
  await batchDownloadPage.click('label[for^=item_ids]')

  // ダウンロード対象の期間の始点。既存の入力値をevaluate内で上書き
  await batchDownloadPage.evaluate(() => {
    const datetimeFrom = document.getElementsByName('datetime_from')[0];
    datetimeFrom.value = '2018-05-01';
  });

  // 一括ダウンロード画面のスクリーンショット
  await batchDownloadPage.screenshot({ path: "screen_shots/batch_download.png" });

  // ダウンロード処理の実行
  await batchDownloadPage.click('#submit')

  await waitForDownloaded(batchDownloadPage);

  browser.close();
})();
