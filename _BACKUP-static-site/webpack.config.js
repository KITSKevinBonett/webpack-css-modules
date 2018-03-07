const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const data = {
  routes: [
    {url: '/'},
    {url: '/about'}
  ]
};
const static = new StaticSiteGeneratorPlugin('main', data.routes.map(r => r.url), data)

module.exports = {
  entry:  {
    main: './src'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // Compile to UMD so it can be required in a Node context
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: __dirname + '/src'
       },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
                modules: true,
                localIdentName: '[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        })
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    inline: false,
    openPage: 'build/index.html'
  },
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
    }),
    static
  ]
};
