module.exports = `
doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport', content='width=device-width, initial-scale=1')
    title koa server pug
    link(href='https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.min.css' rel='stylesheet')
    script(src='https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js')
    script(src='https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js')
  body
    .container
      .row
        .col-md-8
          h1 Hi #{you}
          p this isisis #{me}
        .col-md-4
          p 这是测试的动态pug页面
`
