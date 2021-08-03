const { saveJsonToFile } = require('savejsontofile')
;(function () {
  let initial = []
  for (let i = 0; i < 15; i++) {
    // const all = require(`../alllinks-${i}.json`)
    const updated = require(`../files/links/alllinks-${i}.json`).filter(
      (item) => item.includes('https://www.epicgames.com/store/en-US/p'),
    )
    initial = initial.concat(updated)
  }

  //   console.log(all)
  saveJsonToFile(initial, 'allLinks-master.json')
})()
