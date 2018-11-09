let movies = [{
  video: 'http://vt1.doubanio.com/201811051646/419b42a48c5e48e134db44bc306d9a26/view/movie/M/402370731.mp4',
  doubanId: '26425063',
  cover: 'https://img1.doubanio.com/img/trailer/medium/2536760239.jpg?1539329597")',
  poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2518413249.jpg'
}]

const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({
            key
          })
        } else {
          reject(info)
        }
      }
    })
  })
}

;
(async () => {
  let movies = [{
    video: 'http://vt1.doubanio.com/201811051646/419b42a48c5e48e134db44bc306d9a26/view/movie/M/402370731.mp4',
    doubanId: '26425063',
    cover: 'https://img1.doubanio.com/img/trailer/medium/2536760239.jpg?1539329597")',
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2518413249.jpg'
  }]
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('正在传video');
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('正在传cover');
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        console.log('正在传poster');
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }
        console.log(movie);
        // {
        //   video: 'http://vt1.doubanio.com/201811051646/419b42a48c5e48e134db44bc306d9a26/view/movie/M/402370731.mp4',
        //   doubanId: '26425063',
        //   cover: 'https://img1.doubanio.com/img/trailer/medium/2536760239.jpg?1539329597")',
        //   poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2518413249.jpg',
        //   videoKey: 'MGHbV0PHvTDdqiGA5SdMd.mp4',
        //   coverKey: 'ce5sBqS4_LYWg5A_Bi5lm.png',
        //   posterKey: 'kVOxXO1a465meCG92pdFv.png'
        // }
      } catch (err) {

      }
    }
  })
})()