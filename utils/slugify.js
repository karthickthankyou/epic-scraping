var slugify = require('slugify')

module.exports.slug = function (text) {
  return slugify(text, {
    lower: true,
  })
}
