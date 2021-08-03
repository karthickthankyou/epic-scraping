const { saveJsonToFile } = require('savejsontofile')
const puppeteer = require('puppeteer')
const fetch = require('node-fetch')
const fs = require('fs')
const { saveImageToDisk } = require('saveimagetodisk')
const { puppeteerInstance, autoScroll, slug } = require('./utils')

// Extract all imageLinks from the page

// Extract all game links
;(async function () {
  console.log('Downloading images...')
  const { page } = await puppeteerInstance()
  let pageNum = 0
  let last = 15
  let totalArr = []
  const groupName = 'Game Bundle'
  let baseURL =
    'https://www.epicgames.com/store/en-US/browse?sortBy=releaseDate&sortDir=DESC&category=GameBundle&count=40&start=0'

  try {
    await page.goto(baseURL, { waitUntil: 'networkidle0' })
    while (pageNum < last) {
      await page.waitForSelector('body')
      await page.waitForTimeout(2000)
      await autoScroll(page)
      await page.waitForTimeout(2000)

      let collected = await page.evaluate(() => {
        const arr = []
        const other =
          '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > div > div > section > div > section > section > ul'
        const other2 =
          '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > div > div > section > div > section > section > ul'
        const ulSelector2 = document.querySelector(
          '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul',
        )
        const ulSelector = document.querySelector(
          '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > div > div > section > div > section > section > ul',
        )

        return {
          text: ulSelector.innerText,
          html: ulSelector.innerHTML,
          hello: 'hello',
        }
        // for (let i = 1; i <= ulSelector.childElementCount; i++) {
        //   const query = document.querySelector(
        //     `#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > section > ul > li:nth-child(${i}) > div > div > a > div > div > div.css-19bjoof-DiscoverCardLayout__meta > span.css-2ucwu`,
        //   )
        //   query && arr.push(query.innerText)
        // }
        // return arr
      })
      console.log(collected)
      //   totalArr = totalArr.concat(collected)

      pageNum++
      //   await page.click(
      //     '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > nav > ul > li:nth-child(9) > button',
      //   )
    }
    saveJsonToFile(
      { [groupName]: totalArr },
      `files/gameDetails2/groups/${groupName}`,
    )
    //   await browser.close()
  } catch (err) {
    console.log(err)
  }
  console.log('Download complete, check the images folder')
})()
