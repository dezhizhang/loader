const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    resolveLoader:{
        alias:{
            'babel-loader':path.resolve(__dirname,'loaders/babel-loader.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                 {
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                 }
                ]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        })
    ]
}