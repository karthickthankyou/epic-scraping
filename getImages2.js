const { saveJsonToFile } = require('savejsontofile')
const puppeteer = require('puppeteer')
const fetch = require('node-fetch')
const fs = require('fs')

// Browser and page instance
async function instance() {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()
  return { page, browser }
}

let index = 0
// Extract all imageLinks from the page
async function extractImageLinks() {
  const { page, browser } = await instance()

  // Get the page url from the user
  let baseURL = process.argv[2]
    ? process.argv[2]
    : 'https://www.epicgames.com/store/en-US/browse?sortBy=releaseDate&sortDir=DESC&count=40&start=0'

  try {
    await page.goto(baseURL, { waitUntil: 'networkidle0' })
    await page.waitForSelector('body')
    await page.waitForTimeout(10000)

    let imageLinks = await page.evaluate(() => {
      let anchorTexts = Array.from(document.querySelectorAll('a'))
      let anchorArray = anchorTexts.map((anchor) => anchor.href)
      saveJsonToFile(anchorArray, `all_links-${index}.json`)

      let imgTags = Array.from(document.querySelectorAll('img'))
      console.log('Length: ', imgTags.length)
      let imageArray = []

      imgTags.map((image) => {
        let src = image.src

        let srcArray = src.split('/')
        let pos = srcArray.length - 1
        let filename = srcArray[pos]

        imageArray.push({
          src,
          filename,
        })
      })

      return imageArray
    })

    await browser.close()
    return imageLinks
  } catch (err) {
    console.log(err)
  }
}

;(async function () {
  console.log('Downloading images...')

  let imageLinks = await extractImageLinks()

  imageLinks.map((image) => {
    let filename = `./images-${index}/${image.filename}.jpg`
    saveImageToDisk(image.src, filename)
  })

  console.log('Download complete, check the images folder')
})()

function saveImageToDisk(url, filename) {
  fetch(url)
    .then((res) => {
      const dest = fs.createWriteStream(filename)
      res.body.pipe(dest)
    })
    .catch((err) => {
      console.log(err)
    })
}
