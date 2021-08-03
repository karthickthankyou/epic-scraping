const { saveJsonToFile } = require('savejsontofile')
const { instance, autoScroll } = require('./utils')

// Extract all game links
;(async function () {
  const { page, browser } = await instance()
  let index = 0
  let last = 15
  let baseURL = `https://www.epicgames.com/store/en-US/browse?sortBy=releaseDate&sortDir=DESC&count=40&start=0`

  try {
    await page.goto(baseURL, { waitUntil: 'networkidle0' })
    while (index < last) {
      await page.waitForSelector('body')
      await page.waitForTimeout(10000)
      await autoScroll(page)
      await page.waitForTimeout(10000)

      let imageLinks = await page.evaluate(() => {
        let imgTags = Array.from(document.querySelectorAll('a'))
        return imgTags.map((image) => image.href)
      })
      saveJsonToFile(imageLinks, `alllinks-${index}.json`)
      index++
      await page.click(
        '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > nav > ul > li:nth-child(9) > button',
      )
    }
    //   await browser.close()
  } catch (err) {
    console.log(err)
  }
})()
