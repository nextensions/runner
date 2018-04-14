const Uglify = require('uglifyjs-webpack-plugin')
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/instruction': { page: '/instruction' },
      '/detail': { page: '/detail' },
    }
  },

  // webpack: (config) => {
  //   config.plugins.push(new webpack.EnvironmentPlugin(process.env))
  //   return config
  // },

  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  },

  webpack(cfg) {
    cfg.plugins = cfg.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')

    cfg.plugins.push(new Uglify({
      parallel: true,
      sourceMap: true,
    }))
    return cfg
  },
}
