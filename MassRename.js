const testFolder = 'files/gameDetails/sub-images'
const fs = require('fs')

fs.readdirSync(testFolder).forEach((file) => {
  const parts = file.split('-')
  console.log(file, parts[0])
  //   console.log(renameFile)
  //   console.log(file.replace(regex, ''))
  fs.rename(
    testFolder + '/' + file,
    testFolder + '/' + file + '.jpg',
    (err) => {
      console.log(err)
    },
  )
})
