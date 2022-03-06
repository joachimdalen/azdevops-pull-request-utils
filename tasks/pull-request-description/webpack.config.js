var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './dist/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/bundle'),
    library: 'pull-request-description',
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  resolve: {
    alias: {
      'azure-devops-extension-api': path.resolve('node_modules/azure-devops-extension-api'),
      'azure-pipelines-task-lib': path.resolve('node_modules/azure-pipelines-task-lib')
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './icon.png', to: 'icon.png' },
        { from: './task.json', to: 'task.json' }
      ]
    })
  ]
};
