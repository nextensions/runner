const Uglify = require('uglifyjs-webpack-plugin')
// const { parsed: localEnv } = require('dotenv').config()
require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withTypescript({
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/instruction': { page: '/instruction' },
      '/detail': { page: '/detail' }
    }
  },

  webpack: config => {
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    )
    return config
  },

  // webpack: config => {
  //   config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
  //   return config
  // },

  // webpack(cfg) {
  //   cfg.plugins = cfg.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')

  //   cfg.plugins.push(new Uglify({
  //     parallel: true,
  //     sourceMap: true,
  //   }))
  //   return cfg
  // },

  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())

    return config
  }
})
