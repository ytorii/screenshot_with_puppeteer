const fs = require('fs');

const waitForDownloaded = async page => {
  const from = Date.now()
  // ダウンロードしたファイルの保存先を設定
  await page._client.send('Page.setDownloadBehavior', {
    behavior : 'allow',
    downloadPath: './downloads',
  });

  const downloadFilename = await ((async () => {
    let filename;
    while (!filename || filename.endsWith('.crdownload')) {
      filename = fs.readdirSync('./downloads')[0];
      await page.waitFor(500)
    }
    return filename
  })());

  console.log("Downloaded file: " + downloadFilename)
  console.log("Elapsed time: " + (Date.now() - from).toString() + "ms")

}

module.exports = waitForDownloaded;
