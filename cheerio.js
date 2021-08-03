const cheerio = require('cheerio')
const axios = require('axios')
const { saveJsonToFile } = require('savejsontofile')

axios
  .get('https://www.epicgames.com/store/en-US/browse')
  .then((urlResponse) => {
    // console.log(urlResponse)
    saveJsonToFile(urlResponse, 'output2.json', true)
  })
