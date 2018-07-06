const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

// HTML
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `./src/index.html`,
    filename: 'index.html',
    inject: 'body',
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    }
});

// Uglify Javascript
const UglifyJsPluginConfig = new UglifyJsPlugin({
    sourceMap: true,   // enable source maps to map errors (stack traces) to modules
    parallel: true     // Use multi-process parallel running to improve the build speed
});

// css
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    filename: '[name].bundle.[chunkhash:10].css',
    allChunks: true
});

module.exports = {
    mode: 'production',
    entry: ['./src/js/index.js','./src/scss/index.scss'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.[chunkhash:10].js",
        publicPath: '/',
        sourceMapFilename: '[name].bundle.[chunkhash:10].map'
    },
    devtool: 'hidden-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(eot|[ot]tf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        MiniCssExtractPluginConfig,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(`${process.env.NODE_ENV}`)
        })
    ],
    optimization: {
        namedModules: true, // NamedModulesPlugin()
        splitChunks: { // CommonsChunkPlugin()
            name: 'vendor',
            filename: 'vendor.[chunkhash:10].js',
            chunks (module) {
                return module.context &&
                    module.context.indexOf('node_modules') >= 0;
            }
        },
        concatenateModules: true, //ModuleConcatenationPlugin
        minimizer: [
            UglifyJsPluginConfig
        ]
        
    }
};
