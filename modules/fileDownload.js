const fs = require('fs');

const waitForDownloaded = async page => {
  const from = Date.now();
  const downloadPath = './downloads/' + from.toString();

  // ダウンロードファイルの保存先ディレクトリを作成
  fs.mkdirSync(downloadPath)

  // ダウンロードしたファイルの保存先を設定に追加
  await page._client.send('Page.setDownloadBehavior', {
    behavior : 'allow',
    downloadPath:  downloadPath ,
  });

  const downloadFilename = await ((async () => {
    let filename;
    while (!filename || filename.endsWith('.crdownload')) {
      filename = fs.readdirSync(downloadPath)[0];
      await page.waitFor(500)
    }
    return filename
  })());

  console.log("Downloaded file: " + downloadFilename)
  console.log("Elapsed time to download: " + (Date.now() - from).toString() + "ms")

}

module.exports = waitForDownloaded;
