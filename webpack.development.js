const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// HTML
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

// css
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: '[name].bundle.[hash:10].css',
    allChunks: true
});

module.exports = {
    entry: ['./src/js/index.js','./src/scss/index.scss'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.[hash:10].js",
        publicPath: '/',
        sourceMapFilename: '[name].[hash:10].map'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
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
    devServer: {
        port: 8080,
        historyApiFallback: { htmlAcceptHeaders:['text/css', '*/*'], index: '/' },
        hot: true
    },
    plugins: [
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
