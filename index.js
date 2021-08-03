// const puppeteer = require('puppeteer')
// const { parse, stringify } = require('flatted')
// const { saveJsonToFile } = require('savejsontofile')

// const fs = require('fs')

// const gamesContainer =
//   '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul'

// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await page.goto('https://www.epicgames.com/store/en-US/browse', {
//     waitUntil: 'networkidle2',
//   })
//   //   const gameTitleSelector =
//   //     '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul > li:nth-child(1) > div > div > a > div > div > div.css-19bjoof-DiscoverCardLayout__meta > span.css-2ucwu'
//   //   console.log(page)
//   //   await page.waitForTimeout(4000)
//   //   const selector = '[data-testid="offer-title-info-title"]'
//   //   await page.waitForSelector(selector)
//   //   let container = await page.$$(gamesContainer)
//   //   await page.waitForSelector(gameTitleSelector)
//   //   let gameTitle = await page.$$(gameTitleSelector)

//   await page.evaluate(() => {
//     const element = document.querySelector(
//       '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul > li:nth-child(1) > div > div > a > div > div > div.css-19bjoof-DiscoverCardLayout__meta > span.css-2ucwu',
//     )
//     console.log(element.innerText)
//   })
//   //   console.log(next)
//   //   await next.click()
//   //   console.log(gameTitle.innerHtml)
//   //   saveJsonToFile(container, 'output.json', true)
//   //   await page.waitForTimeout(1000)
//   //   await page.screenshot({ path: 'example.png' })

//   await browser.close()
// })()
