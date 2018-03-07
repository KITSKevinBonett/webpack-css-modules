const Nav = (routes, path) =>
  routes
  .map(({url}) => `<a href="${url}">${url}</a>`)
.join(' | ');

const Page = path => require(`./pages${path == '/'? '/home' : path}`)();

module.exports = data => Promise.resolve(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Webpack Static Site Plugin</title>
  </head>
    <body>
      ${Nav(data.routes, data.path)}
      ${Page(data.path)}
      <script src="/build/bundle.js"></script>
    </body>
  </html>
`)
