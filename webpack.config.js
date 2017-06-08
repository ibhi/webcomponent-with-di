var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production';
var entry = PRODUCTION
    ? ['./index.js']
    : [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './index.js'
    ];

var sourcemap = PRODUCTION ? '' : 'source-map';

var plugins = PRODUCTION
    ? [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: true
            },
            mangle: true
        }),
        new ExtractTextPlugin('style-[hash:12].css'),
        new HTMLWebpackPlugin({
            template: 'index-template.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ]
    : [
        new HTMLWebpackPlugin({
            template: 'index-template.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ];

plugins.push();

var cssLoader = PRODUCTION
    ? ExtractTextPlugin.extract({
        use: ['css-loader?minimize&colormin', 'sass-loader'],
        fallback: 'style-loader'
    })
    : ['style-loader', 'css-loader', 'sass-loader'];

module.exports = {
    devtool: sourcemap,
    entry: entry, // It can be a just a string of file name as well
    plugins: plugins,
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js$/, // include .js files
            //     exclude: /node_modules/, // exclude any and all files in the node_modules folder
            //     use: 'eslint-loader',
            // },
            // {
            //     test: /.\js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 [
            //                     'es2015',
            //                     // { 'modules': false }
            //                 ],
            //                 'stage-0'
            //             ]
            //         }
            //     },
            //     exclude: /node_modules/
            // },
            // {
            //     enforce: 'post',
            //     test: /src\/+\.js$/,
            //     use: 'istanbul-instrument-loader',
            //     exclude: /(node_modules|\.spec\.js$)/
            // },
            {
                test: /\.js$/,
                enforce: 'post',
                include: path.resolve('src/'),
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: 'images/[hash:12].[ext]'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /.\html$/,
                use: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: cssLoader,
                exclude: /node_modules/
            },
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: PRODUCTION ? '[chunkhash].[name].min.js' : 'd3-slider.js'
    },
};