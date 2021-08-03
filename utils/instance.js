const puppeteer = require('puppeteer')

// Browser and page puppeteerInstance
async function puppeteerInstance() {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(60000)
  return { page, browser }
}

module.exports.puppeteerInstance = puppeteerInstance
