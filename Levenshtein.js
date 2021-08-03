const fs = require('fs')

const { similarity } = require('levenshteind')
console.log(similarity('Karthick', 'RagavenKar'))

const imgFiles = fs.readdirSync('files/allImages')
const jsonFiles = fs.readdirSync('files/gameDetails2')
console.log(imgFiles.length, jsonFiles.length)

for (let i = 0; i < jsonFiles.length; i++) {
  const element = jsonFiles[i]
  for (let j = 0; j < imgFiles.length; j++) {
    const image = imgFiles[j]
    console.log(similarity(element, image))
  }
}
