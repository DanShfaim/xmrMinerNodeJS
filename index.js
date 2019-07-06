const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const http = require('http');
const app = new express();
const PORT = 9090;
const html = path.resolve(fs.realpathSync(process.cwd()), 'index.html');
app.get('*', (req, res) => {
  res.sendFile(html);
});
const webserver = http.createServer(app);
const init = async () => {
  return new Promise((resolve, reject) => {
    webserver
      .listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        resolve();
      })
      .on('error', e => {
        console.error(e.toString());
        reject(e);
      });
  });
};
init()
  .then(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:9090');

    // await browser.close();
  })
  .catch(console.error);
