const puppeteer = require('puppeteer')
const { saveJsonToFile } = require('savejsontofile')

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(
    'https://www.epicgames.com/store/en-US/browse?sortBy=releaseDate&sortDir=DESC&count=40&start=0',
  )

  await page.waitForTimeout(5000)

  const name = await page.evaluate(() => {
    const arr = []
    for (let i = 1; i < 41; i++) {
      arr.push({
        name: document.querySelector(
          `#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul > li:nth-child(${i}) > div > div > a > div > div > div.css-19bjoof-DiscoverCardLayout__meta > span.css-2ucwu`,
        ).innerText,
        publisher: document.querySelector(
          `#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul > li:nth-child(${i}) > div > div > a > div > div > div.css-19bjoof-DiscoverCardLayout__meta > span.css-os6fbq > span`,
        ).innerText,
        //   desc: document.querySelector('#root > div > p').innerText,
      })
    }
    return arr
  })
  saveJsonToFile(name, 'output.json')
  //   console.log(arr)

  //   await browser.close()

  //   return text
})()
