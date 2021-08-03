const { puppeteerInstance } = require('./instance')
const { autoScroll } = require('./autoScroll')
const { slug } = require('./slugify')
const { saveImageToDisk } = require('./saveImageToDisk')
module.exports = {
  autoScroll,
  //   concatArray: require('./concatArray'),
  puppeteerInstance,
  slug,
  saveImageToDisk,
}
