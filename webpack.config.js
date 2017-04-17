'use strict';
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var autoprefixer = require('autoprefixer');

var config = {
    entry: [
        'core-js/fn/promise',
        './app/index.js',
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/build',
        hot: true,
        host: '0.0.0.0',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
    ],
    devtool: 'eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    // production-specific build options go here
}

module.exports = config;
