const fetch = require('node-fetch')
const fs = require('fs')

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
module.exports.saveImageToDisk = saveImageToDisk
