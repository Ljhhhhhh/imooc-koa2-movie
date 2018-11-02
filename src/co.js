const co = require('co')
const fetch = require('node-fetch')

co(function *() {
  const res = yield fetch('https://api.douban.com/v2/movie/25917789')
  const movie = yield res.json()
  const summary = movie.summary
  console.log('summary', summary);
})

// function run(generator) {
//   const iterator = generator()
//   const it = iterator.next()
//   const promise = it.value

//   promise.then(data => {
//     const it2 = iterator.next(data)
//     const promise2 = it2.value

//     promise.then(data => {
//       iterator.next(data2)
//     })
//   })
// }