const { saveImageToDisk } = require('saveimagetodisk')
const { saveJsonToFile } = require('savejsontofile')
// var slugify = require('slugify')
const { puppeteerInstance, autoScroll, slug } = require('./utils')

const allGameLinks = require('./files/links/allLinks-master.json')

// const allGameLinks = [
// //   'https://www.epicgames.com/store/en-US/p/lunas-fishing-garden',
// //   'https://www.epicgames.com/store/en-US/p/doctor-who-the-lonely-assassins',
//   //   'https://www.epicgames.com/store/en-US/p/overcooked-2',
//   //   'https://www.epicgames.com/store/en-US/p/beasts-of-maravilla-island',
//   //   'https://www.epicgames.com/store/en-US/p/chicory-a-colorful-tale',
//   //   'https://www.epicgames.com/store/en-US/p/we-are-football',
//   //   'https://www.epicgames.com/store/en-US/p/little-big-workshop',
//   //   'https://www.epicgames.com/store/en-US/p/open-country',
//   //   'https://www.epicgames.com/store/en-US/p/discord',
//   //   'https://www.epicgames.com/store/en-US/p/trials-of-fire',
//   //   'https://www.epicgames.com/store/en-US/p/genshin-impact',
//   //   'https://www.epicgames.com/store/en-US/p/edge-of-eternity',
//   //   'https://www.epicgames.com/store/en-US/p/backbone',
// ]

// Extract all game links
async function scrapeProductPage() {
  const { page } = await puppeteerInstance()
  const offset = 550
  let index = offset
  let last = allGameLinks.length

  try {
    while (index < last) {
      await page.goto(allGameLinks[index], {
        waitUntil: 'networkidle0',
      })
      await page.waitForSelector('body')
      console.log('Body loaded')
      await page.waitForTimeout(2000)
      console.log('Safety loading 2000')
      //   console.log('Auto scroll starts')
      //   await autoScroll(page)
      //   await page.waitForTimeout(5000)
      //   console.log('Safety loading 5000')

      const data = await page.evaluate(() => {
        const selectors = [
          {
            name: 'title',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div.css-1e6jyt-ProductDetailPageLayout__title > div.css-ikmaz7-TitleSectionLayout__container > div > h1 > div.css-12usrln-PDPTitleHeader__headline1 > span',
          },
          {
            name: 'description',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div.css-1di7kpa-AboutSectionLayout__shortDescription > span > div > div',
          },
          {
            name: 'price',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > aside > div > div > div:nth-child(3) > div > div > span > div > span',
          },
          {
            name: 'developer',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span',
          },
          {
            name: 'publisher',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span',
          },
          {
            name: 'releaseDate',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > span > time',
          },
          {
            name: 'tags',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)',
          },
          {
            name: 'longDesc',
            selector: '#about-long-description',
          },
          {
            name: 'platform',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > ul',
          },
          {
            name: 'languages',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(3) > div > div > div > div:nth-child(3) > div.css-kl3741-ProductSection__body > div > div > div:nth-child(2) > div > ul > li > span',
          },
          {
            name: 'spec',
            selector:
              '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(3) > div > div > div > div:nth-child(3) > div.css-kl3741-ProductSection__body > div > div > div:nth-child(1) > div > div.css-mayif2-Tabs__tabContent',
          },
        ]

        const sideImageSelector =
          '#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > div.css-5wa3ri-Page__content-Page__contentAfterTopNav > div > div > div.css-1ib2l17-ProductDetailPageLayout__container > div:nth-child(2) > div > aside > div > div > div:nth-child(1) > div.css-14ybna1-PDPSidebarLogo__sidebarLogo > div > div > div > div > div > img'

        let gameDetails = {}
        for (let i = 0; i < selectors.length; i++) {
          const { name, selector } = selectors[i]

          const query = document.querySelector(selector)
          if (query) {
            if (['longDesc', 'spec'].includes(name)) {
              console.log('Getting html')
              gameDetails[name] = query.innerHTML
            } else {
              gameDetails[name] = query.innerText
            }
          } else {
            gameDetails[name] = ''
          }
        }

        const sideImageQuery = document.querySelector(sideImageSelector)
        return { gameDetails, imgSrc: sideImageQuery ? sideImageQuery.src : '' }
      })

      data.imgSrc &&
        saveImageToDisk(
          data.imgSrc,
          `files/gameDetails/images/${index}-${slug(
            data.gameDetails.title,
          )}.jpg`,
        )

      saveJsonToFile(
        data.gameDetails,
        `files/gameDetails2/${index}-${slug(data.gameDetails.title)}.json`,
      )
      index++
    }
    //   await browser.close()
  } catch (err) {
    console.log(err)
  }
}

scrapeProductPage()
