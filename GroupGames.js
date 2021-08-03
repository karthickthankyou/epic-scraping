const slugify = require('slugify')
const { saveJsonToFile } = require('savejsontofile')
const fs = require('fs')
const allGamesDir = 'files/gameDetails/jsons'
const mainImagesDir = 'files/gameDetails/images'
const subImagesDir = 'files/gameDetails/sub-images'

const allGames = []
const allPublishers = {}

fs.readdirSync(allGamesDir).forEach((file) => {
  //   const parts = file.split('-')
  //   console.log(file, parts[0])
  //   console.log(renameFile)
  //   console.log(file.replace(regex, ''))
  fs.readFile(allGamesDir + '/' + file, 'utf8', function (err, data) {
    if (err) {
      //   throw err
      console.error('Err: ', err)
    }
    const item = JSON.parse(data)
    const id = file.split('-')[0]
    item['id'] = id
    item['publisherId'] = slugify(item.publisher, { lower: true })
    allGames.push(item)
    saveJsonToFile(allGames, 'output.json')
    // console.log('allGames: ', allGames)
    // obj = JSON.parse(data)
    // console.log(obj)
  })
})

console.log('All games: ', allGames)
