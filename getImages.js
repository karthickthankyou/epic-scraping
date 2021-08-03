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
  let baseURL = `https://www.epicgames.com/store/en-US/browse?sortBy=releaseDate&sortDir=DESC&count=40&start=0`

  try {
    await page.goto(baseURL, { waitUntil: 'networkidle0' })
    while (pageNum < last) {
      await page.waitForSelector('body')
      await page.waitForTimeout(4000)
      await autoScroll(page)
      await page.waitForTimeout(4000)

      let imageLinks = await page.evaluate(() => {
        let imgTags = Array.from(document.querySelectorAll('img'))
        return imgTags.map((image) => image.src)
      })

      imageLinks.forEach((src, index) => {
        console.log(src)
        let srcArray = src.split('/')
        let filename = `${index + pageNum * 40} ${
          srcArray[srcArray.length - 1]
        }`
        saveImageToDisk(src, `files/allImages/${filename}.jpg`)
      })

      pageNum++
      await page.click(
        '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > section > div > section > div > section > nav > ul > li:nth-child(9) > button',
      )
    }
    //   await browser.close()
  } catch (err) {
    console.log(err)
  }
  console.log('Download complete, check the images folder')
})()
