var parse = require('date-fns/parse')
const allPublisher = require('./allPublisher.json')
const { saveImageToDisk } = require('saveimagetodisk')
const { saveJsonToFile } = require('savejsontofile')
function getPublisherGameCounts() {}

const allGames = require('./allGames.json')
function removePublisherName() {
  const updatedGames = []
  for (let i = 0; i < allGames.length; i++) {
    const item = allGames[i]
    delete item['publisher']
    updatedGames.push(item)
  }
  saveJsonToFile(updatedGames, 'output.json')
}

function updateTags() {
  const updatedGames = []
  for (let i = 0; i < allGames.length; i++) {
    const item = allGames[i]
    item['tags'] = item['tags'].split('\n')
    // console.log(item)
    updatedGames.push(item)
  }
  saveJsonToFile(updatedGames, 'output.json')
}

function updateDate() {
  const updatedGames = []
  for (let i = 0; i < allGames.length; i++) {
    const item = allGames[i]
    // console.log(item)
    if (!item.releaseDate) {
      // Missing dates given a random date. There are 49.
      item.releaseDate = new Date('Sep 15, 2020')
    } else {
      item.releaseDate = new Date(item.releaseDate)
    }
    // console.log(item.releaseDate)
    updatedGames.push(item)
    // console.log(item.releaseDate, new Date(item.releaseDate))
    // console.log(format(new Date(2014, 1, 11), 'yyyy-MM-dd'))
    // var result = parse(item.releaseDate, 'MM/dd/yyyy', new Date())
    // console.log(new Date(item.releaseDate).toISOString())
  }
  saveJsonToFile(updatedGames, 'output.json')
}

// Run pad
// updateDate()
