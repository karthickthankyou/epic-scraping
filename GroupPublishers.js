const { saveJsonToFile } = require('saveJsonToFile')

function groupPublishers() {
  const allGames = require('./allGames.json')

  const allPublishers = {}

  for (let i = 0; i < allGames.length; i++) {
    const item = allGames[i]
    if (!allPublishers[item.publisherId]) {
      allPublishers[item.publisherId] = {
        id: item.publisherId,
        name: item.publisher,
        about:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus interdum lacinia. Etiam interdum eros et orci suscipit maximus. Nam sed leo risus. Vestibulum hendrerit maximus faucibus. Donec bibendum, lectus a fermentum imperdiet, neque nibh sollicitudin nisl, in porttitor ante ex vitae sapien. Etiam pretium venenatis nisi, eu feugiat lacus ornare ut. In id bibendum mauris.',
        games: [],
      }
    }
    allPublishers[item.publisherId].games.push(item.id)
  }

  saveJsonToFile(allPublishers, 'output2.json')
}

groupPublishers()
