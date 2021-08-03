async function autoScroll(page) {
  let distance = 200
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight
        window.scrollBy(0, 200)
        totalHeight += 200

        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 300)
    })
  })
}

module.exports.autoScroll = autoScroll
