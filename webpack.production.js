const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// HTML
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `./src/index.html`,
    filename: 'index.html',
    inject: 'body',
    minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
    }
});

// Uglify Javascript
const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,   // enable source maps to map errors (stack traces) to modules
    uglifyOptions: {
        compress: true
    },
    output: {
        comments: false // remove all comments
    }
});

// css
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: '[name].bundle.[chunkhash:10].css',
    allChunks: true
});

// Create separate bundle for the node_modules
const CommonsChunkPluginConfig = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:10].js',
    minChunks (module) {
        return module.context &&
            module.context.indexOf('node_modules') >= 0;
    }
});

module.exports = {
    entry: ['./src/js/index.js','./src/scss/index.scss'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.[chunkhash:10].js",
        publicPath: '/',
        sourceMapFilename: '[name].bundle.[chunkhash:10].map'
    },
    devtool: 'hidden-source-map',
    module: {
        loaders: [
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
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
        CommonsChunkPluginConfig,
        UglifyJsPluginConfig,
        new webpack.optimize.ModuleConcatenationPlugin(),
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig,
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(`${process.env.NODE_ENV}`)
        })
    ]
};
