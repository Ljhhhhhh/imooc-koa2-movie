const {
  readFile,
  readFileSync
} = require('fs')
setImmediate(() => console.log('J3 immediate回调1'))
setImmediate(() => console.log('J3 immediate回调2'))
setImmediate(() => console.log('J3 immediate回调3'))

Promise.resolve().then(() => {
  console.log('[等待切入下一个阶段] 定时器 回调1');
  setImmediate(() => console.log('J3 promise 回调1增加的 immediate回调4'))
})
readFile('../../package.json', 'utf-8', data => {
  console.log('阶段2 IO回调 读文件的回调1');
  readFile('../../package.json', 'utf-8', data => {
    console.log('阶段2 IO回调 读文件的回调1');
  })
})
setTimeout(() => console.log('J1 定时器 回调1'))
setTimeout(() => {
  console.log('J1 定时器 回调5')
  process.nextTick(() => {
    console.log('[待切入下一个阶段] nexttike回调2');
  })
})
setTimeout(() => console.log('J1 定时器 回调3'))
setTimeout(() => console.log('J1 定时器 回调4'))

process.nextTick(() => console.log('[待切入下一个阶段] nexttike 回调1'))
process.nextTick(() => {
  console.log('[待切入下一个阶段] nexttike 回调2')
  process.nextTick(() => console.log('[待切入下一个阶段] nexttike 回调4'))
})
process.nextTick(() => console.log('[待切入下一个阶段] nexttike 回调3'))