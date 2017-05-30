const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackDashboardPlugin = require('webpack-dashboard/plugin')
const httpProxy = require('http-proxy')
const devBuildConfig = require('./webpack.web')

const IP = process.env.IP || 'localhost'
const PORT = process.env.PORT || 4000
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000

const server = express()
const apiProxy = httpProxy.createProxyServer()
const compiler = webpack(devBuildConfig)

compiler.apply(new WebpackDashboardPlugin())

server.use(webpackDevMiddleware(compiler, {
  publicPath: devBuildConfig.output.publicPath,
  proxy: {'/graphql': `http://localhost:${3000}`},
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
}))

server.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

server.use('/graphql', function (req, res) {
  req.url = req.baseUrl
  apiProxy.web(req, res, {
    target: {
      host: 'localhost',
      port: GRAPHQL_PORT
    }
  })
})

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.listen(PORT, IP, err => {
  if (err) {
    console.log(`=> OMG!!! 🙀 ${err}`)
  }
  console.log(`=> 🔥  Webpack dev server is running on port ${PORT}`)
})
